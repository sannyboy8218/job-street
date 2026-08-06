import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatusFilter({
  value,
  onChange,
}) {
  return (
    <Select
      value={value}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>

        <SelectItem value="ALL">
          All Jobs
        </SelectItem>

        <SelectItem value="OPEN">
          Open
        </SelectItem>

        <SelectItem value="CLOSED">
          Closed
        </SelectItem>

        <SelectItem value="DRAFT">
          Draft
        </SelectItem>

      </SelectContent>

    </Select>
  );
}