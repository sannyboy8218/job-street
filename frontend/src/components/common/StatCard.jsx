import { Card } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon,
  color = "text-blue-600",
}) {
  return (
    <Card className="rounded-2xl border shadow-sm hover:shadow-md transition-all">
      <div className="p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-slate-500">
              {title}
            </p>

            <h2 className="mt-3 text-4xl font-bold">
              {value}
            </h2>

          </div>

          <div
            className={`rounded-xl bg-slate-100 p-4 ${color}`}
          >
            {icon}
          </div>

        </div>

      </div>
    </Card>
  );
}