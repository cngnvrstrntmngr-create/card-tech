"use client";
import { Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

export default function PrintButton({
  componentRef,
  className,
  disabled = false,
}: {
  componentRef?: React.RefObject<HTMLDivElement | null> | null;
  className?: string;
  disabled?: boolean;
}) {
  if (!componentRef) return null;
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
  @page {
    size: A4; 
    margin: 12mm;
  }`,
    onAfterPrint: () => toast.success("Печать завершена"),
    onPrintError: () => toast.error("Произошла ошибка при печати"),
  });

  return (
    <div className="flex w-full justify-end items-center">
      <button
        onClick={() => {
          if (!componentRef) return;
          handlePrint();
        }}
        type="button"
        disabled={disabled}
        className={cn(
          "print:hidden  cursor-pointer ",
          className,
          disabled && "opacity-50"
        )}
      >
        <Printer className="h-5 w-5 hover:text-bl" strokeWidth={1.5} />
      </button>
    </div>
  );
}
