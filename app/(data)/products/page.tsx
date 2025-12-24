import {
  getAllProducts,
  getProductByCategory,
} from "@/app/actions/products/products-actions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoryProduct: string }>;
}) {
  const { categoryProduct } = await searchParams;
  if (!categoryProduct) return null;
  const dataProduct =
    categoryProduct === "all"
      ? await getAllProducts()
      : await getProductByCategory(categoryProduct);
  return (
    <div>
      <h1>{dataProduct.length}</h1>
    </div>
  );
}
