import { getProductById } from "@/app/actions/products/products-actions";
import ProductForm from "@/features/product/ProductForm";
import { ProductType } from "@/features/product/schema";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!id) return null;
  const data = await getProductById(id);
  return <ProductForm data={data as ProductType} disabled={true} />;
}
