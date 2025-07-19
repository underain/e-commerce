"use client";
import FormWrapper from "@/entities/form/form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { toast } from "sonner";
import { memorySchema, MemorySchemaType } from "@/features/admin/lib/schema";
import { useRouter } from "next/navigation";
import { createMemory } from "@/features/admin/model/create-memory";

const MemoryForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MemorySchemaType>({ resolver: zodResolver(memorySchema) });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: MemorySchemaType): Promise<void> => {
    setIsSubmitting(true);
    try {
      const res = await createMemory(data);
      toast.success("Размер успешно создан");
      reset();
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Ошибка создания размера"
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <FormWrapper title="Создание памяти" description="Форма для созданя памяти">
      <form
        className="p-5 space-y-4 lg:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.size && "text-destructive"
            )}
          >
            Размер
          </span>
          <Input
            {...register("size", { valueAsNumber: true })}
            className={cn(
              errors.size && "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="128"
            type="number"
            required
          />
          {errors.size && (
            <span className="mt-1 text-sm text-destructive">
              {errors.size.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.unit && "text-destructive"
            )}
          >
            Обозначение
          </span>
          <Input
            {...register("unit")}
            className={cn(
              errors.unit && "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="GB"
            type="text"
            required
          />
          {errors.unit && (
            <span className="mt-1 text-sm text-destructive">
              {errors.unit.message}
            </span>
          )}
        </label>
        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.label && "text-destructive"
            )}
          >
            Название
          </span>
          <Input
            {...register("label")}
            className={cn(
              errors.label &&
                "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="128 GB"
            type="text"
            required
          />
          {errors.label && (
            <span className="mt-1 text-sm text-destructive">
              {errors.label.message}
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

export default MemoryForm;
