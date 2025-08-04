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
  variants?: Array<{
    memoryId?: string | null;
    price: number;
  }>;
};

export async function createProduct(data: ProductData) {
  try {
    const [categoryExists, brandExists] = await Promise.all([
      db.category.findUnique({ where: { id: data.categoryId } }),
      db.brand.findUnique({ where: { id: data.brandId } }),
    ]);

    if (!categoryExists) throw new Error("Категория не найдена");
    if (!brandExists) throw new Error("Бренд не найден");

    if (data.variants && data.variants.length > 0) {
      const memoryIds = data.variants
        .map(v => v.memoryId)
        .filter(Boolean) as string[];
      
      if (memoryIds.length > 0) {
        const existingMemories = await db.memoryOption.findMany({
          where: { id: { in: memoryIds } },
          select: { id: true }
        });

        const missingIds = memoryIds.filter(id => 
          !existingMemories.some(m => m.id === id)
        );

        if (missingIds.length > 0) {
          throw new Error(`Не найдены варианты памяти с ID: ${missingIds.join(', ')}`);
        }
      }
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
          data: data.specifications.map(spec => ({
            name: spec.name,
            description: spec.description,
            productId: newProduct.id,
          })),
        });
      }

      if (data.variants && data.variants.length > 0) {
        await Promise.all(
          data.variants.map(variant =>
            prisma.productVariant.create({
              data: {
                productId: newProduct.id,
                ...(variant.memoryId ? { memoryId: variant.memoryId } : {}),
                price: variant.price,
              },
            })
          )
        );
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
