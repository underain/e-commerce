"use server"

import db from "@/shared/prisma/db";

type BrandData = {
  name: string;
};

export async function createBrand(data: BrandData) {
  try {
    const existingBrand = await db.brand.findUnique({
      where: { name: data.name },
    });

    if (existingBrand) {
      throw new Error("Бренд с таким именем уже существует");
    }

    return await db.brand.create({
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании бренда:", error);
    throw error; 
  }
}
