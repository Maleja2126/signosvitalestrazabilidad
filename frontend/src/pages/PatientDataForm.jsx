import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPatientRecord, fetchPatientInfo } from "../services/patientService";
import { FiSave, FiClipboard } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PatientDataForm = () => {
    const { idPaciente } = useParams();
    const navigate = useNavigate();

    const currentDate = new Date().toISOString().split("T")[0];
    const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);

    const [ageGroup, setAgeGroup] = useState("");
    const [recordDate, setRecordDate] = useState(currentDate);
    const [recordTime, setRecordTime] = useState(currentTime);
    const [pesoAdulto, setPesoAdulto] = useState("");
    const [pesoPediatrico, setPesoPediatrico] = useState("");
    const [talla, setTalla] = useState("");
    const [presionSistolica, setPresionSistolica] = useState("");
    const [presionDiastolica, setPresionDiastolica] = useState("");
    const [presionMedia, setPresionMedia] = useState("");
    const [pulso, setPulso] = useState("");
    const [frecuenciaRespiratoria, setFrecuenciaRespiratoria] = useState("");
    const [saturacionOxigeno, setSaturacionOxigeno] = useState("");
    const [temperatura, setTemperatura] = useState("");
    const [observaciones, setObservations] = useState("");

    useEffect(() => {
        const loadPatientInfo = async () => {
            try {
                const response = await fetchPatientInfo(idPaciente);
                const patient = response.data;
                setAgeGroup(patient.age_group || ""); // Establecer el grupo de edad desde el backend
            } catch (error) {
                console.error("Error al recuperar la información del paciente:", error);
                toast.error("Error al recuperar la información del paciente.");
            }
        };
        loadPatientInfo();
    }, [idPaciente]);

    const calculatePresionMedia = () => {
        if (presionSistolica && presionDiastolica) {
            const tam = (
                (parseInt(presionSistolica) + 2 * parseInt(presionDiastolica)) / 3
            ).toFixed(0);
            setPresionMedia(tam);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Token no encontrado. Por favor inicia sesión nuevamente.");
            return;
        }
        try {
            await createPatientRecord({
                id_paciente: idPaciente,
                record_date: recordDate,
                record_time: recordTime,
                presion_sistolica: presionSistolica,
                presion_diastolica: presionDiastolica,
                presion_media: presionMedia,
                pulso,
                temperatura,
                frecuencia_respiratoria: frecuenciaRespiratoria,
                saturacion_oxigeno: saturacionOxigeno,
                peso_adulto: ageGroup === "Adulto" ? pesoAdulto : null,
                peso_pediatrico: ageGroup !== "Adulto" ? pesoPediatrico : null,
                talla,
                observaciones,
            },
                token
            );
            toast.success("¡Los datos del paciente se guardaron correctamente!");
            navigate(`/patient/${idPaciente}/records`);
        } catch (error) {
            console.error("Error al guardar los datos del paciente:", error);
            const errorMessage =
                error.response?.data?.message || "Error al guardar los datos del paciente.";
            toast.error(errorMessage);
        }
    };

    if (!ageGroup) {
        return <div>Cargando información del paciente...</div>;
    }

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-12">
            <h1 className="text-4xl font-bold text-blue-700 mb-5"> 🩺Monitoreo General</h1>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg grid gap-6"
            >
                {/* Fecha y hora */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Fecha Dato:</label>
                        <input
                            type="date"
                            value={recordDate}
                            onChange={(e) => setRecordDate(e.target.value)}
                            max={currentDate}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Hora Dato:</label>
                        <input
                            type="time"
                            value={recordTime}
                            onChange={(e) => setRecordTime(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Peso, talla y temperatura */}
                <div className="grid grid-cols-3 gap-6">
                    {ageGroup !== "Adulto" ? (
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Peso Pediátrico (g/kg):</label>
                            <input
                                type="number"
                                value={pesoPediatrico}
                                onChange={(e) => setPesoPediatrico(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    ) : (
                        <div>
                            <label className="block text-gray-600 font-semibold mb-2">Peso Adulto (kg):</label>
                            <input
                                type="number"
                                value={pesoAdulto}
                                onChange={(e) => setPesoAdulto(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Talla (cm):</label>
                        <input
                            type="number"
                            value={talla}
                            onChange={(e) => setTalla(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Temperatura (°C):</label>
                        <input
                            type="number"
                            value={temperatura}
                            onChange={(e) => setTemperatura(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Presiones */}
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Presión Sistólica (mmHg):</label>
                        <input
                            type="number"
                            value={presionSistolica}
                            onChange={(e) => {
                                setPresionSistolica(e.target.value);
                                calculatePresionMedia();
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Presión Diastólica (mmHg):</label>
                        <input
                            type="number"
                            value={presionDiastolica}
                            onChange={(e) => {
                                setPresionDiastolica(e.target.value);
                                calculatePresionMedia();
                            }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Presión Media (mmHg):</label>
                        <input
                            type="number"
                            value={presionMedia}
                            readOnly
                            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                        />
                    </div>
                </div>

                {/* Pulso, frecuencia y saturación */}
                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Pulso (lat/min):</label>
                        <input
                            type="number"
                            value={pulso}
                            onChange={(e) => setPulso(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">Frecuencia Respiratoria (resp/min):</label>
                        <input
                            type="number"
                            value={frecuenciaRespiratoria}
                            onChange={(e) => setFrecuenciaRespiratoria(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-600 font-semibold mb-2">SatO2 (%):</label>
                        <input
                            type="number"
                            value={saturacionOxigeno}
                            onChange={(e) => setSaturacionOxigeno(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                {/* Observaciones */}
                <div>
                    <label className="block text-gray-600 font-semibold mb-2">Observaciones:</label>
                    <textarea
                        value={observaciones}
                        onChange={(e) => setObservations(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                    ></textarea>
                </div>

                {/* Botones */}
                <div className="flex justify-center gap-4 mt-1">
                    <button
                        type="submit"
                        className="flex items-center px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                        <FiSave className="mr-2" />
                        Guardar Datos
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center px-6 py-3 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 transition"
                    >
                        <FiClipboard className="mr-2" />
                        Ver registros anteriores
                    </button>
                </div>
            </form>
        </div>

    );
};

export default PatientDataForm;