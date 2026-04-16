import { getAllCards } from "@/app/actions/cards/cards-action";
import { getAllProducts } from "@/app/actions/products/products-actions";
import HomePage from "@/features/home/home-page";

export default async function Page() {
  const [dataProduct, dataCards] = await Promise.all([
    getAllProducts(),
    getAllCards(),
  ]);
  return <HomePage dataProduct={dataProduct} dataCards={dataCards} />;
}
