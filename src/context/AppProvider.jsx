import { BookingProvider } from './BookingContext';

export function AppProviders({ children }) {
  return (
    <BookingProvider>
      {children}
    </BookingProvider>
  );
}
