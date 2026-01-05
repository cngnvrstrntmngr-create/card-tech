"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type State = {
  error?: string;
};

export async function secretLogin(
  _: State,
  formData: FormData
): Promise<State> {
  const secret = formData.get("secret");

  if (!secret || typeof secret !== "string") {
    return { error: "Введите секретное слово" };
  }

  if (secret !== process.env.SECRET_LOGIN_WORD) {
    return { error: "Неверное секретное слово" };
  }

  const cookieStore = await cookies();

  cookieStore.set("auth", "secret", {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
  });

  redirect("/");
}
