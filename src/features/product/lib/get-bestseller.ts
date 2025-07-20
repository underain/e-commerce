import db from "@/shared/prisma/db";

export async function getBestseller() {
  return await db.product.findMany({
    where: {
      bestseller: true,
    },
    include: {
      variants: {
        take: 1,
        orderBy: {
          price: "asc",
        },
        select: {
          price: true,
        },
      },
    },
    take: 4,
  });
}
