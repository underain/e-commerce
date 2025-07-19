import db from "@/shared/prisma/db";

export async function getMemory() {
  return await db.memoryOption.findMany();
}
