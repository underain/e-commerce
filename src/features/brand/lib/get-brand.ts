import db from "@/shared/prisma/db";

export async function getBrand() {
  return await db.brand.findMany({
    select: { id: true, name: true },
  });
}
