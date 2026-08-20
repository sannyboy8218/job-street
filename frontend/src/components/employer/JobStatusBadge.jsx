import { Badge } from "@/components/ui/badge";

export default function JobStatusBadge({ status }) {
  const variants = {
    OPEN: "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/50 dark:text-green-200 dark:border-green-800",
    CLOSED: "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/50 dark:text-red-200 dark:border-red-800",
    DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/50 dark:text-yellow-200 dark:border-yellow-800",
  };

  return (
    <Badge
      variant="outline"
      className={variants[status] || ""}
    >
      {status}
    </Badge>
  );
}