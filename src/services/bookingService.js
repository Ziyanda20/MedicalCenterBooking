import axios from './axiosConfig';
import API_ENDPOINTS from './apiEndpoint';

// Get all appointments
export const getAppointments = async () => {
  const response = await axios.get(API_ENDPOINTS.appointments);
  return response.data;
};

// Create a new appointment
export const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_ENDPOINTS.appointments, appointmentData);
  return response.data;
};

// Delete appointment
export const deleteAppointment = async (id) => {
  await axios.delete(`${API_ENDPOINTS.appointments}/${id}`);
  return true;
};

// Update appointment
export const updateAppointment = async (id, updatedData) => {
  const response = await axios.put(`${API_ENDPOINTS.appointments}/${id}`, updatedData);
  return response.data;
};
