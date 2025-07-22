import db from "@/shared/prisma/db";

export async function getBestsellers() {
  const bestsellers = await db.product.findMany({
    where: {
      bestseller: true,
    },
    select: {
      id: true,
      name: true,
      description: true,
      bestseller: true,
      picture: true,
      variants: {
        select: {
          price: true,
        },
        orderBy: {
          price: "asc",
        },
        take: 1,
      },
    },
    take: 4,
  });

  return bestsellers.map(({ variants, ...product }) => ({
    ...product,
    price: variants[0]?.price || 0,
  }));
}
