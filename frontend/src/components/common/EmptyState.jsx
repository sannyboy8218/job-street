import { FileText } from "lucide-react";

export default function EmptyState({
  title,
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <FileText
        className="text-gray-400 dark:text-slate-500"
        size={60}
      />

      <h2 className="mt-6 text-xl font-semibold">
        {title}
      </h2>

      <p className="mt-2 text-gray-500 dark:text-slate-400">
        {description}
      </p>

      <div className="mt-6">
        {action}
      </div>
    </div>
  );
}