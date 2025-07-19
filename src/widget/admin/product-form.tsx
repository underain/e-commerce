"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Checkbox } from "@/shared/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { cn } from "@/shared/lib/utils";
import FormWrapper from "@/entities/form/form-wrapper";
import { productSchema, ProductSchemaType } from "@/features/admin/lib/schema";
import { createProduct } from "@/features/admin/model/create-product";

interface ProductFormProps {
  brands: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  memoryOptions: { id: string; label: string; unit: string; size: number }[];
}

export const ProductForm = ({
  brands,
  categories,
  memoryOptions,
}: ProductFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      specifications: [{ name: "", description: "" }],
      variants: [{ memoryId: "", price: 0 }],
    },
  });

  const {
    fields: specFields,
    append: appendSpec,
    remove: removeSpec,
  } = useFieldArray({
    control,
    name: "specifications",
  });

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ProductSchemaType): Promise<void> => {
    setIsSubmitting(true);
    try {
      const res = await createProduct(data);
      toast.success("Товар успешно создан");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка создания товара"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      title="Создание товара"
      description="Заполните все поля для добавления нового товара"
      className="max-w-none"
    >
      <form className="p-5 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label
              className={cn(
                "mb-3 text-sm font-medium",
                errors.name && "text-destructive"
              )}
            >
              Название товара
            </label>
            <Input
              {...register("name")}
              className={cn(errors.name && "border-destructive")}
              placeholder="iPhone 15 Pro"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className={cn(
                "mb-3 text-sm font-medium",
                errors.article && "text-destructive"
              )}
            >
              Артикул
            </label>
            <Input
              {...register("article", { valueAsNumber: true })}
              className={cn(errors.article && "border-destructive")}
              placeholder="123456"
              type="number"
            />
            {errors.article && (
              <p className="mt-1 text-sm text-destructive">
                {errors.article.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className={cn(
                "mb-3 text-sm font-medium",
                errors.brandId && "text-destructive"
              )}
            >
              Бренд
            </label>
            <Select onValueChange={(value) => setValue("brandId", value)}>
              <SelectTrigger
                className={cn(errors.brandId && "border-destructive")}
              >
                <SelectValue placeholder="Выберите бренд" />
              </SelectTrigger>
              <SelectContent>
                {brands.map((brand) => (
                  <SelectItem key={brand.id} value={brand.id}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.brandId && (
              <p className="mt-1 text-sm text-destructive">
                {errors.brandId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className={cn(
                "mb-3 text-sm font-medium",
                errors.categoryId && "text-destructive"
              )}
            >
              Категория
            </label>
            <Select onValueChange={(value) => setValue("categoryId", value)}>
              <SelectTrigger
                className={cn(errors.categoryId && "border-destructive")}
              >
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.categoryId && (
              <p className="mt-1 text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label
              className={cn(
                "mb-3 text-sm font-medium",
                errors.picture && "text-destructive"
              )}
            >
              URL изображения
            </label>
            <Input
              {...register("picture")}
              className={cn(errors.picture && "border-destructive")}
              placeholder="https://example.com/image.jpg"
            />
            {errors.picture && (
              <p className="mt-1 text-sm text-destructive">
                {errors.picture.message}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2 pt-7">
            <Checkbox
              id="bestseller"
              {...register("bestseller")}
              onCheckedChange={(checked) =>
                setValue("bestseller", Boolean(checked))
              }
            />
            <label
              htmlFor="bestseller"
              className={cn(
                "text-sm font-medium",
                errors.bestseller && "text-destructive"
              )}
            >
              Хит продаж
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            className={cn(
              "mb-3 text-sm font-medium",
              errors.description && "text-destructive"
            )}
          >
            Описание товара
          </label>
          <Textarea
            {...register("description")}
            className={cn(errors.description && "border-destructive")}
            placeholder="Подробное описание товара..."
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Характеристики</h3>
          {specFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
            >
              <div className="flex flex-col">
                <label className="mb-3 text-sm font-medium">Название</label>
                <Input
                  {...register(`specifications.${index}.name`)}
                  placeholder="Название характеристики"
                />
                {errors.specifications?.[index]?.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.specifications[index]?.name?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-3 text-sm font-medium">Значение</label>
                <Input
                  {...register(`specifications.${index}.description`)}
                  placeholder="Значение характеристики"
                />
                {errors.specifications?.[index]?.description && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.specifications[index]?.description?.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeSpec(index)}
                disabled={specFields.length <= 1}
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => appendSpec({ name: "", description: "" })}
          >
            Добавить характеристику
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Варианты товара</h3>
          {variantFields.map((field, index) => (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end"
            >
              <div className="flex flex-col">
                <label className="mb-3 text-sm font-medium">Объем памяти</label>
                <Select
                  onValueChange={(value) =>
                    setValue(`variants.${index}.memoryId`, value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите объем памяти" />
                  </SelectTrigger>
                  <SelectContent>
                    {memoryOptions.map((option) => (
                      <SelectItem key={option.id} value={option.id}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.variants?.[index]?.memoryId && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.variants[index]?.memoryId?.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-3 text-sm font-medium">Цена</label>
                <Input
                  {...register(`variants.${index}.price`, {
                    valueAsNumber: true,
                  })}
                  placeholder="Цена"
                  type="number"
                />
                {errors.variants?.[index]?.price && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.variants[index]?.price?.message}
                  </p>
                )}
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => removeVariant(index)}
                disabled={variantFields.length <= 1}
              >
                Удалить
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            onClick={() => appendVariant({ memoryId: "", price: 0 })}
          >
            Добавить вариант
          </Button>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Создание товара..." : "Создать товар"}
        </Button>
      </form>
    </FormWrapper>
  );
};
