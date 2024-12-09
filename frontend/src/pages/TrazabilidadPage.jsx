import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaInfoCircle, FaSearch } from "react-icons/fa";
import DetalleTrazabilidadModal from "../components/DetalleTrazabilidadModal";
import generatePDFTrazabilidad from "../services/generatePDFTrazabilidad"; 

const TrazabilidadPage = () => {
  const [trazabilidad, setTrazabilidad] = useState([]);
  const [filteredTrazabilidad, setFilteredTrazabilidad] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrazabilidadId, setSelectedTrazabilidadId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el formulario de exportación
  const [selectedUsuarioNombre, setSelectedUsuarioNombre] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  useEffect(() => {
    const fetchTrazabilidad = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/traceability");
        const data = response.data;

        if (data.records && data.records.length > 0) {
          setTrazabilidad(data.records);
          setFilteredTrazabilidad(data.records);
          setError(null); // Limpia errores previos
        } else {
          setTrazabilidad([]);
          setError(null); // No hay registros, pero no es un error
        }
      } catch (error) {
        console.error("Error al cargar los registros de trazabilidad:", error);
        setError("Hubo un error al cargar los registros.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrazabilidad();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === "") {
      setFilteredTrazabilidad(trazabilidad);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      setFilteredTrazabilidad(
        trazabilidad.filter((item) =>
          item.usuario_nombre.toLowerCase().includes(lowerCaseQuery)
        )
      );
    }
  };

  const handleViewDetails = (id) => {
    setSelectedTrazabilidadId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrazabilidadId(null);
  };

  const handleExportarPDF = () => {
    if (!selectedUsuarioNombre || !fechaInicio || !fechaFin) {
        alert("Por favor selecciona un usuario y un rango de fechas.");
        return;
    }

    console.log("Usuario Seleccionado:", selectedUsuarioNombre);
    console.log("Rango de Fechas Seleccionado:", fechaInicio, fechaFin);

    const usuarioInfo = {
        id: selectedUsuarioNombre,
        nombre: filteredTrazabilidad.find((item) => item.usuario_nombre === selectedUsuarioNombre)?.usuario_nombre || "Usuario desconocido",
        fechaInicio,
        fechaFin,
    };

    // Ajustar rango de fechas para incluir todo el día correctamente
    const inicio = new Date(`${fechaInicio}T00:00:00`);
    const fin = new Date(`${fechaFin}T23:59:59`);

    console.log("Rango Ajustado - Inicio:", inicio, "Fin:", fin);

    const accionesFiltradas = trazabilidad.filter((accion) => {
        const fechaAccion = new Date(accion.fecha_hora);

        console.log("Evaluando acción:", accion);
        console.log("Fecha de acción:", fechaAccion);

        return (
            accion.usuario_nombre.toLowerCase().trim() === selectedUsuarioNombre.toLowerCase().trim() &&
            fechaAccion >= inicio &&
            fechaAccion <= fin
        );
    });

    console.log("Acciones Filtradas:", accionesFiltradas);

    if (accionesFiltradas.length === 0) {
        alert(`No se encontraron registros para el usuario ${selectedUsuarioNombre} entre ${fechaInicio} y ${fechaFin}.`);
        return;
    }

    generatePDFTrazabilidad(usuarioInfo, accionesFiltradas);
};

  const actionStyles = {
    Creación: { text: "text-green-600", dot: "bg-green-600" },
    "Actualización de datos del paciente": { text: "text-yellow-600", dot: "bg-yellow-600" },
    "Cambio de estado del paciente": { text: "text-blue-900", dot: "bg-blue-900" },
    "Nuevo registro de Signos Vitales": { text: "text-pink-600", dot: "bg-pink-600" },
    "Actualización de Signos Vitales": { text: "text-purple-500", dot: "bg-purple-500" },
    "Descarga de PDF": { text: "text-red-600", dot: "bg-red-600" },
  };

  const getActionStyle = (action) => actionStyles[action]?.text || "text-gray-600";
  const getDotStyle = (action) => actionStyles[action]?.dot || "bg-gray-600";

  return (
    <div className="trazabilidad-page bg-gray-100 min-h-screen flex flex-col items-center p-12">
      <div className="w-full max-w-6xl">
        <div className="mb-9 text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-8">Trazabilidad de Usuarios</h1>
          <div className="relative w-1/2 mx-auto">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none opacity-50">
              <FaSearch className="text-gray-500" />
            </span>
            <input
              type="text"
              placeholder="Buscar por usuario..."
              className="border border-gray-300 p-3 pl-10 rounded w-full focus:ring-0 focus:outline-none"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Formulario de exportación */}
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Exportar Trazabilidad</h2>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nombre del usuario"
              className="border border-gray-300 p-3 rounded"
              value={selectedUsuarioNombre}
              onChange={(e) => setSelectedUsuarioNombre(e.target.value)}
            />
            <input
              type="date"
              className="border border-gray-300 p-3 rounded"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
            <input
              type="date"
              className="border border-gray-300 p-3 rounded"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600 transition"
            onClick={handleExportarPDF}
          >
            Exportar PDF
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          {loading && <p className="text-center text-blue-500 py-4">Cargando registros...</p>}
          {error && <p className="text-center text-red-500 py-4">{error}</p>}
          {filteredTrazabilidad.length > 0 ? (
            <table className="table-auto w-full border-collapse bg-white text-center">
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th className="p-4">Usuario</th>
                  <th className="p-4">Acción</th>
                  <th className="p-4">Fecha - Hora</th>
                  <th className="p-4">Detalles</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrazabilidad.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-100 text-center transition-all`}
                  >
                    <td className="p-5 text-center">{item.usuario_nombre}</td>
                    <td
                      className={`p-4 font-semibold flex items-center justify-center space-x-2 ${getActionStyle(
                        item.accion
                      )}`}
                      title={`Acción: ${item.accion}`}
                    >
                      <span
                        className={`inline-block w-3 h-3 rounded-full ${getDotStyle(item.accion)}`}
                      ></span>
                      <span>{item.accion}</span>
                    </td>
                    <td className="p-5 text-center">
                      {new Date(item.fecha_hora).toLocaleString()}
                    </td>
                    <td className="p-5 text-center">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition flex items-center justify-center mx-auto"
                        onClick={() => handleViewDetails(item.id)}
                      >
                        <FaInfoCircle className="mr-2" /> Ver detalles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            !loading &&
            !error &&
            trazabilidad?.length === 0 && (
              <div className="text-center py-12 flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
                <p className="text-red-500 text-lg font-semibold flex items-center">
                  <span role="img" aria-label="alert" className="mr-2">
                    🚫
                  </span>
                  No hay registros de trazabilidad disponibles.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Verifica el usuario o intenta realizar una nueva búsqueda.
                </p>
              </div>
            )
          )}
        </div>

        <DetalleTrazabilidadModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          trazabilidadId={selectedTrazabilidadId}
        />
      </div>
    </div>
  );
};

export default TrazabilidadPage;