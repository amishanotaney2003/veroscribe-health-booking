import type { Booking } from "../types/booking";

const BOOKINGS_STORAGE_KEY = "bookings";

export const getBookings = (): Booking[] => {
  try {
    const storedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    return storedBookings ? JSON.parse(storedBookings) : [];
  } catch (error) {
    console.error("Unable to read bookings from localStorage", error);
    return [];
  }
};

export const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
};
