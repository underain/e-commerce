"use server";

import db from "@/shared/prisma/db";

type MemoryData = {
  size: number;
  unit: string;
  label: string;
};

export async function createMemory(data: MemoryData) {
  try {
    const existingBrand = await db.memoryOption.findUnique({
      where: { size: data.size },
    });

    if (existingBrand) {
      throw new Error("Размер с таким значением уже существует");
    }

    return await db.memoryOption.create({
      data: {
        unit: data.unit,
        size: data.size,
        label: data.label,
      },
    });
  } catch (error) {
    console.error("Ошибка при создании размера:", error);
    throw error;
  }
}
