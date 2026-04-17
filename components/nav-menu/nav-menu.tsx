"use client";
import { Activity, useEffect, useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { CATEGORY_PRODUCT } from "@/features/product/constants";
import { useSession } from "next-auth/react";
import { useHashParam } from "@/hooks/use-hash";
import { NAV_BY_PATCH, NAV_BY_PATCH_TYPE } from "./constants";
import TabsOptions from "../tabs/tabs-options";

import SelectOptions from "../select/select-options";
import LogOutButton from "../buttons/logout-button";
import { CATEGORY } from "@/features/card/constants";

export type PageNavType = {
  title: string;
  href: string;
};

export default function NavMenuHeader() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN";

  const pathname = usePathname();
  const patch = pathname.split("/")[1] as keyof typeof NAV_BY_PATCH;
  const STORAGE_KEY_NAV = `nav-tab-${pathname}`;
  const STORAGE_KEY_CARD_FILTER = `card-filter-${pathname}`;
  const STORAGE_KEY_PRODUCT_FILTER = `product-filter-${pathname}`;

  const config = NAV_BY_PATCH[patch] as NAV_BY_PATCH_TYPE[string];

  const tabs = config.tabs;
  const isFilter = config.selectOptions;
  const isActionButton = config.actionButton;

  const [_value, setHash] = useHashParam("tab");
  const [_valueFilterCards, setHashFilterCards] = useHashParam("filter-cards");
  const [_valueFilterProducts, setHashFilterProducts] =
    useHashParam("filter-products");

  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("");
  const [filterCards, setFilterCards] = useState("all");
  const [filterProducts, setFilterProducts] = useState("all");

  const router = useRouter();
  // new

  const handleTabChange = (value: string) => {
    setTab(value);
    localStorage.setItem(STORAGE_KEY_NAV, value);
    setHash(value);
  };

  const handleFilterCardsChange = (value: string) => {
    setFilterCards(value);
    localStorage.setItem(STORAGE_KEY_CARD_FILTER, value);
    setHashFilterCards(value);
  };
  const handleFilterProductsChange = (value: string) => {
    setFilterProducts(value);
    localStorage.setItem(STORAGE_KEY_PRODUCT_FILTER, value);
    setHashFilterProducts(value);
  };

  const addNew = () => {
    const url = tab === "cards" ? `/card` : `/product`;
    router.push(url);
  };

  useEffect(() => {
    if (!pathname) return;

    if (tabs.length === 0) return;

    const storedTab = localStorage.getItem(STORAGE_KEY_NAV);
    const storedFilter = localStorage.getItem(STORAGE_KEY_CARD_FILTER);
    const storedFilterProduct = localStorage.getItem(
      STORAGE_KEY_PRODUCT_FILTER,
    );
    if (storedTab && tabs.length > 0) {
      setTab(storedTab);
      setHash(storedTab);
    } else {
      setHash(tabs[0]?.value);
    }

    if (storedFilter && isFilter) {
      setFilterCards(storedFilter);
      setHashFilterCards(storedFilter);
    } else {
      setHashFilterCards("all");
    }
    if (storedFilterProduct && isFilter) {
      setFilterProducts(storedFilterProduct);
      setHashFilterProducts(storedFilterProduct);
    } else {
      setHashFilterProducts("all");
    }
  }, [STORAGE_KEY_NAV, pathname, setHash, tabs, isFilter]);

  const selectClassName = "w-24 h-6.5! rounded-md text-xs bg-border";

  return (
    <div className="p-1 bg-background  sticky bottom-0 z-12 flex justify-between items-center">
      <LogOutButton />
      {tabs.length > 0 && (
        <TabsOptions
          value={tab}
          setValue={handleTabChange}
          isPending={isPending}
          options={tabs}
        />
      )}
      {isActionButton && (
        <>
          <button
            type="button"
            onClick={() => router.push("/home")}
            className="w-24 h-6.5! rounded-md text-sm bg-red-600 text-white"
          >
            exit
          </button>
          <button
            form={patch}
            type="submit"
            className="w-24 h-6.5! rounded-md text-sm bg-blue-600 text-white"
            disabled={isPending || !isAdmin}
          >
            save
          </button>
        </>
      )}

      {isFilter && (
        <>
          <Activity mode={tab === "cards" ? "visible" : "hidden"}>
            <SelectOptions
              options={[{ value: "all", label: "все" }, ...CATEGORY]}
              value={filterCards}
              onChange={handleFilterCardsChange}
              className={selectClassName}
            />
          </Activity>
          <Activity mode={tab === "products" ? "visible" : "hidden"}>
            <SelectOptions
              options={[{ value: "all", label: "все" }, ...CATEGORY_PRODUCT]}
              value={filterProducts}
              onChange={handleFilterProductsChange}
              className={selectClassName}
            />
          </Activity>
        </>
      )}
      {isAdmin && (
        <button
          onClick={addNew}
          type="button"
          className="cursor-pointer w-10 px-2  border-0 h-8  flex items-center justify-center"
        >
          <Plus className="w-4 h-4 text-blue-600 font-bold" />
        </button>
      )}
    </div>
  );
}
