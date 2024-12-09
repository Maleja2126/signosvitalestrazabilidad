const db = require('../config/db'); //requiere la base de datos
const fs = require('fs');
const path = require('path');
const offlineDataPath = path.join(__dirname, 'offline_data.json'); // Archivo local para datos no subidos

// Crear un registro de signos vitales
exports.createPatientRecord = async (req, res) => {
    const {
        id_paciente, record_date, record_time, presion_sistolica, presion_diastolica, presion_media,
        pulso, temperatura, frecuencia_respiratoria, saturacion_oxigeno, peso_adulto, peso_pediatrico, talla, observaciones
    } = req.body;

    // Validaciones de datos
    if (talla > 250) {
        return res.status(400).json({ message: "La altura excede el valor máximo realista" });
    }
    if (pulso > 200 || pulso < 40) {
        return res.status(400).json({ message: "Valor de pulso fuera de rango" });
    }
    if (frecuencia_respiratoria > 70 || frecuencia_respiratoria < 10) {
        return res.status(400).json({ message: "Frecuencia respiratoria demasiado alta o baja" });
    }
    if (saturacion_oxigeno > 100 || saturacion_oxigeno < 50) {
        return res.status(400).json({ message: "La saturación de oxígeno no puede superar el 100% o ser menor de 50%" });
    }
    if (presion_sistolica > 190 || presion_sistolica < 50) {
        return res.status(400).json({ message: "La presión arterial sistólica es demasiado alta o baja" });
    }
    if (presion_diastolica > 130 || presion_diastolica < 40) {
        return res.status(400).json({ message: "La presión arterial diastólica es demasiado alta o baja" });
    }
    if (temperatura > 55 || temperatura < 15) {
        return res.status(400).json({ message: "La temperatura es demasiado alta o baja" });
    }

    try {
        // Insertar registro de signos vitales
        const [result] = await db.query(
            "INSERT INTO registros_paciente (id_paciente, record_date, record_time, presion_sistolica, presion_diastolica, presion_media, pulso, temperatura, frecuencia_respiratoria, saturacion_oxigeno, peso_adulto, peso_pediatrico, talla, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id_paciente, record_date, record_time, presion_sistolica, presion_diastolica, presion_media, pulso, temperatura, frecuencia_respiratoria, saturacion_oxigeno, peso_adulto, peso_pediatrico, talla, observaciones]
        );

        if (result.affectedRows > 0) {
            // Registrar trazabilidad
            await db.query(
                `INSERT INTO trazabilidad 
                (usuario_id, usuario_nombre, accion, entidad_id, datos_nuevos, fecha_hora, tipo_accion) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    req.user.id, // Usuario responsable
                    req.user.username, // Nombre del usuario
                    "Nuevo registro de Signos Vitales", // Acción
                    id_paciente, // ID del paciente
                    JSON.stringify(req.body), // Datos nuevos
                    new Date(), // Fecha y hora
                    "Signos Vitales" // Tipo de acción
                ]
            );
        }

        res.status(201).json({ message: "Registro del paciente creado exitosamente" });
    } catch (error) {
        console.error("Error al crear el registro del paciente:", error);
        res.status(500).json({ message: "Error al crear el registro del paciente", error: error.message });
    }
};

// Función para guardar los datos localmente en un archivo
function saveOfflineRecord(record) {
    let offlineData = [];
    if (fs.existsSync(offlineDataPath)) {
        const fileData = fs.readFileSync(offlineDataPath);
        offlineData = JSON.parse(fileData);
    }
    offlineData.push(record);
    fs.writeFileSync(offlineDataPath, JSON.stringify(offlineData, null, 2));
}

function syncOfflineData() {
    if (fs.existsSync(offlineDataPath)) {
        const offlineData = JSON.parse(fs.readFileSync(offlineDataPath));

        offlineData.forEach(async (record, index) => {
            try {
                await db.query(
                    "INSERT INTO registros_paciente (id_paciente, record_date, record_time, presion_sistolica, presion_diastolica, presion_media, pulso, temperatura, frecuencia_respiratoria, saturacion_oxigeno, peso_adulto, peso_pediatrico, talla, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    [
                        record.id_paciente, record.record_date, record.record_time, record.presion_sistolica, record.presion_diastolica,
                        record.presion_media, record.pulso, record.temperatura, record.frecuencia_respiratoria, record.saturacion_oxigeno,
                        record.peso_adulto, record.peso_pediatrico, record.talla, record.observaciones
                    ]
                );

                // Si se sube correctamente, remover el registro del archivo
                offlineData.splice(index, 1);
                fs.writeFileSync(offlineDataPath, JSON.stringify(offlineData, null, 2));

            } catch (error) {
                console.error("Error al sincronizar datos offline:", error);
            }
        });
    }
}

// Ejecutar la sincronización periódicamente (cada 5 minutos, por ejemplo)
setInterval(syncOfflineData, 5 * 60 * 1000);

// Funcion para obtener todos los registros de un paciente
exports.getPatientRecords = async (req, res) => {
    const { idPaciente } = req.params;

    try {
        // Obtener información del paciente
        const [patient] = await db.query("SELECT * FROM patients WHERE id = ?", [idPaciente]);

        // Obtener registros del paciente
        const [records] = await db.query("SELECT * FROM registros_paciente WHERE id_paciente = ?", [idPaciente]);

        res.json({ patient: patient[0], records });
    } catch (error) {
        console.error("Error al recuperar el registro del paciente:", error);
        res.status(500).json({ message: "Error al recuperar el registro del pacientes" });
    }
};

//Función para generar el Historial del paciente y obtener trazabilidad
exports.getPatientHistory = async (req, res) => {
    const { idPaciente } = req.params; // Asegúrate de que el idPaciente llega desde los parámetros de la URL
    try {
        const [rows] = await db.query(
            `SELECT * FROM historial_paciente WHERE id_paciente = ? ORDER BY created_at DESC`,
            [idPaciente]
        );
        console.log("ID del Paciente:", idPaciente);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No se encontraron registros para este paciente" });
        }

        res.json(rows); // Devuelve los registros encontrados
    } catch (error) {
        console.error("Error al obtener el historial del paciente:", error);
        res.status(500).json({ message: "Error al obtener el historial del paciente" });
    }
};

// Obtener un registro específico de signos vitales
exports.getPatientRecord = async (req, res) => {
    const { idRegistro } = req.params;

    if (!req.user || !req.user.username) {
        return res.status(401).json({ message: "Usuario no autenticado o no autorizado" });
    }

    try {
        const [record] = await db.query("SELECT * FROM registros_paciente WHERE id = ?", [idRegistro]);

        if (!record.length) {
            return res.status(404).json({ message: "Registro no encontrado." });
        }

        res.json(record[0]);
    } catch (error) {
        console.error("Error al obtener el registro:", error);
        res.status(500).json({ message: "Error al obtener el registro." });
    }
};

// Actualizar un registro de signos vitales
exports.updatePatientRecord = async (req, res) => {
    const { idRegistro } = req.params; // ID del registro a actualizar
    const updatedData = req.body; // Datos enviados desde el frontend

    // Validar si el usuario está autorizado
    const responsable_signos = req.user?.username; // Verifica si el usuario autenticado tiene un nombre
    if (!responsable_signos) {
        return res.status(401).json({ message: "Usuario no autorizado para realizar esta acción" });
    }

    // Agregar el responsable y formatear la fecha a los datos actualizados
    updatedData.responsable_signos = responsable_signos;
    if (updatedData.created_at) {
        updatedData.created_at = formatDateForMySQL(updatedData.created_at);
    }

    // Validaciones específicas
    const errors = [];
    if (updatedData.talla && updatedData.talla > 250) errors.push("La altura excede el valor máximo realista.");
    if (updatedData.pulso && (updatedData.pulso > 200 || updatedData.pulso < 40)) errors.push("Valor de pulso fuera de rango.");
    if (updatedData.frecuencia_respiratoria && (updatedData.frecuencia_respiratoria > 70 || updatedData.frecuencia_respiratoria < 10)) errors.push("Frecuencia respiratoria demasiado alta o baja.");
    if (updatedData.saturacion_oxigeno && (updatedData.saturacion_oxigeno > 100 || updatedData.saturacion_oxigeno < 50)) errors.push("La saturación de oxígeno no puede superar el 100% o ser menor de 50%.");
    if (updatedData.presion_sistolica && (updatedData.presion_sistolica > 190 || updatedData.presion_sistolica < 50)) errors.push("La presión arterial sistólica es demasiado alta o baja.");
    if (updatedData.presion_diastolica && (updatedData.presion_diastolica > 130 || updatedData.presion_diastolica < 40)) errors.push("La presión diastólica es demasiado alta o baja.");
    if (updatedData.temperatura && (updatedData.temperatura > 55 || updatedData.temperatura < 15)) errors.push("La temperatura es demasiado alta o baja.");

    if (errors.length > 0) {
        return res.status(400).json({ message: "Errores de validación", errors });
    }

    try {
        // Obtener los datos antiguos del registro
        const [oldRecord] = await db.query("SELECT * FROM registros_paciente WHERE id = ?", [idRegistro]);

        if (!oldRecord.length) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        const oldData = oldRecord[0];

        // Actualizar el registro en la base de datos
        const [result] = await db.query("UPDATE registros_paciente SET ? WHERE id = ?", [updatedData, idRegistro]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado para actualizar" });
        }

        // Comparar cambios para registrar trazabilidad
        const cambios = {};
        for (const key in updatedData) {
            if (updatedData[key] !== oldData[key]) {
                cambios[key] = {
                    anterior: oldData[key],
                    nuevo: updatedData[key]
                };
            }
        }

        // Registrar trazabilidad
        await db.query(
            `INSERT INTO trazabilidad 
            (usuario_id, usuario_nombre, accion, entidad_id, datos_antiguos, datos_nuevos, fecha_hora, tipo_accion) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.user.id, // ID del usuario responsable
                responsable_signos, // Nombre del usuario
                "Actualización de Signos Vitales", // Acción realizada
                oldData.id_paciente, // ID del paciente asociado al registro
                JSON.stringify(oldData), // Datos antiguos
                JSON.stringify(cambios), // Datos nuevos
                new Date(), // Fecha y hora de la acción
                "Signos Vitales" // Tipo de acción
            ]
        );

        // Registrar en el historial
        const historial = {
            id_paciente: oldData.id_paciente,  // ID del paciente del registro
            id_registro: idRegistro,           // El ID del registro actualizado
            record_date: updatedData.record_date ?? oldData.record_date,
            record_time: updatedData.record_time ?? oldData.record_time,
            presion_sistolica: updatedData.presion_sistolica ?? oldData.presion_sistolica,
            presion_diastolica: updatedData.presion_diastolica ?? oldData.presion_diastolica,
            presion_media: updatedData.presion_media ?? oldData.presion_media,
            pulso: updatedData.pulso ?? oldData.pulso,
            temperatura: updatedData.temperatura ?? oldData.temperatura,
            frecuencia_respiratoria: updatedData.frecuencia_respiratoria ?? oldData.frecuencia_respiratoria,
            saturacion_oxigeno: updatedData.saturacion_oxigeno ?? oldData.saturacion_oxigeno,
            peso_adulto: updatedData.peso_adulto ?? oldData.peso_adulto,
            peso_pediatrico: updatedData.peso_pediatrico ?? oldData.peso_pediatrico,
            talla: updatedData.talla ?? oldData.talla,
            observaciones: updatedData.observaciones ?? oldData.observaciones,
            responsable_signos: responsable_signos, // Responsable que hizo el cambio
        };

        await db.query("INSERT INTO historial_signos_pacientes SET ?", [historial]);

        res.json({ message: "Registro actualizado correctamente y registrado en el historial y trazabilidad." });
    } catch (error) {
        console.error("Error al actualizar el registro:", error.message);
        res.status(500).json({ message: "Error al actualizar el registro" });
    }
};

//formatear fechas
const formatDateForMySQL = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Mes (0-indexado)
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const mi = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`; // Formato MySQL DATETIME
};

// Obtener historial de signos vitales de un paciente
exports.getPatientHistoryRecords = async (req, res) => {
    const { idPaciente } = req.params; // ID del paciente desde los parámetros de la URL

    try {
        const [history] = await db.query(
            "SELECT * FROM historial_signos_pacientes WHERE id_paciente = ? ORDER BY id_registro ASC, record_date DESC, record_time DESC",
            [idPaciente]
        );

        if (!history.length) {
            return res.status(404).json({ message: "No se encontraron registros históricos." });
        }

        res.json(history);
    } catch (error) {
        console.error("Error al obtener el historial:", error);
        res.status(500).json({ message: "Error al obtener el historial." });
    }
};