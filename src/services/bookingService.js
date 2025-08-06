import axios from './axiosConfig';
import API_ENDPOINTS from './apiEndpoint';

const getAppointments = async () => {
  const response = await axios.get(API_ENDPOINTS.appointments);
  return response.data;
};

const createAppointment = async (appointmentData) => {
  const response = await axios.post(API_ENDPOINTS.appointments, appointmentData);
  return response.data;
};

const deleteAppointment = async (id) => {
  await axios.delete(`${API_ENDPOINTS.appointments}/${id}`);
  return true;
};

const updateAppointment = async (id, updatedData) => {
  const response = await axios.put(`${API_ENDPOINTS.appointments}/${id}`, updatedData);
  return response.data;
};

const BookingService = {
  getAppointments,
  createAppointment,
  deleteAppointment,
  updateAppointment,
};

export default BookingService;
