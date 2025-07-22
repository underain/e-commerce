import db from "@/shared/prisma/db";

export async function getMemories() {
  return await db.memoryOption.findMany();
}
