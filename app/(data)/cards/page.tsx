import {
  getAllCards,
  getCardsByCategory,
} from "@/app/actions/cards/cards-action";
import NotData from "@/components/page/not-data";
import CardTable from "@/features/card-table/card-page";
import { CalculationCardType } from "@/features/card/schema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  const dataProduct =
    category === "all" || !category
      ? await getAllCards()
      : await getCardsByCategory(category);
  if (dataProduct.length === 0) return <NotData />;
  return <CardTable data={dataProduct as CalculationCardType[]} />;
}
