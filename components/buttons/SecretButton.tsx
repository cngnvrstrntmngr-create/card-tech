"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";

export default function SecretLoginButton() {
  async function login(secret: string) {
    await signIn("credentials", {
      secret,
      callbackUrl: "/cards",
    });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const secret = new FormData(e.currentTarget).get("secret") as string;
        login(secret);
      }}
      className="flex gap-2 justify-between "
    >
      <div className="flex flex-col gap-2  w-3xs">
        <input
          name="secret"
          type="password"
          placeholder="...секретное слово"
          className="bg-background px-4 py-2 rounded shadow hover:bg-blue-300 transition-colors cursor-pointer  font-bold"
        />
        <Button>Войти</Button>
      </div>
    </form>
  );
}
