import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'https://json-server-cd49.onrender.com'
})

export default apiRequest;