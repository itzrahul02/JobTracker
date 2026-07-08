import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://job-tracker-backend-chi.vercel.app/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')??1;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;