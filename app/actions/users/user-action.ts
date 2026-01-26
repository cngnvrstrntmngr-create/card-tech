"use server";

import { dbBar } from "@/lib/firebase-admin";
import { redis } from "@/lib/redis";

const db = dbBar;

export type UserData = {
  id: string;
  mail: string;
  role: string;
};

const USERS_KEY = "users";

export async function getUsers(): Promise<UserData[]> {
  const cached = await redis.get<UserData[]>(USERS_KEY);
  if (cached) return cached;

  const snapshot = await dbBar.collection("users").get();
  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserData[];

  await redis.set(USERS_KEY, users);

  return users;
}
