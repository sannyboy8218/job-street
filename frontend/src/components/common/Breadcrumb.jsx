import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav className="mb-6 flex items-center text-sm text-gray-500 dark:text-slate-400">
      {items.map((item, index) => (
        <div
          key={item.label}
          className="flex items-center"
        >
          <span>{item.label}</span>

          {index < items.length - 1 && (
            <ChevronRight
              size={16}
              className="mx-2"
            />
          )}
        </div>
      ))}
    </nav>
  );
}