"use client";
import { signUpSchema, SignUpSchemaType } from "@/features/auth/lib/schema";
import AuthFormWrapper from "@/features/auth/ui/auth-form-wrapper";
import { onSubmit } from "@/features/auth/models/submit-register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(signUpSchema) });
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const onSubmitRegister = async (data: SignUpSchemaType) => {
    setIsSubmitting(true);
    try {
      const result = await onSubmit(data);

      if (!result.success) {
        toast.error(result.error || "Ошибка регистрации");
        return;
      }

      toast.success("Регистрация успешна! Перенаправляем...");
      router.push("/auth/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Неожиданная ошибка", {
        description: "Возможно пользователь с таким email уже существует",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthFormWrapper
      title="Регистрация"
      description="Заполните форму ниже для регистрации на сайте"
      footerLink={{
        text: "Есть аккаунт?",
        href: "/auth/sign-in",
        linkText: "Войти",
      }}
    >
      <form
        className="p-5 space-y-4 lg:space-y-6"
        onSubmit={handleSubmit(onSubmitRegister)}
      >
        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.name && "text-destructive"
            )}
          >
            Имя
          </span>
          <Input
            {...register("name")}
            className={cn(
              errors.name && "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="Имя"
            type="text"
            required
          />
          {errors.name && (
            <span className="mt-1 text-sm text-destructive">
              {errors.name.message}
            </span>
          )}
        </label>

        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.email && "text-destructive"
            )}
          >
            Email
          </span>
          <Input
            {...register("email")}
            className={cn(
              errors.email &&
                "border-destructive focus-visible:ring-destructive"
            )}
            placeholder="Email"
            type="email"
            required
            autoComplete="email"
          />
          {errors.email && (
            <span className="mt-1 text-sm text-destructive">
              {errors.email.message}
            </span>
          )}
        </label>

        <label className="flex flex-col">
          <span
            className={cn(
              "mb-3 text-sm font-medium",
              errors.password && "text-destructive"
            )}
          >
            Пароль
          </span>
          <Input
            {...register("password")}
            className={cn(
              errors.password &&
                "border-destructive focus-visible:ring-destructive"
            )}
            type="password"
            placeholder="Пароль"
          />
          {errors.password && (
            <span className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </span>
          )}
        </label>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
        </Button>
      </form>
    </AuthFormWrapper>
  );
};

export default SignUpForm;
