"use server";
import prisma from "@/lib/prisma";
import { unstable_cache, updateTag } from "next/cache";

// create
export async function createProduct(data: {
  name: string;
  coefficient: string;
  unit: string;
  category: string;
  key?: string;
}) {
  const dat = await prisma.product.create({ data });
  updateTag("products");
  return dat.id;
}

// update
export async function updateProduct(
  id: number,
  data: {
    name?: string;
    coefficient?: string;
    unit?: string;
    productId?: number;
  }
) {
  return await prisma.product.update({
    where: { id },
    data,
  });
}

// get all
export async function _getAllProducts() {
  return await prisma.product.findMany({
    include: { recipeItems: true },
  });
}

export const getAllProducts = unstable_cache(_getAllProducts, ["products"], {
  revalidate: false,
  tags: ["products"],
});

// get by id
export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { recipeItems: true },
  });
}
//get by category
export async function _getProductByCategory(category: string) {
  return await prisma.product.findMany({
    where: { category },
    include: { recipeItems: true },
  });
}
export const getProductByCategory = unstable_cache(
  _getProductByCategory,
  ["products"],
  {
    revalidate: false,
    tags: ["products"],
  }
);

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: { id },
  });
}
