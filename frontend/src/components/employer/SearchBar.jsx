import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchBar({
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <Search
        className="absolute left-3 top-3 text-gray-400"
        size={18}
      />

      <Input
        placeholder="Search jobs..."
        className="pl-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
}