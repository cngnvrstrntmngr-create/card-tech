import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectInput({
  options,
  fieldName,
  fieldLabel,
  placeholder,
  disabled = false,
  description,
  clasNameSelect,
}: {
  options: { value: string; label: string }[];
  fieldName: string;
  fieldLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  clasNameSelect?: string;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem className="grid-cols-1 gap-4">
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl className={cn(clasNameSelect, "w-full")}>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
