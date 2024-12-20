import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

const friendlyFieldNames = {
  primer_nombre: "Primer nombre",
  segundo_nombre: "Segundo nombre",
  primer_apellido: "Primer apellido",
  segundo_apellido: "Segundo apellido",
  nombre_completo: "Nombre completo",
  tipo_identificacion: "Tipo de identificación",
  numero_identificacion: "Número de identificación",
  fecha_nacimiento: "Fecha de nacimiento",
  ubicacion: "Ubicación (Habitación)",
  status: "Estado",
  estadoAnterior: "Estado anterior",
  estadoNuevo: "Estado nuevo",
  age_group: "Tipo de Paciente",
  responsable_username: "Responsable del registro",
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

const formatDate = (dateString) => {
  if (!dateString || isNaN(Date.parse(dateString))) return "Fecha no disponible";
  return new Date(dateString).toLocaleString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const shouldExcludeField = (key, data) => {
  const excludeKeys = ["id", "id_paciente"];
  if (excludeKeys.includes(key)) return true;
  if (key === "peso_adulto" && data.peso_pediatrico) return true;
  if (key === "peso_pediatrico" && data.peso_adulto) return true;
  return false;
};

const renderTable = (doc, startY, data, title, showOnlyNew = false) => {
  if (!data || Object.keys(data).length === 0) return startY;

  const tableData = Object.entries(data)
    .filter(([key, value]) => {
      if (shouldExcludeField(key, data)) return false;
      if (showOnlyNew && typeof value === "object" && value !== null) {
        return value.nuevo !== undefined;
      }
      return true;
    })
    .map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return [
          friendlyFieldNames[key] || key,
          value.nuevo !== undefined ? value.nuevo : "Sin información",
        ];
      }
      return [friendlyFieldNames[key] || key, value || "Sin información"];
    });

  autoTable(doc, {
    startY,
    head: [[title, "Valor"]],
    body: tableData,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 76, 119], textColor: 255 },
  });

  return doc.lastAutoTable.finalY + 10;
};

const extractPatientData = (data) => {
  if (data && typeof data === "object" && data.paciente) {
    return data.paciente;
  }
  return null;
};

const generatePDFTrazabilidad = async (usuarioInfo, trazabilidadData) => {
  try {
    const doc = new jsPDF();
    const MARGIN_X = 20;
    let startY = 20;

    const drawHeader = () => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("Reporte de Trazabilidad", doc.internal.pageSize.width / 2, startY, { align: "center" });
      startY += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Usuario: ${usuarioInfo.nombre}`, MARGIN_X, startY);
      doc.text(`Rango de fechas: ${formatDate(usuarioInfo.fechaInicio)} - ${formatDate(usuarioInfo.fechaFin)}`, MARGIN_X, startY + 6);
      startY += 12;
    };

    drawHeader();

    trazabilidadData.forEach((accion, index) => {
      if (startY + 50 > doc.internal.pageSize.height) {
        doc.addPage();
        startY = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(`Acción ${index + 1}: ${accion.accion || "Sin acción"}`, MARGIN_X, startY);
      startY += 8;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Fecha y Hora: ${formatDate(accion.fecha_hora)}`, MARGIN_X, startY);
      startY += 6;

      if (accion.responsable) {
        doc.text(`Responsable: ${accion.responsable}`, MARGIN_X, startY);
        startY += 6;
      }

      if (accion.datos_nuevos && typeof accion.datos_nuevos === "string") {
        const parsedNuevos = JSON.parse(accion.datos_nuevos);
        startY = renderTable(doc, startY, parsedNuevos, "Datos Nuevos", true);

        const patientData = extractPatientData(parsedNuevos);
        if (patientData) {
          startY = renderTable(doc, startY, patientData, "Información del Paciente");
        }
      }

      if (accion.datos_antiguos && typeof accion.datos_antiguos === "string") {
        const parsedAntiguos = JSON.parse(accion.datos_antiguos);
        startY = renderTable(doc, startY, parsedAntiguos, "Datos Anteriores");

        const patientData = extractPatientData(parsedAntiguos);
        if (patientData) {
          startY = renderTable(doc, startY, patientData, "Información del Paciente");
        }
      }

      if (accion.paciente && Object.keys(accion.paciente).length > 0) {
        startY = renderTable(doc, startY, accion.paciente, "Información del Paciente");
      }
    });

    const resumen = [
      ["Total de acciones", trazabilidadData.length],
      ...Object.entries(
        trazabilidadData.reduce((acc, item) => {
          const user = item.usuario_nombre || "Desconocido";
          acc[user] = (acc[user] || 0) + 1;
          return acc;
        }, {})
      ).map(([user, count]) => [user, count]),
    ];

    autoTable(doc, {
      startY: startY + 5,
      head: [["Usuario", "Acciones"]],
      body: resumen,
      theme: "grid",
    });

    const formattedDate = new Date().toISOString().split("T")[0];
    doc.save(`Trazabilidad_Reporte_${formattedDate}.pdf`);
    toast.success("PDF generado exitosamente.");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    toast.error("Hubo un error al generar el PDF.");
  }
};

export default generatePDFTrazabilidad;