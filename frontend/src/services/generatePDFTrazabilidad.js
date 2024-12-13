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
const renderStyledTable = (doc, startY, data, title, header, marginX) => {
    if (!data || Object.keys(data).length === 0) {
        doc.setFont("helvetica", "italic");
        doc.text("No hay datos disponibles.", marginX, startY);
        return startY + 10;
    }

    const tableData = Object.entries(data)
        .filter(([key]) => !shouldExclude(key, data))
        .map(([key, value]) => {
            if (key === "created_at" && typeof value === "object") {
                // Mostrar solo "nuevo"
                return [mapFieldName(key), formatDateOnly(value.nuevo)];
            }
            if (typeof value === "object" && value !== null && value.nuevo) {
                // Mostrar solo "nuevo" para otros valores
                return [mapFieldName(key), value.nuevo || "Sin información"];
            }
            if (key.includes("fecha") || (typeof value === "string" && value.includes("T"))) {
                return [mapFieldName(key), formatDateOnly(value)];
            }
            return [mapFieldName(key), value || "Sin información"];
        });

    autoTable(doc, {
        startY,
        head: [[title, header]],
        body: tableData,
        theme: "grid", // Cambiar a grid para un diseño más limpio
        styles: { fontSize: 10, cellPadding: 3, halign: "center" }, // Tipografía uniforme, texto centrado
        headStyles: {
            fillColor: [41, 128, 185], // Color azul para el encabezado
            textColor: 255, // Texto blanco
            fontSize: 12, // Tamaño de fuente del encabezado
            fontStyle: "bold", // Fuente en negrita para encabezados
            halign: "center" // Centrar texto en el encabezado
        },
        alternateRowStyles: { fillColor: [245, 245, 245] }, // Alternar colores de fila
    });

    return doc.lastAutoTable.finalY + 10;
};

const generatePDFTrazabilidad = async (usuarioInfo, trazabilidadData) => {
    console.log("Generando PDF de trazabilidad de usuarios final");
    try {
        const doc = new jsPDF();
        const MARGIN_X = 20;
        const pageWidth = doc.internal.pageSize.width; // Ancho de la página
        const pageHeight = doc.internal.pageSize.height; // Alto de la página
        let startY = 20;
        let currentPage = 1; // Contador de páginas

        // Calcular el rango de fechas dinámicamente
        const calcularRangoFechas = (acciones) => {
            const fechas = acciones.map((accion) => new Date(accion.fecha_hora));
            const fechaInicio = new Date(Math.min(...fechas));
            const fechaFin = new Date(Math.max(...fechas));
            return `${fechaInicio.toLocaleDateString()} - ${fechaFin.toLocaleDateString()}`;
        };

        // Función para dibujar el encabezado general del reporte
        const drawReportHeader = () => {
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);
            doc.setTextColor(41, 76, 119); // Azul oscuro
            doc.text("Reporte de Trazabilidad", pageWidth / 2, startY, { align: "center" });
            startY += 15; // Espaciado después del título
        };

        // Función para dibujar el encabezado del usuario
        const drawUserHeader = (usuario, rangoFechas) => {
            doc.setFillColor(41, 76, 119); // Color azul oscuro
            doc.rect(0, startY, pageWidth, 20, "F"); // Barra superior

            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.setTextColor(255, 255, 255); // Texto blanco
            doc.text(`Usuario: ${usuario}`, MARGIN_X, startY + 10);
            doc.text(`Rango de fechas: ${rangoFechas}`, MARGIN_X, startY + 16);

            startY += 30; // Espaciado después del encabezado
        };

        // Función para dibujar el pie de página
        const drawFooter = () => {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150); // Gris claro
            doc.text(`${currentPage}`, pageWidth - 20, pageHeight - 10); // Solo el número de página
        };

        // Dibujar encabezado general del reporte
        drawReportHeader();
        drawFooter(doc, currentPage); // Numerar la primera página

        // Agrupar datos por usuario
        const groupedData = trazabilidadData.reduce((acc, item) => {
            const userName = item.usuario_nombre || "Usuario desconocido";
            if (!acc[userName]) acc[userName] = [];
            acc[userName].push(item);
            return acc;
        }, {});

        let firstPage = true; // Controlar si es la primera página

        // Iterar por cada usuario y sus acciones
        for (const [usuario, acciones] of Object.entries(groupedData)) {
            const rangoFechas = calcularRangoFechas(acciones); // Calcular rango de fechas dinámicamente

            if (firstPage) {
                drawUserHeader(usuario, rangoFechas);
                firstPage = false;
            } else {
                doc.addPage();
                currentPage++;
                drawFooter(doc, currentPage); // Pie de página en cada nueva página
                startY = 20;
                drawReportHeader();
                drawUserHeader(usuario, rangoFechas);
            }

            // Procesar acciones
            acciones.forEach((accion, index) => {
                if (index > 0) {
                    doc.addPage();
                    currentPage++;
                    drawFooter(doc, currentPage); // Pie de página antes de avanzar
                    startY = 20;
                }

                // Título de la acción
                doc.setFont("helvetica", "bold");
                doc.setFontSize(14);
                doc.setTextColor(41, 76, 119); // Azul oscuro
                doc.text(`Acción: ${accion.accion || "Sin acción"}`, MARGIN_X, startY);
                startY += 8;

                // Detalles de la acción
                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0); // Negro
                doc.text(`Fecha y Hora: ${formatDate(accion.fecha_hora)}`, MARGIN_X, startY);
                startY += 6;

                if (accion.responsable) {
                    doc.text(`Responsable: ${accion.responsable}`, MARGIN_X, startY);
                    startY += 6;
                }

                startY += 10;

                // Mostrar datos nuevos y antiguos
                const datosNuevos = typeof accion.datos_nuevos === "string" ? JSON.parse(accion.datos_nuevos || "{}") : accion.datos_nuevos;
                const datosAntiguos = typeof accion.datos_antiguos === "string" ? JSON.parse(accion.datos_antiguos || "{}") : accion.datos_antiguos;

                if (datosNuevos && Object.keys(datosNuevos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosNuevos, "Datos Nuevos", "Valores Nuevos", MARGIN_X);
                }

                if (datosAntiguos && Object.keys(datosAntiguos).length > 0) {
                    startY = renderStyledTable(doc, startY, datosAntiguos, "Datos Anteriores", "Valores Anteriores", MARGIN_X);
                }
            });
        }

        // Página final con información general
        doc.addPage();
        currentPage++;
        drawFooter(doc, currentPage); // Pie de página en la última página
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