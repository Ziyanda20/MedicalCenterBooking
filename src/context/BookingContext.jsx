import React, { createContext, useEffect, useState } from 'react';
import BookingService from '../services/bookingService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        const data = await BookingService.getAppointments();
        setAppointments(data);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
        setError('Failed to load appointments.');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const addAppointment = async (appointmentData) => {
    try {
      const newAppointment = await BookingService.createAppointment(appointmentData);
      setAppointments((prev) => [...prev, newAppointment]);
    } catch (err) {
      console.error('Failed to add appointment:', err);
      setError('Failed to add appointment.');
    }
  };

  const removeAppointment = async (id) => {
    try {
      await BookingService.deleteAppointment(id);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error('Failed to delete appointment:', err);
      setError('Failed to delete appointment.');
    }
  };

  const editAppointment = async (id, updatedData) => {
    try {
      const updated = await BookingService.updateAppointment(id, updatedData);
      setAppointments((prev) =>
        prev.map((appt) => (appt.id === id ? updated : appt))
      );
    } catch (err) {
      console.error('Failed to update appointment:', err);
      setError('Failed to update appointment.');
    }
  };

  return (
    <BookingContext.Provider
      value={{
        appointments,
        addAppointment,
        removeAppointment,
        editAppointment,
        user,
        setUser,
        loading,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
