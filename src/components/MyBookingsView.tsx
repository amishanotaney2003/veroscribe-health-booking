import { useEffect, useState } from "react";
import { appointmentSlots, physicians } from "../data/mockData";
import type { Booking } from "../types/booking";
import { getBookings, saveBookings } from "../utils/bookingStorage";
import StatusBadge from "./StatusBadge";

const MyBookingsView = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [emailSearch, setEmailSearch] = useState("");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const normalizedSearch = emailSearch.trim().toLowerCase();

  const filteredBookings = (
    normalizedSearch
      ? bookings.filter((booking) =>
          booking.email.toLowerCase().includes(normalizedSearch)
        )
      : bookings
  ).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const cancelBooking = (bookingId: number) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId
        ? { ...booking, status: "cancelled" as const }
        : booking
    );

    setBookings(updatedBookings);
    saveBookings(updatedBookings);
  };

  const getPhysician = (id: number) =>
    physicians.find((physician) => physician.id === id);

  const getSlot = (id: number) =>
    appointmentSlots.find((slot) => slot.id === id);

  return (
    <section>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
        My Appointments
      </p>

      <h1 className="mb-4 text-4xl font-bold text-slate-900">
        Track your appointment requests
      </h1>

      <p className="mb-6 max-w-2xl text-slate-600">
        Enter your email to find your appointment requests and check whether
        they are pending, confirmed, or cancelled.
      </p>

      <input
        type="email"
        placeholder="Search by email address"
        value={emailSearch}
        onChange={(e) => setEmailSearch(e.target.value)}
        className="mb-6 w-full max-w-lg rounded-xl border border-slate-300 bg-white p-3"
      />

      {filteredBookings.length === 0 ? (
      <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          No appointments found
        </h2>
        <p className="mt-2 text-slate-600">
          Try searching with the full email used during booking.
        </p>
      </div>
    ) : (
      <div className="grid gap-4">
        {filteredBookings.map((booking) => {
          const physician = getPhysician(booking.physicianId);
          const slot = getSlot(booking.slotId);

          return (
            <div
              key={booking.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {physician?.name ?? "Unknown physician"}
                  </h2>
                  <p className="text-slate-600">
                    {physician?.specialty ?? "Unknown specialty"}
                  </p>
                </div>

                <StatusBadge status={booking.status} />
              </div>

              <div className="mt-4 grid gap-2 text-sm text-slate-700">
                <p>
                  <strong>Patient:</strong> {booking.patientName}
                </p>
                <p>
                  <strong>Time:</strong> {slot?.time ?? "Unknown time"}
                </p>
                <p>
                  <strong>Reason:</strong> {booking.reason}
                </p>
              </div>

              {booking.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="mt-4 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                >
                  Cancel appointment
                </button>
              )}
            </div>
          );
        })}
      </div>
    )}
    </section>
  );
};

export default MyBookingsView;
