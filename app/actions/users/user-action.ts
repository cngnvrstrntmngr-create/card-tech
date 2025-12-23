"use server";

import { dbAdmin } from "@/lib/firebase-admin";
import { unstable_cache } from "next/cache";

type UserData = {
  id: string;
  mail: string;
  role: string;
};

// get

export const _getUsers = async () => {
  const snapshot = await dbAdmin.collection("users").get();
  return snapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as UserData[];
};

export const getUsers = unstable_cache(_getUsers, ["users"], {
  revalidate: false,
  tags: ["users"],
});
