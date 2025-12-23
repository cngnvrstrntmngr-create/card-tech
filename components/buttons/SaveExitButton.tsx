"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SaveExitButton() {
  const router = useRouter();
  const exit = () => router.back();
  return (
    <div className={cn("flex gap-4 w-full justify-end")}>
      <Button
        type="button"
        variant="destructive"
        className="w-20 cursor-pointer"
        onClick={exit}
      >
        exit
      </Button>
      <Button type="submit" className="w-20 cursor-pointer">
        save
      </Button>
    </div>
  );
}
