import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: "http://127.0.0.1:5001/clone-bb5c7/us-central1/api",
    baseURL: "https://server-deploy-es7e.onrender.com",
});

export {axiosInstance}