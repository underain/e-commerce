import { z } from "zod";

const categorySchema = z.object({
  name: z.string("Название должно быть строкой"),
});

type CategorySchemaType = z.infer<typeof categorySchema>;

const brandSchema = z.object({
  name: z.string("Название должно быть строкой"),
});

type BrandSchemaType = z.infer<typeof brandSchema>;

const memorySchema = z.object({
  size: z.number("Размер должен быть числом"),
  unit: z.string("Обозначение должно быть строкой"),
  label: z.string("Название должно быть строкой"),
});

type MemorySchemaType = z.infer<typeof memorySchema>;

export const specificationSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
});

export const variantSchema = z.object({
  memoryId: z.string().min(1, "Выберите память"),
  price: z.number().min(1, "Цена должна быть больше 0"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  article: z.number().min(1, "Артикул должен быть больше 0"),
  picture: z.string(),
  bestseller: z.boolean(),
  categoryId: z.string().min(1, "Выберите категорию"),
  brandId: z.string().min(1, "Выберите бренд"),
  specifications: z
    .array(specificationSchema)
    .min(1, "Добавьте хотя бы одну характеристику"),
  variants: z.array(variantSchema).min(1, "Добавьте хотя бы один вариант"),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export { categorySchema, type CategorySchemaType };
export { brandSchema, type BrandSchemaType };
export { memorySchema, type MemorySchemaType };
