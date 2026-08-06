import { Button } from "@/components/ui/button";

export default function PageHeader({
  title,
  description,
  action,
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {title}
        </h1>

        {description && (
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </div>

      {action && action}
    </div>
  );
}