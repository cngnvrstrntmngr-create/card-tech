"use client";
import { useEffect, useState, useTransition } from "react";

import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";
import SelectTabsByPatch from "./SelectTabsByPatch";
import SelectByCategory from "./SelectByCategory";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  navItems,

  resetButton = false,
  defaultPatch = "",
  classNamePatch,
}: {
  navItems: PageNavType[];

  resetButton?: boolean;
  defaultPatch?: string;
  classNamePatch?: string;
}) {
  const key = `patch-card`;
  const router = useRouter();

  const [category, setCategory] = useState("");

  const [patch, setPatch] = useState(defaultPatch);

  const [hydrated, setHydrated] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const saved = localStorage.getItem(key);
    if (saved) setPatch(saved);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(key, patch);

    const url =
      patch === "cards" ? `/${patch}?category=${category}` : `/${patch}`;

    startTransition(() => {
      router.push(url);
    });
  }, [patch, category, hydrated]);

  const resetParams = () => {
    setPatch("");
    setCategory("");
  };
  return (
    <div className="md:p-4  sticky top-0 z-9 flex justify-center md:justify-start  gap-6">
      {navItems.length > 0 && (
        <SelectTabsByPatch
          patch={patch}
          setPatch={setPatch}
          isPending={isPending}
          navItems={navItems}
          classNamePatch={classNamePatch}
        />
      )}

      {patch === "cards" && (
        <SelectByCategory
          category={category}
          setCategory={setCategory}
          isLoading={isPending}
        />
      )}

      {resetButton && (
        <button
          onClick={resetParams}
          className="hover:text-black text-bl hover:bg-transparent cursor-pointer md:w-24 md:order-3 order-0 px-2"
        >
          <RefreshCcw className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
