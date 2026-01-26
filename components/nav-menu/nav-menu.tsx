"use client";
import React, { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { LogOut, Plus } from "lucide-react";
import SelectTabsByPatch from "./select-patch";
import SelectByCategory, { CATEGORY } from "./select-category";
import { CATEGORY_PRODUCT } from "@/features/product/constants";
import { signOut, useSession } from "next-auth/react";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  children,
  navItems,
  defaultPatch = "cards",
  classNamePatch,
}: {
  children: React.ReactNode;
  navItems: PageNavType[];
  defaultPatch?: string;
  classNamePatch?: string;
}) {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPatch = pathname?.split("/")[1] || defaultPatch;
  const initialCategory = searchParams.get("category") || "all";
  const initialCategoryProduct = searchParams.get("categoryProduct") || "all";

  const [patch, setPatch] = useState(initialPatch);
  const [category, setCategory] = useState(initialCategory);
  const [categoryProduct, setCategoryProduct] = useState(
    initialCategoryProduct,
  );
  const [isPending, startTransition] = useTransition();

  const handlePatchChange = (newPatch: string) => {
    setPatch(newPatch);

    const url =
      newPatch === "cards"
        ? `/${newPatch}?category=${category}`
        : `/${newPatch}?categoryProduct=${categoryProduct}`;

    startTransition(() => router.push(url));
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const url = `/cards?category=${newCategory}`;
    startTransition(() => router.push(url));
  };

  const handleCategoryProductChange = (newCategory: string) => {
    setCategoryProduct(newCategory);
    const url = `/products?categoryProduct=${newCategory}`;
    startTransition(() => router.push(url));
  };

  const addNew = () => {
    const url = patch === "cards" ? `/card` : `/product`;
    router.push(url);
  };

  return (
    <div className="flex flex-col  items-center h-screen">
      <div className="p-2 md:px-6  sticky top-1 z-10 flex justify-end gap-6 w-full">
        <div className="flex justify-center items-center">
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-black p-1 rounded-md h-6 w-12"
          >
            <LogOut className="w-4 h-4 text-white font-bold" />
          </button>
        </div>

        {isAdmin && (
          <div className="flex items-center">
            <button
              onClick={addNew}
              className="cursor-pointer w-12 px-2 bg-blue-500 border-0 rounded-md h-6 flex items-center justify-center"
            >
              <Plus className="w-5 h-5 text-white" />
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
      <div className="px-2 md:px-6 pb-2 mt-2  sticky bottom-1 z-10 flex justify-between md:justify-start md:gap-6 w-full">
        {navItems.length > 0 && (
          <SelectTabsByPatch
            patch={patch}
            setPatch={handlePatchChange}
            isPending={isPending}
            navItems={navItems}
            classNamePatch={classNamePatch}
          />
        )}

        {patch === "cards" && (
          <SelectByCategory
            options={[{ value: "all", label: "все" }, ...CATEGORY]}
            category={category}
            setCategory={handleCategoryChange}
            isLoading={isPending}
          />
        )}

        {patch === "products" && (
          <SelectByCategory
            options={[{ value: "all", label: "все" }, ...CATEGORY_PRODUCT]}
            category={categoryProduct}
            setCategory={handleCategoryProductChange}
            isLoading={isPending}
          />
        )}
      </div>
    </div>
  );
}
