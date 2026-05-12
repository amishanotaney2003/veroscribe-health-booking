import type { BookingStatus } from "../types/booking";

interface StatusBadgeProps {
  status: BookingStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    confirmed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${styles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;