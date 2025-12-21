import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { boolean } from "zod";

export function SelectForm({
  onValueChange,
  options,
  placeholder,
  disabled,
}: {
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <Select onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="capitalize" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[180px]">
        <SelectGroup>
          <SelectLabel>Please pick one</SelectLabel>
          {options.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
