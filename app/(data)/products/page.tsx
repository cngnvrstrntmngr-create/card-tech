import {
  getAllProducts,
  getProductByCategory,
} from "@/app/actions/products/products-actions";
import EmptyPage from "@/components/page/EmptyPage";
import NotData from "@/components/page/NotData";
import { ProductType } from "@/features/product/schema";
import ProductsTable from "@/features/products-table/ProductsTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoryProduct: string }>;
}) {
  const { categoryProduct } = await searchParams;
  if (!categoryProduct) return <EmptyPage />;
  const dataProduct =
    categoryProduct === "all"
      ? await getAllProducts()
      : await getProductByCategory(categoryProduct);
  if (dataProduct.length === 0) return <NotData />;
  return <ProductsTable data={dataProduct as ProductType[]} />;
}
