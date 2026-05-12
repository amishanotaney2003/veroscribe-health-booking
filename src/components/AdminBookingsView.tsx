import { useEffect, useState } from "react";
import { appointmentSlots, physicians } from "../data/mockData";
import type { Booking, BookingStatus } from "../types/booking";
import { getBookings, saveBookings } from "../utils/bookingStorage";
import StatusBadge from "./StatusBadge";

const AdminBookingsView = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | BookingStatus>("all");

  useEffect(() => {
    setBookings(getBookings());
  }, []);

  const updateStatus = (bookingId: number, status: BookingStatus) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status } : booking
    );

    setBookings(updatedBookings);
    saveBookings(updatedBookings);
  };

  const filteredBookings =
    statusFilter === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === statusFilter);

  const countByStatus = (status: BookingStatus) =>
    bookings.filter((booking) => booking.status === status).length;

  const getPhysician = (id: number) =>
    physicians.find((physician) => physician.id === id);

  const getSlot = (id: number) =>
    appointmentSlots.find((slot) => slot.id === id);

  return (
    <section>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
        Admin Dashboard
      </p>

      <h1 className="mb-4 text-4xl font-bold text-slate-900">
        Manage appointment requests
      </h1>

      <p className="mb-6 max-w-2xl text-slate-600">
        Review upcoming patient bookings, confirm requests, cancel appointments,
        and monitor booking status.
      </p>

      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <SummaryCard label="Total" value={bookings.length} />
        <SummaryCard label="Pending" value={countByStatus("pending")} />
        <SummaryCard label="Confirmed" value={countByStatus("confirmed")} />
        <SummaryCard label="Cancelled" value={countByStatus("cancelled")} />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "pending", "confirmed", "cancelled"] as const).map(
          (status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-full px-4 py-2 text-sm font-semibold capitalize ${
                statusFilter === status
                  ? "bg-blue-600 text-white"
                  : "border bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          )
        )}
      </div>

      {filteredBookings.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            No bookings to display
          </h2>
          <p className="mt-2 text-slate-600">
            New appointment requests will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredBookings.map((booking) => {
            const physician = getPhysician(booking.physicianId);
            const slot = getSlot(booking.slotId);
            const isCancelled = booking.status === "cancelled";

            return (
              <div
                key={booking.id}
                className="rounded-2xl border bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">
                      {booking.patientName}
                    </h2>
                    <p className="text-sm text-slate-600">{booking.email}</p>
                    <p className="text-sm text-slate-600">{booking.phone}</p>
                  </div>

                  <StatusBadge status={booking.status} />
                </div>

                <div className="mt-4 grid gap-2 text-sm text-slate-700">
                  <p>
                    <strong>Physician:</strong>{" "}
                    {physician?.name ?? "Unknown"}
                  </p>

                  <p>
                    <strong>Specialty:</strong>{" "}
                    {physician?.specialty ?? "Unknown"}
                  </p>

                  <p>
                    <strong>Time:</strong> {slot?.time ?? "Unknown time"}
                  </p>

                  <p>
                    <strong>Reason:</strong> {booking.reason}
                  </p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <StatusButton
                    label="Confirm"
                    disabled={
                      booking.status === "confirmed" || isCancelled
                    }
                    onClick={() => updateStatus(booking.id, "confirmed")}
                    className="bg-green-600 text-white hover:bg-green-700 disabled:bg-slate-300"
                  />

                  <StatusButton
                    label="Cancel"
                    disabled={isCancelled}
                    onClick={() => updateStatus(booking.id, "cancelled")}
                    className="bg-red-600 text-white hover:bg-red-700 disabled:bg-slate-300"
                  />

                  <StatusButton
                    label="Mark pending"
                    disabled={
                      booking.status === "pending" || isCancelled
                    }
                    onClick={() => updateStatus(booking.id, "pending")}
                    className="border text-slate-700 hover:bg-slate-50 disabled:text-slate-400"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

const SummaryCard = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
};

interface StatusButtonProps {
  label: string;
  disabled: boolean;
  onClick: () => void;
  className: string;
}

const StatusButton = ({
  label,
  disabled,
  onClick,
  className,
}: StatusButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-xl px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
};

export default AdminBookingsView;