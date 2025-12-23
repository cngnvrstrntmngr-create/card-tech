"use server";
import prisma from "@/lib/prisma";
import { updateTag } from "next/cache";

export async function createProduct(data: {
  name: string;
  coefficient: string;
  unit: string;
  productId?: number;
}) {
  const dat = await prisma.product.create({ data });
  updateTag("products");
  return dat.id;
}

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

export async function getAllProducts() {
  return await prisma.product.findMany({
    include: { recipeItems: true },
  });
}

export async function getProductById(id: number) {
  return await prisma.product.findUnique({
    where: { id },
    include: { recipeItems: true },
  });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: { id },
  });
}
