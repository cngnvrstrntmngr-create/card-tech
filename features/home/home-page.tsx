"use client";
import { useHashParam } from "@/hooks/use-hash";
import { CalculationCardType } from "../card/schema";
import { ProductType } from "../product/schema";
import { Activity } from "react";
import CardTable from "@/features/card-table/card-page";
import ProductsTable from "../products-table/products-page";
import { ViewTransition } from "react";

export default function HomePage({
  dataProduct,
  dataCards,
}: {
  dataProduct: ProductType[];
  dataCards: CalculationCardType[];
}) {
  const [tab] = useHashParam("tab");

  if (!tab) return null;
  return (
    <>
      <Activity mode={tab === "cards" ? "visible" : "hidden"}>
        <ViewTransition>
          <CardTable data={dataCards} />
        </ViewTransition>
      </Activity>
      <Activity mode={tab === "products" ? "visible" : "hidden"}>
        <ViewTransition>
          <ProductsTable data={dataProduct} />
        </ViewTransition>
      </Activity>
    </>
  );
}
