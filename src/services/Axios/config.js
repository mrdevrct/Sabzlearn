import axios from "axios";

const apiRequest = axios.create({
    baseURL: 'https://json-server-hk7g.onrender.com'
})

export default apiRequest;
