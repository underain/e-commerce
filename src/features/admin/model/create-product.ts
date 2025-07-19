"use server";

import db from "@/shared/prisma/db";

type ProductData = {
  name: string;
  description: string;
  bestseller?: boolean;
  picture: string;
  article: number;
  categoryId: string;
  brandId: string;
  specifications: Array<{
    name: string;
    description: string;
  }>;
  variants: Array<{
    memoryId: string;
    price: number;
  }>;
};

export async function createProduct(data: ProductData) {
  try {
    const [categoryExists, brandExists] = await Promise.all([
      db.category.findUnique({ where: { id: data.categoryId } }),
      db.brand.findUnique({ where: { id: data.brandId } }),
    ]);

    if (!categoryExists) {
      throw new Error("Категория не найдена");
    }

    if (!brandExists) {
      throw new Error("Бренд не найден");
    }

    const memoryIds = data.variants.map((v) => v.memoryId);
    const existingMemories = await db.memoryOption.findMany({
      where: { id: { in: memoryIds } },
    });

    if (existingMemories.length !== memoryIds.length) {
      throw new Error("Один или несколько вариантов памяти не найдены");
    }

    const product = await db.$transaction(async (prisma) => {
      const newProduct = await prisma.product.create({
        data: {
          name: data.name,
          description: data.description,
          bestseller: data.bestseller || false,
          picture: data.picture,
          article: data.article,
          categoryId: data.categoryId,
          brandId: data.brandId,
        },
      });

      if (data.specifications.length > 0) {
        await prisma.productsSpecification.createMany({
          data: data.specifications.map((spec) => ({
            name: spec.name,
            description: spec.description,
            productId: newProduct.id,
          })),
        });
      }

      if (data.variants.length > 0) {
        await prisma.productVariant.createMany({
          data: data.variants.map((variant) => ({
            productId: newProduct.id,
            memoryId: variant.memoryId,
            price: variant.price,
          })),
        });
      }

      return newProduct;
    });

    return await db.product.findUnique({
      where: { id: product.id },
      include: {
        specifications: true,
        variants: {
          include: {
            memory: true,
          },
        },
        category: true,
        brand: true,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании товара:", error);
    throw error instanceof Error
      ? error
      : new Error("Произошла ошибка при создании товара");
  }
}
