"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SaveExitButton({
  resetForm,
  disabled = false,
}: {
  resetForm?: () => void;
  disabled?: boolean;
}) {
  const router = useRouter();
  const exit = () => router.back();
  return (
    <div className={cn("flex gap-4 w-full justify-end mt-6")}>
      <Button
        type="button"
        variant="ghost"
        className={cn("w-24 cursor-pointer", disabled && "hidden")}
        onClick={() => resetForm && resetForm()}
      >
        очистить
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="w-24 cursor-pointer"
        onClick={exit}
      >
        выйти
      </Button>
      <Button
        type="submit"
        className={cn("w-24 cursor-pointer", disabled && "hidden")}
      >
        сохранить
      </Button>
    </div>
  );
}
