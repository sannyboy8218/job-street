import { Card } from "@/components/ui/card";

export default function JobSummary({
  total,
}) {
  return (
    <Card className="p-5">

      <h3 className="text-sm text-gray-500">
        Total Jobs
      </h3>

      <h2 className="text-3xl font-bold mt-2">
        {total}
      </h2>

    </Card>
  );
}