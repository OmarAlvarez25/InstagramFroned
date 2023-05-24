// Axios
import axios from 'axios';

const projectApi = axios.create({
  baseURL: 'https://backendfinal-production-250e.up.railway.app/api',
});

projectApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default projectApi;
