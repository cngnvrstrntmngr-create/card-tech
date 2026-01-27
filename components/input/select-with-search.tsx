"use client";

import { useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Props = {
  fieldName: string;
  placeholder?: string;
  options: { value: string; label: string }[];
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

function SelectFieldWithSearch({
  fieldName,
  placeholder,
  options,
  disabled,
  className,
  onValueChange,
}: Props) {
  const { control } = useFormContext();
  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    return options.filter((item) =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, options]);

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        return (
          <FormItem>
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "w-full border rounded-md px-2 flex justify-between items-center h-7",
                      className,
                    )}
                    disabled={disabled}
                  >
                    {options.find((o) => o.value === field.value)?.label ||
                      placeholder}
                  </button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput
                      placeholder="Search..."
                      className="h-7"
                      value={search}
                      onValueChange={(val) => setSearch(val)}
                      disabled={disabled}
                    />
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup>
                        {filteredOptions.map((item) => (
                          <CommandItem
                            key={item.value}
                            value={item.label}
                            onSelect={() => {
                              field.onChange(item.value);
                              onValueChange?.(item.value);
                              setSearch("");
                              setOpen(false);
                            }}
                          >
                            {item.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default SelectFieldWithSearch;
