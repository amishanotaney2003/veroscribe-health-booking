import type { AppointmentSlot, Physician } from "../types/booking";

export const physicians: Physician[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    specialty: "Family Medicine",
  },
  {
    id: 2,
    name: "Dr. Michael Patel",
    specialty: "Dermatology",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",
  },
  {
    id: 4,
    name: "Dr. David Kim",
    specialty: "Cardiology",
  },
  {
    id: 5,
    name: "Dr. Olivia Thompson",
    specialty: "Neurology",
  },
  {
    id: 6,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
  },
];

export const appointmentSlots: AppointmentSlot[] = [
  // Dr. Sarah Chen
  {
    id: 1,
    physicianId: 1,
    time: "May 12, 2026 at 9:00 AM",
    available: true,
  },
  {
    id: 2,
    physicianId: 1,
    time: "May 12, 2026 at 10:30 AM",
    available: false,
  },
  {
    id: 3,
    physicianId: 1,
    time: "May 12, 2026 at 1:00 PM",
    available: true,
  },
  {
    id: 4,
    physicianId: 1,
    time: "May 13, 2026 at 11:00 AM",
    available: true,
  },

  // Dr. Michael Patel
  {
    id: 5,
    physicianId: 2,
    time: "May 12, 2026 at 2:00 PM",
    available: true,
  },
  {
    id: 6,
    physicianId: 2,
    time: "May 12, 2026 at 3:30 PM",
    available: false,
  },
  {
    id: 7,
    physicianId: 2,
    time: "May 13, 2026 at 9:30 AM",
    available: true,
  },
  {
    id: 8,
    physicianId: 2,
    time: "May 13, 2026 at 11:00 AM",
    available: true,
  },

  // Dr. Emily Rodriguez
  {
    id: 9,
    physicianId: 3,
    time: "May 14, 2026 at 8:30 AM",
    available: true,
  },
  {
    id: 10,
    physicianId: 3,
    time: "May 14, 2026 at 10:00 AM",
    available: true,
  },
  {
    id: 11,
    physicianId: 3,
    time: "May 14, 2026 at 1:30 PM",
    available: false,
  },

  // Dr. David Kim
  {
    id: 12,
    physicianId: 4,
    time: "May 15, 2026 at 9:00 AM",
    available: true,
  },
  {
    id: 13,
    physicianId: 4,
    time: "May 15, 2026 at 11:30 AM",
    available: true,
  },
  {
    id: 14,
    physicianId: 4,
    time: "May 15, 2026 at 2:00 PM",
    available: false,
  },

  // Dr. Olivia Thompson
  {
    id: 15,
    physicianId: 5,
    time: "May 16, 2026 at 10:00 AM",
    available: true,
  },
  {
    id: 16,
    physicianId: 5,
    time: "May 16, 2026 at 12:30 PM",
    available: true,
  },
  {
    id: 17,
    physicianId: 5,
    time: "May 16, 2026 at 3:00 PM",
    available: false,
  },

  // Dr. James Wilson
  {
    id: 18,
    physicianId: 6,
    time: "May 17, 2026 at 9:30 AM",
    available: true,
  },
  {
    id: 19,
    physicianId: 6,
    time: "May 17, 2026 at 11:00 AM",
    available: true,
  },
  {
    id: 20,
    physicianId: 6,
    time: "May 17, 2026 at 1:30 PM",
    available: true,
  },
];