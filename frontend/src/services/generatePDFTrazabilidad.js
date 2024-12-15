import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "react-toastify";

// **Mapeo amigable de nombres de campo**
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

// **Campos a excluir**
const excludeKeys = ["id", "id_paciente"];
const shouldExclude = (key, data) =>
    excludeKeys.includes(key) ||
    (key === "peso_adulto" && data.peso_pediatrico) ||
    (key === "peso_pediatrico" && data.peso_adulto);

// **Funciones auxiliares**
const formatDateOnly = (dateString) => {
    console.log("Recibido en formatDateOnly:", dateString);

    // Detectar formato DD/MM/YYYY y convertirlo
    const dateParts = dateString.split("/");
    if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        const parsedDate = new Date(`${year}-${month}-${day}`);
        if (!isNaN(parsedDate)) {
            console.log("Fecha convertida manualmente:", parsedDate);
            return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
        }
    }

    // Manejar formato estándar
    if (!dateString || isNaN(Date.parse(dateString))) {
        console.log("Fecha inválida o no disponible:", dateString);
        return "Fecha no disponible";
    }

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
};

const formatDate = (dateString) => {
    if (!dateString || isNaN(Date.parse(dateString))) return "Fecha no disponible";
    const options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    return new Intl.DateTimeFormat("es-ES", options).format(new Date(dateString));
};

const mapFieldName = (key) => friendlyFieldNames[key] || key.replace(/_/g, " ").toUpperCase();

const calculateStartY = (doc, startY, requiredHeight) => {
    const pageHeight = doc.internal.pageSize.height;
    if (startY + requiredHeight > pageHeight) {
        doc.addPage();
        return 20; // Reset al margen superior
    }
    return startY;
};

// **Procesar datos**
const processDataForPDF = (data) => {
    console.log("Datos recibidos:", data);
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

// **Renderizar tablas estilizadas**
const renderStyledTable = (doc, startY, data, title, header, marginX, actionType) => {
    if (!data || Object.keys(data).length === 0) {
        doc.setFont("helvetica", "italic");
        doc.text("No hay datos disponibles.", marginX, startY);
        return startY + 10;
    }

    const tableData = [];

    // **Mostrar Información del Paciente solo para acciones específicas**
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

    // **Datos Nuevos (excluye "paciente")**
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
        styles: { fontSize: 10, cellPadding: 3, halign: "center" },
        alternateRowStyles: { fillColor: [245, 245, 245] },
    });

    return doc.lastAutoTable.finalY + 10;
};

const generatePDFTrazabilidad = async (usuarioInfo, trazabilidadData) => {
    console.log("Generando PDF de trazabilidad de usuarios final");
    try {
        const doc = new jsPDF();
        const MARGIN_X = 20;
        const pageWidth = doc.internal.pageSize.width;
        const pageHeight = doc.internal.pageSize.height;
        let startY = 20;
        let currentPage = 1;

        const calcularRangoFechas = (acciones) => {
            const fechas = acciones.map((accion) => new Date(accion.fecha_hora));
            const fechaInicio = new Date(Math.min(...fechas));
            const fechaFin = new Date(Math.max(...fechas));
            return `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`;
        };

        const drawReportHeader = () => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.setTextColor(41, 76, 119);
            doc.text("Reporte de Trazabilidad", pageWidth / 2, startY, { align: "center" });
            startY += 15;
        };

        const drawUserHeader = (usuario, rangoFechas) => {
            doc.setFillColor(41, 76, 119);
            doc.rect(0, startY, pageWidth, 20, "F");

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255);
            doc.text(`Responsable de la acción: ${usuario}`, MARGIN_X, startY + 10);
            doc.text(`Rango de fechas: ${rangoFechas}`, MARGIN_X, startY + 16);

            startY += 30;
        };

        const drawFooter = () => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`${currentPage}`, pageWidth - 20, pageHeight - 10);
        };

        drawReportHeader();
        drawFooter(doc, currentPage);

        const groupedData = trazabilidadData.reduce((acc, item) => {
            const userName = item.usuario_nombre || "Usuario desconocido";
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(item);
            return acc;
        }, {});

        let firstPage = true;

        for (const [usuario, acciones] of Object.entries(groupedData)) {
            const rangoFechas = calcularRangoFechas(acciones);

            if (firstPage) {
                drawUserHeader(usuario, rangoFechas);
                firstPage = false;
            } else {
                doc.addPage();
                currentPage++;
                drawFooter(doc, currentPage);
                startY = 20;
                drawReportHeader();
                drawUserHeader(usuario, rangoFechas);
            }

            acciones.forEach((accion, index) => {
                if (index > 0) {
                    doc.addPage();
                    currentPage++;
                    drawFooter(doc, currentPage);
                    startY = 20;
                }

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
                const datosNuevos = typeof accion.datos_nuevos === "string" ? JSON.parse(accion.datos_nuevos || "{}") : accion.datos_nuevos;

                // Mostrar Información del Paciente primero si aplica
                if (
                    ["Nuevo registro de Signos Vitales", "Actualización de Signos Vitales"].includes(accion.accion) &&
                    datosNuevos?.paciente
                ) {
                    startY = renderStyledTable(
                        doc,
                        startY,
                        datosNuevos.paciente,
                        "Información del Paciente",
                        "Detalles",
                        MARGIN_X
                    );
                }

                // Renderizar el resto de Datos Nuevos
                if (datosNuevos && Object.keys(datosNuevos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosNuevos, "Datos Nuevos", "Valores Nuevos", MARGIN_X);
                }

                // Datos Anteriores
                const datosAntiguos =
                    typeof accion.datos_antiguos === "string" ? JSON.parse(accion.datos_antiguos || "{}") : accion.datos_antiguos;

                if (datosAntiguos && Object.keys(datosAntiguos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosAntiguos, "Datos Anteriores", "Valores Anteriores", MARGIN_X);
                }
            });
        }

        doc.addPage();
        currentPage++;
        drawFooter(doc, currentPage);
        startY = 20;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.setTextColor(41, 76, 119);
        doc.text("Información General", pageWidth / 2, startY, { align: "center" });
        startY += 15;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Total de acciones: ${trazabilidadData.length}`, MARGIN_X, startY);
        startY += 8;

        Object.entries(groupedData).forEach(([usuario, acciones]) => {
            doc.text(`Usuario: ${usuario} - Acciones: ${acciones.length}`, MARGIN_X, startY);
            startY += 8;
        });

        const date = new Date().toLocaleDateString();
        doc.text(`Reporte generado el: ${date}`, MARGIN_X, startY + 10);

        const formattedDate = new Date().toISOString().split("T")[0];
        doc.save(`Trazabilidad_Reporte_${formattedDate}.pdf`);
        toast.success("PDF generado exitosamente.");
    } catch (error) {
        console.error("Error al generar el PDF:", error);
        toast.error("Hubo un error al generar el PDF.");
    }
};

export default generatePDFTrazabilidad;