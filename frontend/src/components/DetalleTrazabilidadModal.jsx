import React, { useEffect, useState } from "react";
import Modal from "react-modal";

// Configuración para accesibilidad
Modal.setAppElement("#root");

const DetalleTrazabilidadModal = ({ isOpen, onClose, trazabilidadId }) => {
  const [trazabilidad, setTrazabilidad] = useState(null);
  const [error, setError] = useState(null);

  // Función para parsear datos JSON
  const parseDatos = (data) => {
    try {
      return data ? JSON.parse(data) : {};
    } catch (err) {
      console.error("Error al parsear los datos:", data, err);
      return {};
    }
  };

  // Formateo de fechas
  const formatFechaGeneral = (fecha, includeTime = false) => {
    // Verifica si la fecha existe y es válida
    if (!fecha) return "No disponible";

    const date = new Date(fecha);

    if (isNaN(date.getTime())) {
      // Valida si el valor se pudo convertir a una fecha válida
      return "No disponible";
    }

    // Formatea la fecha
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      ...(includeTime && {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });
  };

  // Formateo de cambios (anterior/nuevo)
  const formatCambios = (value) => {
    if (typeof value === "object" && value !== null) {
      const { anterior, nuevo } = value;
      return (
        <>
          {anterior && (
            <span className="text-gray-500">
              <strong>Anterior:</strong> {anterior}
            </span>
          )}
          <br />
          <span className="text-green-500">
            <strong>Nuevo:</strong> {nuevo}
          </span>
        </>
      );
    }
    return value || "No disponible";
  };

  // Efecto para cargar trazabilidad al abrir el modal
  useEffect(() => {
    let isMounted = true; // Variable para evitar actualizaciones tras desmontaje
    const fetchTrazabilidad = async () => {
      if (!trazabilidadId) {
        setTrazabilidad(null);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/traceability/${trazabilidadId}`
        );

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.statusText}`);
        }

        const data = await response.json();

        const datosAntiguos = parseDatos(data.datos_antiguos);
        const datosNuevos = parseDatos(data.datos_nuevos);

        if (isMounted) {
          setTrazabilidad({
            ...data,
            datos_antiguos: datosAntiguos,
            datos_nuevos: datosNuevos,
          });
          setError(null);
        }
      } catch (err) {
        console.error("Error al cargar los detalles de trazabilidad:", err);
        if (isMounted)
          setError(
            "No se pudo cargar la información de trazabilidad. Verifica la conexión con el servidor."
          );
      }
    };

    fetchTrazabilidad();
    return () => {
      isMounted = false; // Limpieza en desmontaje
    };
  }, [trazabilidadId]);

  // Nombres amigables para los campos
  const friendlyFieldNames = {
    primer_nombre: "Primer nombre",
    segundo_nombre: "Segundo nombre",
    primer_apellido: "Primer apellido",
    segundo_apellido: "Segundo apellido",
    nombre: "Nombre",
    tipo_identificacion: "Tipo de identificación",
    numero_identificacion: "Número de identificación",
    fecha_nacimiento: "Fecha de nacimiento",
    ubicacion: "Ubicación (Habitación)",
    status: "Estado",
    estadoAnterior: "Estado anterior",
    estadoNuevo: "Estado nuevo",
    age_group: "Tipo de Paciente",
    responsable_username: "Responsable del registro del paciente",
    responsable_signos: "Responsable del registro de Signos Vitales",
    responsable: "Responsable de la actualización del registro del paciente",
    created_at: "Fecha de creación",
    record_date: "Fecha de registro",
    record_time: "Hora de registro",
    presion_sistolica: "Presión Sistólica (mmHg)",
    presion_diastolica: "Presión Diastólica (mmHg)",
    presion_media: "Presión Media (mmHg)",
    pulso: "Pulso (lat/min)",
    temperatura: "Temperatura (°C)",
    frecuencia_respiratoria: "Frecuencia Respiratoria (resp/min)",
    saturacion_oxigeno: "Saturación de Oxígeno (%)",
    peso_adulto: "Peso (Adulto) (kg)",
    peso_pediatrico: "Peso (Pediátrico) (kg)",
    talla: "Talla (cm)",
    observaciones: "Observaciones",
  };

  // Configuración de acciones
  const actionSettings = {
    Creación: {
      color: "bg-green-200",
      emoji: "✅",
      description: "Se ha creado un nuevo registro",
      showPrevious: false,
    },
    "Actualización de datos del paciente": {
      color: "bg-yellow-100",
      emoji: "⚠️",
      description: "Se actualizaron los datos del paciente",
      showPrevious: true,
    },
    "Descarga de PDF": {
      color: "bg-red-100",
      emoji: "📑",
      description: "Se ha descargado el historial del paciente",
      showPrevious: false,
    },
    "Cambio de estado del paciente": {
      color: "bg-blue-100",
      emoji: "🔄",
      description: "Se cambió el estado del paciente",
      showPrevious: true,
    },
    "Nuevo registro de Signos Vitales": {
      color: "bg-pink-100",
      emoji: "📉",
      description: "Se ha creado un nuevo registro de signos vitales",
      showPrevious: false,
    },
    "Actualización de Signos Vitales": {
      color: "bg-purple-100",
      emoji: "📝",
      description: "Se ha actualizado un registro de signos vitales",
      showPrevious: true,
    },
  };

  //LA MAS TEDIOSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  const renderDatos = (datos, titulo, colorClass, emoji, isPrevious = false) => {
  // Verifica si los datos están vacíos
  if ((!datos || Object.keys(datos).length === 0) && isPrevious) {
    // Solo muestra el mensaje de "No hay datos disponibles" si es para datos antiguos
    return <p className="text-gray-500">No hay datos disponibles.</p>;
  }

  // Determina el color del cuadro en función de si es datos antiguos o nuevos
  const effectiveColorClass = isPrevious ? "text-gray-500" : colorClass;

  const camposExcluidos = ["id", "id_paciente"]; // Campos que no se deben mostrar

  // Verifica si hay tanto peso adulto como pediátrico, prioriza el que exista primero
  const tienePesoAdulto = datos?.peso_adulto;
  const tienePesoPediatrico = datos?.peso_pediatrico;

  const datosFiltrados = Object.entries(datos || {}).filter(([key]) => {
    // Excluir campos no deseados
    if (camposExcluidos.includes(key)) return false;

    // Excluir "peso_pediatrico" si ya existe "peso_adulto"
    if (key === "peso_pediatrico" && tienePesoAdulto) return false;

    // Excluir "peso_adulto" si ya existe "peso_pediatrico"
    if (key === "peso_adulto" && tienePesoPediatrico) return false;

    return true;
  });

  return (
    <div className={`mt-4 p-3 rounded-lg shadow ${isPrevious ? "bg-gray-100" : colorClass}`}>
      <h4 className="text-lg font-bold">
        {emoji} {titulo}:
      </h4>
      <ul className="list-disc list-inside">
        {datosFiltrados.map(([key, value]) => {
          // Determina si el campo es de tipo fecha
          const esFecha =
            ["created_at", "record_date", "fecha_nacimiento"].includes(key) ||
            key.toLowerCase().includes("fecha");

          // Lógica específica para objetos { anterior, nuevo }
          if (typeof value === "object" && value !== null) {
            if (trazabilidad.accion === "Actualización de Signos Vitales") {
              // Muestra solo el valor "nuevo" (formateado si es fecha)
              return (
                <li key={key}>
                  <strong className={effectiveColorClass}>
                    {friendlyFieldNames[key] || key}:
                  </strong>{" "}
                  <span className={colorClass}>
                    {esFecha
                      ? formatFechaGeneral(value.nuevo)
                      : value.nuevo || "No disponible"}
                  </span>
                </li>
              );
            } else {
              // Para otras acciones, muestra anterior y nuevo (formateados si son fechas)
              return (
                <li key={key}>
                  <strong>{friendlyFieldNames[key] || key}:</strong>{" "}
                  <span className="text-gray-500">
                    Anterior:{" "}
                    {esFecha
                      ? formatFechaGeneral(value.anterior)
                      : value.anterior || "No disponible"}
                  </span>{" "}
                  ,{" "}
                  <span className={colorClass}>
                    Nuevo:{" "}
                    {esFecha
                      ? formatFechaGeneral(value.nuevo)
                      : value.nuevo || "No disponible"}
                  </span>
                </li>
              );
            }
          }

          // Lógica para valores simples (no objetos)
          return (
            <li key={key}>
              <strong>{friendlyFieldNames[key] || key}:</strong>{" "}
              {esFecha
                ? formatFechaGeneral(value) // Formatear si es fecha
                : value || "No disponible"}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

  const renderDetalles = () => {
    if (!trazabilidad) return "Cargando datos...";

    const { datos_antiguos, datos_nuevos, accion } = trazabilidad;

    console.log("Trazabilidad datos:", trazabilidad); // Para depuración

    return (
        <div>
            {/* Condición para mostrar "Datos Anteriores" solo si corresponde */}
            {actionSettings[accion]?.showPrevious && datos_antiguos && Object.keys(datos_antiguos).length > 0 && (
                renderDatos(datos_antiguos, "Datos Anteriores", "bg-gray-100", "📋", true)
            )}

            {/* Renderizado de datos nuevos o específicos según la acción */}
            {datos_nuevos && Object.keys(datos_nuevos).length > 0 ? (
                renderDatos(
                    datos_nuevos,
                    accion === "Descarga de PDF" ? "Información del Paciente" : "Datos Nuevos",
                    actionSettings[accion]?.color || "bg-gray-200",
                    accion === "Descarga de PDF" ? "📑" : "🆕"
                )
            ) : (
                <p className="text-gray-500">No hay datos disponibles para esta acción.</p>
            )}
        </div>
    );
};

  return (
    isOpen && (
      <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="w-[50%] bg-gradient-to-br from-white to-gray-100 rounded-lg shadow-xl p-5 max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center"
    >
      <div className="text-center w-full space-y-4">
        {trazabilidad ? (
          <>
            {console.log("Datos de trazabilidad en el frontend:", trazabilidad)}
    
            {/* Título del modal */}
            <h2 className="text-2xl font-bold text-black mb-6">Detalles de Trazabilidad</h2>
    
            <div className="text-left">
              {/* Usuario general */}
              <p className="mb-1">
                <strong>Usuario:</strong> {trazabilidad.usuario_nombre || "No disponible"}
              </p>
    
              {/* Acción literal con color */}
              <p className="mb-1">
                <strong>Acción:</strong>{" "}
                <span
                  className={`font-bold text-black px-2 py-1 rounded ${actionSettings[trazabilidad.accion]?.color || "bg-gray-200"
                    }`}
                >
                  {trazabilidad.accion || "No disponible"}
                </span>
              </p>
    
              {/* Fecha y hora */}
              <p className="mb-8">
                <strong>Fecha - Hora:</strong>{" "}
                {formatFechaGeneral(trazabilidad.fecha_hora, true) || "No disponible"}
              </p>
    
              {/* Detalle con descripción y emoji al final */}
              <p className="mb-2">
                <strong>Detalle:</strong>{" "}
                {actionSettings[trazabilidad.accion]
                  ? `${actionSettings[trazabilidad.accion].description} ${actionSettings[trazabilidad.accion].emoji}`
                  : "No disponible"}
              </p>
    
              {/* Información del paciente y responsable (solo para "Descarga de PDF") */}
              {trazabilidad.accion === "Descarga de PDF" ? (
                <>
                  {/* Información del Paciente */}
                  <div
                    className={`mt-4 p-3 rounded-lg ${trazabilidad.accion === "Descarga de PDF"
                      ? "bg-gray-200"
                      : actionSettings[trazabilidad.accion]?.color || "bg-gray-200"
                      }`}
                  >
                    <h4 className="text-lg font-bold mb-4">
                      {trazabilidad.accion === "Descarga de PDF"
                        ? "📋 Información del Paciente:"
                        : "🆕 Datos Nuevos:"}
                    </h4>
                    <ul className="list-disc list-inside">
                      {Object.entries(trazabilidad.datos_nuevos || {}).map(([key, value]) => (
                        <li key={key}>
                          <strong>{friendlyFieldNames[key] || key}:</strong> {value || "No disponible"}
                        </li>
                      ))}
                    </ul>
                  </div>
    
                  {/* Responsable de la descarga */}
                  <div
                    className={`mt-6 p-3 rounded-lg shadow ${actionSettings[trazabilidad.accion]?.color || "bg-gray-200"
                      }`}
                  >
                    <h4 className="text-lg font-bold mb-4"> 📥Responsable de la descarga:</h4>
                    <p className="text-black-800">
                      <strong>Nombre:</strong> {trazabilidad.usuario_nombre || "No disponible"}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  {/* Detalles adicionales para otras acciones */}
                  {trazabilidad.datos_antiguos && Object.keys(trazabilidad.datos_antiguos).length > 0 ? (
                    <>
                      {renderDatos(
                        trazabilidad.datos_antiguos,
                        "Datos Anteriores",
                        "bg-gray-100",
                        "📋",
                        true // Indicador de datos antiguos
                      )}
                      {renderDatos(
                        trazabilidad.datos_nuevos,
                        "Datos Nuevos",
                        actionSettings[trazabilidad.accion]?.color || "bg-gray-200",
                        "🆕"
                      )}
                    </>
                  ) : (
                    trazabilidad.datos_nuevos &&
                    renderDatos(
                      trazabilidad.datos_nuevos,
                      "Datos Nuevos",
                      actionSettings[trazabilidad.accion]?.color || "bg-gray-200",
                      "🆕"
                    )
                  )}
                </>
              )}
            </div>
          </>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-gray-500">Cargando detalles...</p>
        )}
    
        {/* Botón para cerrar */}
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Cerrar
        </button>
      </div>
    </Modal>    
    )
  );
};

export default DetalleTrazabilidadModal;