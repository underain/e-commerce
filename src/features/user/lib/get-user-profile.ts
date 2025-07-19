import db from "@/shared/prisma/db";

export async function getUserProfile(userId: string) {
  return await db.user.findUnique({
    where: { id: userId },
    select: { name: true, email: true, image: true, role: true },
  });
}
