import { getCardById } from "@/app/actions/cards/cards-action";
import { getAllProducts } from "@/app/actions/products/products-actions";
import CardForm from "@/features/card/CardForm";
import { CalculationCardType } from "@/features/card/schema";
import { ProductType } from "@/features/product/schema";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return null;
  const dataProduct = await getAllProducts();
  const dataCard = await getCardById(id);
  return (
    <CardForm
      dataProduct={dataProduct as ProductType[]}
      dataCard={dataCard as CalculationCardType}
      disabled={true}
    />
  );
}
