import db from "@/shared/prisma/db";

export async function getProductById(id: string) {
  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      bestseller: true,
      picture: true,
      article: true,
      variants: {
        select: {
          id: true,
          price: true,
          memory: {
            select: {
              label: true,
            },
          },
        },
      },
      specifications: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      brand: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!product) return null;

  return {
    ...product,
    category: product.category?.name || "",
    brand: product.brand?.name || "",
    variants: product.variants.map((variant) => ({
      id: variant.id,
      price: variant.price,
      memory: variant.memory?.label,
    })),
  };
}
