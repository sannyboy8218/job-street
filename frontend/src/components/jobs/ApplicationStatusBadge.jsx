import { getApplicationStatusLabel } from "@/utils/application";

const STATUS_STYLES = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200",
  REVIEWED: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200",
  INTERVIEW: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-200",
  ACCEPTED: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-200",
  REJECTED: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-200",
};

export default function ApplicationStatusBadge({ status }) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        STATUS_STYLES[status] || "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
      }`}
    >
      {getApplicationStatusLabel(status)}
    </span>
  );
}
