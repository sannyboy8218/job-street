import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative">
      <Search
        className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-slate-500"
        size={16}
      />

      <Input
        placeholder="Search jobs..."
        className="pl-9"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
