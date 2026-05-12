import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import AdminBookingsView from "./components/AdminBookingsView";
import MyBookingsView from "./components/MyBookingsView";
import PatientBookingForm from "./components/PatientBookingForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <nav className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <Link to="/" className="text-xl font-bold text-slate-900">
              VeroScribe Health
            </Link>

            <div className="flex flex-wrap gap-3 text-sm font-medium">
              <NavItem to="/">Book Appointment</NavItem>
              <NavItem to="/my-bookings">My Appointments</NavItem>
              <NavItem to="/admin">Admin Dashboard</NavItem>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<PatientBookingForm />} />
            <Route path="/my-bookings" element={<MyBookingsView />} />
            <Route path="/admin" element={<AdminBookingsView />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

const NavItem = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-full px-4 py-2 ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default App;