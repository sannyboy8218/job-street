import { Badge } from "@/components/ui/badge";

export default function JobStatusBadge({ status }) {
  const variants = {
    OPEN: "bg-green-100 text-green-700 border-green-300",
    CLOSED: "bg-red-100 text-red-700 border-red-300",
    DRAFT: "bg-yellow-100 text-yellow-700 border-yellow-300",
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