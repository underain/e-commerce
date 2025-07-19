import db from "@/shared/prisma/db";

export async function getCategory() {
  return await db.category.findMany({
    select: { id: true, name: true },
  });
}
