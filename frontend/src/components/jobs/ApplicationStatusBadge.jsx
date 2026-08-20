import { getApplicationStatusLabel } from "@/utils/application";

const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-800",
  REVIEWED: "bg-blue-100 text-blue-800",
  INTERVIEW: "bg-purple-100 text-purple-800",
  ACCEPTED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

export default function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        STATUS_STYLES[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {getApplicationStatusLabel(status)}
    </span>
  );
}
