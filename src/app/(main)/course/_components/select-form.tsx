import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contentTypeList, difficutlyPreferencesList } from "../_constants";

export function SelectForm({
  onValueChange,
  name,
}: {
  onValueChange: (val: string) => void;
  name: string;
}) {
  const itemList =
    name === "content_type" ? contentTypeList : difficutlyPreferencesList;
  const placeHolder =
    name === "content_type"
      ? "Select content type"
      : "Select your difficulty preference";
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue className="capitalize" placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose one</SelectLabel>
          {itemList.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
