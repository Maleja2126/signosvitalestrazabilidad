import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload, FiHome } from "react-icons/fi";
import { FaEye, FaEyeSlash, FaUserPlus, FaExclamationTriangle } from "react-icons/fa";

const RegisterUser = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("user");
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [numeroIdentificacion, setNumeroIdentificacion] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}|:"<>?~`.]).{8,16}$/;
        return regex.test(password);
    };
    const validateNumeroID = (numeroIdentificacion) => {
        const regex = /^\d{6,15}$/;
        return regex.test(numeroIdentificacion);
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        // Verificar si hay campos vacíos
        if (!username || !email || !password || !confirmPassword || !numeroIdentificacion || !role) {
            toast.error("Por favor, complete todos los campos.");
            return;
        }

        // Verificación de contraseñas
        if (password !== confirmPassword) {
            toast.error("Las contraseñas no coinciden.");
            return;
        }

        // Validar contraseña
        if (!validatePassword(password)) {
            toast.error("La contraseña debe tener entre 8 y 16 caracteres, incluyendo al menos una mayúscula, una minúscula, un número y un carácter especial.");
            return;
        }

        // Validar número de identificación
        if (!validateNumeroID(numeroIdentificacion)) {
            toast.error("El número de identificación debe contener solo números y debe contener mínimo 6 dígitos.");
            return;
        }
        if (username.length < 6) {
            toast.error("El nombre de usuario debe tener al menos 6 caracteres.");
            return;
        }

        // Aquí puedes agregar la lógica para el registro del usuario
        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("password", password);
            formData.append("email", email);
            formData.append("role", role);
            if (profileImage) {
                formData.append("profileImage", profileImage);
            }
            formData.append("numero_identificacion", numeroIdentificacion);

            await register(formData);
            toast.success("Usuario registrado exitosamente!");
            navigate("/login");
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Error en el registro. Intente nuevamente.";
            toast.error(errorMessage);
        }
    };

    const handleGoBack = () => {
        setShowModal(true); // Mostrar el modal al hacer clic en regresar
    };

    const handleConfirmGoBack = () => {
        setShowModal(false);
        navigate("/admin-panel"); // Redirigir al panel cuando se confirme
    };

    const handleCancelGoBack = () => {
        setShowModal(false); // Cerrar el modal sin hacer nada
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-white-100 via-white-200 to-white-300 overflow-y-auto">
            <form onSubmit={handleRegister} className="w-30 max-w-30 p-6 bg-white rounded-xl shadow-xl space-y-4">
                <h2 className="text-2xl font-extrabold text-center text-blue-600 flex items-center justify-center gap-2">
                    <FaUserPlus size={28} /> Registrar nuevo usuario
                </h2>


                <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-200 flex items-center justify-center shadow-lg">
                        {previewImage ? (
                            <img src={previewImage} alt="Profile preview" className="w-full h-full object-cover" />
                        ) : (
                            <FiUpload size={24} className="text-gray-500" />
                        )}
                    </div>
                    <label className="cursor-pointer bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out shadow-md">
                        <span>Subir imagen de perfil</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Nombres y apellidos"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <input
                        type="text"
                        placeholder="Número de identificación"
                        value={numeroIdentificacion}
                        onChange={(e) => setNumeroIdentificacion(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full col-span-2 md:col-span-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                    />
                    <div className="relative col-span-2">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-3 text-gray-500"
                        >
                            {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                        </button>
                    </div>
                    <div className="relative col-span-2">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-4 top-3 text-gray-500"
                        >
                            {showConfirmPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                        </button>
                    </div>
                </div>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    <option value="" disabled>Selecciona el Rol</option> {/* Esto aparecerá inicialmente */}
                    <option value="user">Enfermero/a</option>
                    <option value="jefe">Jefe de enfermería</option>
                    <option value="staff">Médico/a</option>
                </select>


                <div className="flex justify-center gap-6 mt-6">
                    <button
                        type="button"
                        onClick={handleGoBack} // Llama a la función para mostrar el modal
                        className="flex items-center px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        <FiHome size={22} className="mr-2" /> Regresar
                    </button>
                    <button
                        type="submit"
                        className="flex items-center px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md"
                    >
                        <FaUserPlus size={22} className="mr-2" /> Registrar
                    </button>
                </div>
            </form>
            {/* Modal de confirmación */}
            {showModal && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-center mb-4">
                            <FaExclamationTriangle size={40} className="text-yellow-500" /> {/* Emoji de advertencia */}
                        </div>
                        <h3 className="text-xl font-semibold text-center mb-4">¿Seguro que deseas regresar?</h3>
                        <p className="text-center mb-4">Perderás todos los datos ingresados si no los guardas.</p>
                        <div className="flex justify-around">
                            <button
                                onClick={handleConfirmGoBack}
                                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Sí, regresar
                            </button>
                            <button
                                onClick={handleCancelGoBack}
                                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                No, continuar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegisterUser;