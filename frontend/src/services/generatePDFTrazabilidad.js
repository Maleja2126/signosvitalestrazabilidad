import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

const formatDate = (dateString) => {
    try {
        const options = { 
            year: "numeric", 
            month: "long", 
            day: "numeric", 
            hour: "2-digit", 
            minute: "2-digit", 
            second: "2-digit" 
        };
        return new Intl.DateTimeFormat("es-ES", options).format(new Date(dateString));
    } catch (error) {
        console.error("Error al formatear la fecha:", error);
        return "Fecha no disponible";
    }
};

const formatDateOnly = (dateString) => {
    try {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0-11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    } catch (error) {
        console.error("Error al formatear la fecha:", error);
        return "Fecha no disponible";
    }
};

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

const mapFieldName = (key) => friendlyFieldNames[key] || key.replace(/_/g, " ").toUpperCase();

const renderStyledTable = (doc, startY, data, title, header, marginX) => {
    if (data && typeof data === "object" && Object.keys(data).length > 0) {
        const isValidDate = (value) => {
            const date = new Date(value);
            return !isNaN(date.getTime()) && value.includes("-");
        };
        
        const tableData = Object.entries(data).map(([key, value]) => [
            mapFieldName(key),
            typeof value === "string" && isValidDate(value)
                ? formatDateOnly(value)
                : (typeof value === "object" ? JSON.stringify(value, null, 2) : value || "No disponible")
        ]);        

        autoTable(doc, {
            startY,
            head: [[title, header]],
            body: tableData,
            theme: "striped",
            styles: { fontSize: 10, halign: "left" },
            headStyles: {
                fillColor: [41, 128, 185],
                textColor: 255,
                fontStyle: "bold",
            },
            bodyStyles: { textColor: 50 },
            alternateRowStyles: { fillColor: [245, 245, 245] },
            columnStyles: {
                0: { cellWidth: 70 },
                1: { cellWidth: 100 },
            },
        });

        return doc.lastAutoTable.finalY + 10;
    } else {
        doc.setFont("helvetica", "italic");
        doc.text("No hay datos para esta sección.", marginX, startY);
        return startY + 10;
    }
};

const generatePDFTrazabilidad = async (usuarioInfo, trazabilidadData) => {
    try {
        console.log("Usuario Info:", usuarioInfo);
        console.log("Trazabilidad Data:", trazabilidadData);

        const doc = new jsPDF();
        const MARGIN_X = 20;
        let startY = 20;

        // Encabezado
        doc.setFont("helvetica", "bold");
        doc.setFontSize(20);
        doc.text("Reporte de Trazabilidad", MARGIN_X, startY);
        startY += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Usuario: ${usuarioInfo.nombre || "Usuario desconocido"}`, MARGIN_X, startY);
        startY += 6;
        doc.text(
            `Rango de Fechas: ${formatDate(usuarioInfo.fechaInicio)} - ${formatDate(usuarioInfo.fechaFin)}`,
            MARGIN_X,
            startY
        );
        startY += 10;
        doc.line(MARGIN_X, startY, 190, startY); // Línea divisoria
        startY += 10;

        if (!Array.isArray(trazabilidadData) || trazabilidadData.length === 0) {
            doc.text("No se encontraron registros de trazabilidad para este usuario.", MARGIN_X, startY);
        } else {
            trazabilidadData.forEach((accion, index) => {
                if (startY + 60 > doc.internal.pageSize.height) {
                    doc.addPage();
                    startY = 20;
                }

                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.text(`Acción: ${accion.accion || "Sin acción"}`, MARGIN_X, startY);
                startY += 8;

                doc.setFont("helvetica", "normal");
                doc.text(`Fecha y Hora: ${formatDate(accion.fecha_hora)}`, MARGIN_X, startY);
                startY += 6;

                if (accion.responsable) {
                    doc.text(`Responsable: ${accion.responsable}`, MARGIN_X, startY);
                    startY += 6;
                }

                let datosNuevos = accion.datos_nuevos || {};
                let datosAntiguos = accion.datos_antiguos || {};

                try {
                    datosNuevos = typeof datosNuevos === "string" ? JSON.parse(datosNuevos) : datosNuevos;
                    datosAntiguos = typeof datosAntiguos === "string" ? JSON.parse(datosAntiguos) : datosAntiguos;
                } catch (error) {
                    console.error("Error al parsear los datos JSON:", error);
                }

                if (datosNuevos && Object.keys(datosNuevos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosNuevos, "Datos Nuevos", "Valores Nuevos", MARGIN_X);
                }

                if (datosAntiguos && Object.keys(datosAntiguos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosAntiguos, "Datos Anteriores", "Valores Anteriores", MARGIN_X);
                }
            });
        }

        const formattedDate = new Date().toISOString().split("T")[0];
        doc.save(`Trazabilidad_${usuarioInfo.nombre || "Reporte"}_${formattedDate}.pdf`);
        toast.success("PDF generado exitosamente.");
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        toast.error("Hubo un error al generar el PDF.");
    }
};

export default generatePDFTrazabilidad;