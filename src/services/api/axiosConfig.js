import axios from 'axios';
import API_ENDPOINTS from './apiEndpoint';

const axiosInstance = axios.create({
  baseURL: API_ENDPOINTS.appointments.split('/appointments')[0], // Uses BASE_URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Automatically attach token if stored in localStorage/session
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or sessionStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Handle global errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log out users on 401, etc.
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized - redirect to login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
