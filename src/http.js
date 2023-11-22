import axios from "axios";

const backendInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'https://localhost:7145/api',
    headers: {
        "Content-Type": "application/json",
    },
});

backendInstance.interceptors.response.use(response => {
    const { data } = response;
    if (data && data.hasOwnProperty("data")) {
        response.data = data.data;
    }
    return response;
}, error => {
    return Promise.reject(error);
});

export default {
    backendInstance,
};
