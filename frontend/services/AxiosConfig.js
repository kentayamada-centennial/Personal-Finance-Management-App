import axios from 'axios';

const BASE_URL = 'https://localhost:7146/api/';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export default axiosInstance;