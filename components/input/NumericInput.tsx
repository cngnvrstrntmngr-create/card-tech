"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type NumericInputProps = {
  fieldLabel?: string;
  fieldName: string;
  id?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  onValueChange?: (value: string) => void;
};

function NumericInput({
  fieldLabel,
  fieldName,
  id,
  placeholder,
  disabled,
  className,
  onValueChange,
}: NumericInputProps) {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => {
        const value = field.value ?? "";

        const updateValue = (next: string) => {
          field.onChange(next);
          onValueChange?.(next);
        };

        return (
          <FormItem
            className={cn(
              fieldLabel ? "grid-cols-2 gap-2" : "grid-cols-1 gap-4"
            )}
          >
            {fieldLabel && (
              <FormLabel className="border-b">{fieldLabel}</FormLabel>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Input
                    id={id}
                    value={value}
                    placeholder={placeholder}
                    disabled={disabled}
                    onClick={() => setOpen(true)}
                    className={cn(
                      "cursor-pointer text-center",
                      fieldLabel && "w-12 h-full",
                      className
                    )}
                    onChange={(e) => updateValue(e.target.value)}
                  />
                </FormControl>
              </PopoverTrigger>

              <PopoverContent className="w-50 p-2 grid grid-cols-3 gap-2 border-none">
                {Array.from({ length: 9 }, (_, i) => i + 1).map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    className="h-10 text-xl bg-background"
                    onClick={() => updateValue(value + num)}
                  >
                    {num}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  className="h-10 text-xl bg-background"
                  onClick={() => {
                    if (!value.includes("-")) {
                      updateValue("-" + value);
                    }
                  }}
                >
                  -
                </Button>

                <Button
                  variant="outline"
                  className="h-10 text-xl bg-background"
                  onClick={() => updateValue(value + "0")}
                >
                  0
                </Button>

                <Button
                  variant="outline"
                  className="h-10 text-xl bg-background"
                  onClick={() => {
                    if (!value.includes(".")) {
                      updateValue(value + ".");
                    }
                  }}
                >
                  .
                </Button>

                <Button
                  variant="outline"
                  className="h-10 text-xl bg-background"
                  onClick={() => updateValue(value.slice(0, -1))}
                >
                  x
                </Button>

                <Button
                  variant="outline"
                  className="h-10 text-xl col-span-2 bg-background"
                  onClick={() => setOpen(false)}
                >
                  ok
                </Button>
              </PopoverContent>
            </Popover>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default NumericInput;
