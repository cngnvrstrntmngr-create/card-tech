"use server";

import prisma from "@/lib/prisma";

export async function createCard(data: {
  cardId: string;
  name: string;
  unit: string;
  category: string;
  weight: string;
  expirationPeriod: string;
  description?: string;
  recipe?: {
    name: string;
    quantity: string;
    coefficient: string;
    unit: string;
    productId?: number;
  }[];
}) {
  return await prisma.calculationCard.create({
    data: {
      cardId: data.cardId,
      name: data.name,
      unit: data.unit,
      category: data.category,
      weight: data.weight,
      expirationPeriod: data.expirationPeriod,
      description: data.description || "",
      recipe: data.recipe
        ? { create: data.recipe.map((r) => ({ ...r })) }
        : undefined,
    },
    include: { recipe: true },
  });
}

export async function updateCard(
  id: number,
  data: {
    name?: string;
    unit?: string;
    category?: string;
    weight?: string;
    expirationPeriod?: string;
    description?: string;
    recipe?: {
      id?: number;
      name: string;
      quantity: string;
      coefficient: string;
      unit: string;
      productId?: number;
    }[];
  }
) {
  return await prisma.calculationCard.update({
    where: { id },
    data: {
      name: data.name,
      unit: data.unit,
      category: data.category,
      weight: data.weight,
      expirationPeriod: data.expirationPeriod,
      description: data.description,
      recipe: data.recipe
        ? {
            deleteMany: {},
            create: data.recipe.map((r) => ({ ...r })),
          }
        : undefined,
    },
    include: { recipe: true },
  });
}

export async function getAllCards() {
  return await prisma.calculationCard.findMany({
    include: { recipe: true },
  });
}

export async function getCardById(id: number) {
  return await prisma.calculationCard.findUnique({
    where: { id },
    include: { recipe: true },
  });
}

export async function getCardsByProduct(productId: number) {
  return await prisma.calculationCard.findMany({
    where: { recipe: { some: { productId } } },
    include: { recipe: true },
  });
}

export async function deleteCard(id: number) {
  return await prisma.calculationCard.delete({
    where: { id },
  });
}
