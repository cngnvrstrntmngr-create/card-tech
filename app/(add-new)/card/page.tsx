import { getAllProducts } from "@/app/actions/products/products-actions";
import CardForm from "@/features/card/CardForm";
import { ProductType } from "@/features/product/schema";

export default async function Page() {
  const dataProduct = await getAllProducts();
  // const dataPF = await getCardsByCategory("pf");

  return <CardForm dataProduct={dataProduct as ProductType[]} />;
}
