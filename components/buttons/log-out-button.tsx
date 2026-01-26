"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

export default function LogOutButton() {
  return (
    <Button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="cursor-pointer my-4"
    >
      exit
    </Button>
  );
}
