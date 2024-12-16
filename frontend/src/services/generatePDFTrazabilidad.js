import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// Mapeo amigable de nombres de campo
const friendlyFieldNames = {
    primer_nombre: "Primer nombre",
    segundo_nombre: "Segundo nombre",
    primer_apellido: "Primer apellido",
    segundo_apellido: "Segundo apellido",
    Nombre: "Nombre",
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

// Campos a excluir
const excludeKeys = ["id", "id_paciente"];
const shouldExclude = (key, data) =>
    excludeKeys.includes(key) ||
    (key === "peso_adulto" && data.peso_pediatrico) ||
    (key === "peso_pediatrico" && data.peso_adulto);

// Funciones auxiliares
const formatDateOnly = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) {
        return "Fecha no disponible"; // Validar si la fecha es inválida
    }

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()); // Año completo sin truncar

    return `${day}/${month}/${year}`; // Solo fecha sin hora
};

const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) return "Fecha no disponible";
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(dateString));
};

const capitalizeFirstLetter = (str) => {
    return str
        .toLowerCase()
        .split(" ") // Divide en palabras
        .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra
        .join(" "); // Une las palabras de nuevo
};

const mapFieldName = (key) => {
    const friendlyName = friendlyFieldNames[key];
    return friendlyName ? capitalizeFirstLetter(friendlyName) : capitalizeFirstLetter(key.replace(/_/g, " "));
};

const calculateStartY = (doc, startY, requiredHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    if (startY + requiredHeight > pageHeight) {
        doc.addPage();
        return 20; // Reset al margen superior
    }
    return startY;
};

// Procesar datos
const processDataForPDF = (data) => {
    return Object.entries(data)
        .filter(([key]) => !shouldExclude(key, data))
        .map(([key, value]) => {
            if (key === "fecha_nacimiento" && value) {
                return [mapFieldName(key), formatDateOnly(value)];
            }
            if (key === "created_at" && typeof value === "object") {
                return [mapFieldName(key), formatDateOnly(value.nuevo)];
            }
            if (typeof value === "object" && value !== null && value.nuevo) {
                return [mapFieldName(key), value.nuevo || "Sin información"];
            }
            if (key.includes("fecha") || (typeof value === "string" && value.includes("T"))) {
                return [mapFieldName(key), formatDateOnly(value)];
            }
            return [mapFieldName(key), value || "Sin información"];
        });
};

// Renderizar tablas estilizadas
const renderStyledTable = (doc, startY, data, title, header, marginX, actionType) => {
    if (!data || Object.keys(data).length === 0) {
        doc.setFont("helvetica", "italic");
        doc.text("No hay datos disponibles.", marginX, startY);
        return startY + 10;
    }

    const tableData = [];

    // Mostrar Información del Paciente solo para acciones específicas
    if (
        ["Nuevo registro de Signos Vitales", "Actualización de Signos Vitales"].includes(actionType) &&
        data.paciente
    ) {
        tableData.push([
            { content: "Información del Paciente", colSpan: 2, styles: { halign: "center", fontStyle: "bold", fillColor: [200, 230, 255] } }
        ]);
        Object.entries(data.paciente).forEach(([key, value]) => {
            tableData.push([mapFieldName(key), value || "No disponible"]);
        });

        // Agregar un separador visual
        tableData.push([{ content: "", colSpan: 2, styles: { fillColor: [255, 255, 255] } }]);
    }

    // Datos Nuevos (excluye "paciente")
    const filteredData = Object.entries(data).filter(([key]) => key !== "paciente" && !shouldExclude(key, data));
    if (filteredData.length > 0) {
        tableData.push([
            { content: title, colSpan: 2, styles: { halign: "center", fontStyle: "bold", fillColor: [41, 128, 185], textColor: 255 } }
        ]);

        filteredData.forEach(([key, value]) => {
            if (key === "created_at" && typeof value === "object") {
                tableData.push([mapFieldName(key), formatDateOnly(value.nuevo)]);
            } else if (typeof value === "object" && value !== null && value.nuevo) {
                tableData.push([mapFieldName(key), value.nuevo || "Sin información"]);
            } else if (key.includes("fecha") || (typeof value === "string" && value.includes("T"))) {
                tableData.push([mapFieldName(key), formatDateOnly(value)]);
            } else {
                tableData.push([mapFieldName(key), value || "Sin información"]);
            }
        });
    }

    // Renderizar la tabla final
    autoTable(doc, {
        startY,
        body: tableData,
        theme: "grid",
        tableWidth: "auto", // Hace que la tabla se ajuste uniformemente
        styles: {
            fontSize: 10, // Tamaño de fuente
            cellPadding: 3, // Espacio interno entre texto y bordes
            halign: "center", // Centrar el contenido horizontalmente
            valign: "middle", // Centrar el contenido verticalmente
        },
        headStyles: { 
            fillColor: [41, 128, 185], // Fondo azul
            textColor: 255, // Texto blanco
            halign: "center", // Centrar encabezado
        },
        alternateRowStyles: { fillColor: [245, 245, 245] }, // Filas alternas
        margin: { left: 20, right: 20 }, // Márgenes consistentes
    });

    return doc.lastAutoTable.finalY + 10;
};

// Función para renderizar la tabla de información
const renderTablaConCondicion = (doc, startY, datos, tipoAccion, responsableDescarga) => {
    const titulo = tipoAccion === "Descarga de PDF" ? "Información del Paciente" : "Datos Nuevos";

    // Crear el cuerpo de la tabla
    const cuerpoTabla = Object.entries(datos).map(([key, value]) => [
        mapFieldName(key), value || "Sin información"
    ]);

    // Agregar "Responsable de la descarga" como última fila si aplica
    if (tipoAccion === "Descarga de PDF" && responsableDescarga) {
        cuerpoTabla.push([
            { content: "Responsable de la descarga", styles: { fontStyle: "bold", fillColor: [230, 247, 255] } },
            { content: responsableDescarga, styles: { fillColor: [230, 247, 255] } }
        ]);
    }

    // Renderizar la tabla con un encabezado manual y sin repetir en nuevas páginas
    autoTable(doc, {
        startY,
        head: [[
            { content: titulo, colSpan: 2, styles: { halign: "center", fillColor: [41, 128, 185], textColor: 255 } }
        ]],
        body: cuerpoTabla,
        theme: "grid",
        tableWidth: "auto", // Ancho consistente entre tablas
        styles: {
            fontSize: 10, 
            cellPadding: 3, 
            halign: "center",
            valign: "middle", 
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 20, right: 20 }, // Márgenes iguales
        showHead: "firstPage", // No repite encabezado en nuevas páginas
    });

    return doc.lastAutoTable.finalY + 10; // Nueva posición Y después de la tabla
};

const generatePDFTrazabilidad = async (usuarioInfo, trazabilidadData) => {
    try {
        const doc = new jsPDF();
        const MARGIN_X = 20;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let startY = 20;

        // Calcular rango de fechas de las acciones
        const calcularRangoFechas = (acciones) => {
            const fechas = acciones.map((accion) => new Date(accion.fecha_hora));
            const fechaInicio = new Date(Math.min(...fechas));
            const fechaFin = new Date(Math.max(...fechas));
            return `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`;
        };

        // Encabezado principal del reporte
        const drawReportHeader = () => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.setTextColor(41, 76, 119);
            doc.text("Reporte de Trazabilidad", pageWidth / 2, startY, { align: "center" });
            startY += 10; // Reduje el espacio vertical
        };

        const drawUserHeader = (usuario, rangoFechas) => {
            doc.setFillColor(41, 128, 185); // Color de la tabla
            doc.rect(0, startY, pageWidth, 20, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.setTextColor(255, 255, 255);
            doc.text(`Responsable de la acción: ${usuario}`, MARGIN_X, startY + 10);
            doc.text(`Rango de fechas: ${rangoFechas}`, MARGIN_X, startY + 16);

            startY += 28; // Reduje el espacio adicional
        };

        // Iniciar PDF
        drawReportHeader();

        // Agrupar los datos por usuario
        const groupedData = trazabilidadData.reduce((acc, item) => {
            const userName = item.usuario_nombre || "Usuario desconocido";
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(item);
            return acc;
        }, {});

        let firstPage = true;

// Recorrer los datos agrupados por usuario
for (const [usuario, acciones] of Object.entries(groupedData)) {
    const rangoFechas = calcularRangoFechas(acciones);
    let headerPrinted = false; // Bandera para controlar el encabezado

    // Salto de página al inicio de cada nuevo usuario
    if (!firstPage) {
        doc.addPage();
        startY = 20;
        drawReportHeader();
    }
    firstPage = false;

    // Encabezado de usuario (solo una vez por usuario)
    drawUserHeader(usuario, rangoFechas);

    acciones.forEach((accion) => {
        // Validar si se necesita salto de página
        if (startY + 30 > pageHeight - 20) {
            doc.addPage();
            startY = 20;
            drawReportHeader();
            drawUserHeader(usuario, rangoFechas); // Redibujar solo si es una nueva página
        }

        // Acción principal
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(41, 76, 119);
        doc.text(`Acción: ${accion.accion || "Sin acción"}`, MARGIN_X, startY);
        startY += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`Fecha y Hora: ${formatDate(accion.fecha_hora)}`, MARGIN_X, startY);
        startY += 6;

        if (accion.responsable) {
            doc.text(`Responsable: ${accion.responsable}`, MARGIN_X, startY);
            startY += 6;
        }

        startY += 10;

        // Datos Nuevos
        // Datos Nuevos
        const datosNuevos = typeof accion.datos_nuevos === "string" ? JSON.parse(accion.datos_nuevos || "{}") : accion.datos_nuevos;

        if (accion.accion === "Descarga de PDF") {
            const responsableDescarga = accion.usuario_nombre || "No especificado";
            startY = renderTablaConCondicion(doc, startY, datosNuevos.paciente || datosNuevos, accion.accion, responsableDescarga);
        } else if (datosNuevos && Object.keys(datosNuevos).length > 0) {
            startY = renderStyledTable(doc, startY, datosNuevos, "Datos Nuevos", "Valores Nuevos", MARGIN_X);
        }

        // Datos Anteriores
        const datosAntiguos = typeof accion.datos_antiguos === "string" ? JSON.parse(accion.datos_antiguos || "{}") : accion.datos_antiguos;

        if (datosAntiguos && Object.keys(datosAntiguos).length > 0) {
            startY = renderStyledTable(doc, startY, datosAntiguos, "Datos Anteriores", "Valores Anteriores", MARGIN_X);
        }
    });
}

        // Información General al final
        const drawStyledSectionHeader = (title) => {
            doc.setFillColor(41, 128, 185); // Fondo azul fuerte
            doc.rect(MARGIN_X - 10, startY, pageWidth - 2 * MARGIN_X + 20, 12, "F");
            doc.setFont("helvetica", "bold");
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.text(title, pageWidth / 2, startY + 8, { align: "center" });
            startY += 20;
        };

        const drawInfoCard = (label, value) => {
            const cardHeight = 12;
            doc.setFillColor(240, 248, 255); // Azul muy claro
            doc.roundedRect(MARGIN_X, startY, pageWidth - 2 * MARGIN_X, cardHeight, 3, 3, "F");

            doc.setFont("helvetica", "bold");
            doc.setTextColor(41, 76, 119);
            doc.text(label, MARGIN_X + 5, startY + 8);

            doc.setFont("helvetica", "normal");
            doc.setTextColor(0, 0, 0);
            doc.text(value, pageWidth - MARGIN_X - 5, startY + 8, { align: "right" });
            startY += cardHeight + 5;
        };

        const drawGradientLine = () => {
            doc.setLineWidth(2);
            doc.setDrawColor(41, 128, 185);
            doc.line(MARGIN_X, startY, pageWidth - MARGIN_X, startY);
            startY += 8;
        };

        // Renderizado de Información General
        doc.addPage();
        startY = 20;
        drawStyledSectionHeader("Resumen General");

        drawInfoCard("Total de acciones:", `${trazabilidadData.length}`);
        Object.entries(groupedData).forEach(([usuario, acciones]) => {
            drawInfoCard(`Usuario: ${usuario}`, `Acciones: ${acciones.length}`);
        });

        drawGradientLine();
        doc.setFont("helvetica", "italic");
        doc.setTextColor(100, 100, 100);
        doc.text(`Reporte generado el: ${new Date().toLocaleDateString()}`, MARGIN_X, startY + 5);


        const formattedDate = new Date().toISOString().split("T")[0];
        doc.save(`Trazabilidad_Reporte_${formattedDate}.pdf`);
        toast.success("PDF generado exitosamente.");
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        toast.error("Hubo un error al generar el PDF.");
    }
};

export default generatePDFTrazabilidad;