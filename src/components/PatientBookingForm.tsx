import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { appointmentSlots, physicians } from "../data/mockData";
import type { Booking } from "../types/booking";
import { getBookings, saveBookings } from "../utils/bookingStorage";

const PatientBookingForm = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => getBookings());
  const [selectedPhysician, setSelectedPhysician] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const bookedSlotIds = useMemo(
    () =>
      bookings
        .filter((booking) => booking.status !== "cancelled")
        .map((booking) => booking.slotId),
    [bookings]
  );

  const filteredSlots = appointmentSlots.filter(
    (slot) =>
      slot.physicianId === Number(selectedPhysician) &&
      slot.available &&
      !bookedSlotIds.includes(slot.id)
  );

  const hasSelectedPhysician = Boolean(selectedPhysician);
  const hasAvailableSlots = filteredSlots.length > 0;

  const validateForm = () => {
    if (!selectedPhysician) return "Please select a physician.";
    if (!selectedSlot) return "Please select an appointment time.";
    if (patientName.trim().length < 2) return "Please enter your full name.";
    if (!email.includes("@")) return "Please enter a valid email address.";
    if (phone.trim().length < 7) return "Please enter a valid phone number.";
    if (reason.trim().length < 10) {
      return "Please provide a short reason for your visit, at least 10 characters.";
    }

    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const latestBookings = getBookings();
    const slotAlreadyBooked = latestBookings.some(
      (booking) =>
        booking.slotId === Number(selectedSlot) && booking.status !== "cancelled"
    );

    if (slotAlreadyBooked) {
      setErrorMessage(
        "This appointment time was just booked. Please choose another time."
      );
      setBookings(latestBookings);
      setSelectedSlot("");
      return;
    }

    const newBooking: Booking = {
      id: Date.now(),
      patientName: patientName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      reason: reason.trim(),
      physicianId: Number(selectedPhysician),
      slotId: Number(selectedSlot),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const updatedBookings = [...latestBookings, newBooking];
    saveBookings(updatedBookings);
    setBookings(updatedBookings);

    setSuccessMessage(
      "Your appointment request has been submitted and is pending review."
    );
    setErrorMessage("");
    setPatientName("");
    setEmail("");
    setPhone("");
    setReason("");
    setSelectedPhysician("");
    setSelectedSlot("");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
          Patient Portal
        </p>

        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Request an appointment
        </h1>

        <p className="mb-6 max-w-2xl text-slate-600">
          Choose a physician, select an available time, and submit your visit
          details. Your request will be reviewed by the clinic team.
        </p>

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
            {successMessage}{" "}
            <Link to="/my-bookings" className="font-semibold underline">
              View your appointments
            </Link>
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border bg-white p-6 shadow-sm"
          noValidate
        >
          <div className="grid gap-4">
            <label className="grid gap-2">
              <span className="font-medium text-slate-700">Physician</span>
              <select
                value={selectedPhysician}
                onChange={(e) => {
                  setSelectedPhysician(e.target.value);
                  setSelectedSlot("");
                  setErrorMessage("");
                }}
                className="rounded-xl border border-slate-300 p-3"
              >
                <option value="">Select a physician</option>
                {physicians.map((physician) => (
                  <option key={physician.id} value={physician.id}>
                    {physician.name} ({physician.specialty})
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2">
              <span className="font-medium text-slate-700">
                Available appointment time
              </span>
              <select
                value={selectedSlot}
                onChange={(e) => {
                  setSelectedSlot(e.target.value);
                  setErrorMessage("");
                }}
                className="rounded-xl border border-slate-300 p-3 disabled:bg-slate-100 disabled:text-slate-500"
                disabled={!hasSelectedPhysician || !hasAvailableSlots}
              >
                <option value="">
                  {!hasSelectedPhysician
                    ? "Choose a physician first"
                    : hasAvailableSlots
                    ? "Select a time"
                    : "No available times for this physician"}
                </option>
                {filteredSlots.map((slot) => (
                  <option key={slot.id} value={slot.id}>
                    {slot.time}
                  </option>
                ))}
              </select>
              {hasSelectedPhysician && !hasAvailableSlots && (
                <p className="text-sm text-amber-700">
                  This physician has no open appointment times. Please choose a
                  different physician.
                </p>
              )}
            </label>

            <input
              type="text"
              placeholder="Full name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="rounded-xl border border-slate-300 p-3"
            />

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border border-slate-300 p-3"
            />

            <input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-xl border border-slate-300 p-3"
            />

            <textarea
              placeholder="Reason for visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-28 rounded-xl border border-slate-300 p-3"
            />

            <button
              type="submit"
              disabled={hasSelectedPhysician && !hasAvailableSlots}
              className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Submit appointment request
            </button>
          </div>
        </form>
      </section>

      <aside className="rounded-2xl border bg-blue-50 p-6">
        <h2 className="mb-3 text-xl font-bold text-slate-900">
          What happens next?
        </h2>

        <div className="space-y-4 text-sm text-slate-700">
          <p>
            <strong>1. Request submitted:</strong> Your appointment starts as
            pending.
          </p>
          <p>
            <strong>2. Admin review:</strong> The clinic team confirms or
            cancels the request.
          </p>
          <p>
            <strong>3. Track status:</strong> You can check your appointment
            status from My Appointments.
          </p>
        </div>
      </aside>
    </div>
  );
};

export default PatientBookingForm;
