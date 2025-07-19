"use client";
import FormWrapper from "@/entities/form/form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import {
  categorySchema,
  CategorySchemaType,
} from "@/features/admin/lib/schema";
import { useRouter } from "next/navigation";
import { createCategory } from "@/features/admin/model/create-category";

const CategoryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategorySchemaType>({ resolver: zodResolver(categorySchema) });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CategorySchemaType): Promise<void> => {
    setIsSubmitting(true);
    try {
      const res = await createCategory(data);
      toast.success("Категория успешно создана");
      reset();
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка создания категории"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormWrapper
      title="Создание категории"
      description="Форма для созданя категории"
    >
      <form
        className="p-5 space-y-4 lg:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.name && "text-destructive"
            )}
          >
            Название
          </span>
          <Input
            {...register("name")}
            className={cn(
              errors.name && "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="Смартфоны"
            type="text"
            required
          />
          {errors.name && (
            <span className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </span>
          )}
        </label>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Создание..." : "Создать"}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default CategoryForm;
