import db from "@/shared/prisma/db";

export async function getBrands() {
  return await db.brand.findMany({
    select: { id: true, name: true },
  });
}
