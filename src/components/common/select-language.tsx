import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";

export const SelectLanguage = () => {
  return (
    <Select>
      <SelectTrigger className="w-[120px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Language</SelectLabel>
          <SelectItem value="English">English</SelectItem>
          <SelectItem value="bangla">Bangla</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
