"use client";
import { useState, useTransition } from "react";
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
  navItems,
  defaultPatch = "cards",
  classNamePatch,
}: {
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
        ? category && category !== "all"
          ? `/${newPatch}?category=${category}`
          : `/${newPatch}`
        : categoryProduct && categoryProduct !== "all"
          ? `/${newPatch}?categoryProduct=${categoryProduct}`
          : `/${newPatch}`;

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
    <div className="px-2  pb-2   bg-background  sticky bottom-0 z-12 flex justify-between  md:gap-8">
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="cursor-pointer w-10 px-2 bg-black border-0 rounded-md h-8 md:h-9 flex items-center justify-center"
      >
        <LogOut className="w-4 h-4 text-white" />
      </button>
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
      {isAdmin && (
        <button
          onClick={addNew}
          className="cursor-pointer w-10 px-2 bg-blue-500 border-0 rounded-md h-8 md:h-9 flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      )}
    </div>
  );
}
