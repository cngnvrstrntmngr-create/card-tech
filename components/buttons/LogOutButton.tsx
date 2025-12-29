"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogOutButton() {
  return (
    <div className="flex justify-start items-center md:w-220 w-full px-6 py-4 sticky bottom-0">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="cursor-pointer"
      >
        <LogOut className="w-6 h-6 text-blue-700" />
      </button>
    </div>
  );
}
