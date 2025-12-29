"use client";
import { useState, useTransition } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import SelectTabsByPatch from "./SelectTabsByPatch";
import SelectByCategory, { CATEGORY } from "./SelectByCategory";
import { CATEGORY_PRODUCT } from "@/features/product/constants";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader({
  navItems,
  defaultPatch = "cards",
  classNamePatch,
}: {
  navItems: PageNavType[];
  defaultPatch?: string;
  classNamePatch?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialPatch = pathname?.split("/")[1] || defaultPatch;
  const initialCategory = searchParams.get("category") || "";
  const initialCategoryProduct = searchParams.get("categoryProduct") || "";

  const [patch, setPatch] = useState(initialPatch);
  const [category, setCategory] = useState(initialCategory);
  const [categoryProduct, setCategoryProduct] = useState(
    initialCategoryProduct
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
    <div className="px-4 md:px-6 pb-6 sticky top-2 z-10 flex justify-between w-full">
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
      <div className="flex items-center">
        <button
          onClick={addNew}
          className="cursor-pointer md:w-12 w-8 px-2 bg-blue-500 border-0 rounded-md h-7 flex items-center justify-center"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
