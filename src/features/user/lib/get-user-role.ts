import db from "@/shared/prisma/db";

export async function getUserRole(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
}
