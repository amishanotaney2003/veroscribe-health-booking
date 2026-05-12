export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface Physician {
  id: number;
  name: string;
  specialty: string;
}

export interface AppointmentSlot {
  id: number;
  physicianId: number;
  time: string;
  available: boolean;
}

export interface Booking {
  id: number;
  patientName: string;
  email: string;
  phone: string;
  reason: string;
  physicianId: number;
  slotId: number;
  status: BookingStatus;
  createdAt: string;
}