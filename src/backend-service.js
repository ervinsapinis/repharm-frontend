import http from "./http";

const backendService = {
    getPatients: async (doctorId) => {
        const endpoint = doctorId ? `/Backend/patients/${doctorId}` : '/Backend/patients/';
        const response = await http.backendInstance.get(endpoint);
        return response.data;
    },

    getDoctors: async () => {
        const response = await http.backendInstance.get('/Backend/doctors');
        return response.data;
    },

    createPatient: async (patientData) => {
        const response = await http.backendInstance.post('/Backend/patient', patientData);
        return response.data;
    }
};

export default backendService;
