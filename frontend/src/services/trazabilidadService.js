import axios from 'axios';

const API_URL = 'http://localhost:5000/api/traceability';

// Función para obtener todos los logs de trazabilidad
export const getAllTrazabilidad = async () => {
  try {
    const response = await axios.get(API_URL);  // Usando axios para la solicitud GET
    console.log('Datos obtenidos de la API:', response.data);  // Muestra toda la respuesta de la API

    // Verifica si los datos son válidos
    if (Array.isArray(response.data.records) && response.data.records.length > 0) {
      return response.data.records;
    } else {
      console.warn('La respuesta de la API no contiene registros válidos');
      return [];
    }
  } catch (error) {
    console.error('Error al obtener trazabilidad:', error);
    return [];  // Devuelve un array vacío en caso de error
  }
};

// Función para obtener trazabilidad por ID de paciente
export const getTrazabilidadById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);  // Usamos axios aquí también
    console.log('Datos de trazabilidad:', response.data);  // Asegúrate de ver qué datos devuelve
    return response.data;
  } catch (error) {
    console.error("Error al obtener la trazabilidad:", error);
    throw error;  // Lanza el error para que pueda ser manejado en el componente
  }
};

// Función para obtener trazabilidad específica de un paciente
export const getTrazabilidadByPatientId = async (patientId) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/patients/${patientId}/traceability`);
    console.log(`Trazabilidad del paciente ${patientId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener trazabilidad del paciente ${patientId}:`, error);
    throw error; // Lanza el error para manejarlo en el componente
  }
};