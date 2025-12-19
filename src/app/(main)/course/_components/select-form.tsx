import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectForm({
  onValueChange,
  options,
  placeholder,
}: {
  onValueChange: (val: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <Select onValueChange={onValueChange}>
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
