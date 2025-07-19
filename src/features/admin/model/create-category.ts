"use server";

import db from "@/shared/prisma/db";

type CategoryData = {
  name: string;
};

export async function createCategory(data: CategoryData) {
  try {
    const existingBrand = await db.category.findUnique({
      where: { name: data.name },
    });

    if (existingBrand) {
      throw new Error("Категория с таким именем уже существует");
    }

    return await db.category.create({
      data: {
        name: data.name,
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании категории:", error);
    throw error;
  }
}
