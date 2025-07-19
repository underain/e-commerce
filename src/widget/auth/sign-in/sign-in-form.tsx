"use client";
import { signInSchema, SignInSchemaType } from "@/features/auth/lib/schema";
import { onSubmit } from "@/features/auth/models/submit-login";
import FormWrapper from "@/entities/form/form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/ui/button";
import { useForm } from "react-hook-form";
import { Input } from "@/shared/ui/input";
import { cn } from "@/shared/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({ resolver: zodResolver(signInSchema) });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitLogin = async (data: SignInSchemaType): Promise<void> => {
    setIsSubmitting(true);
    try {
      const response: any = await onSubmit(data);
      if (!response) {
        toast.error("Ошибка! Что-то пошло не так, попробуйте еще раз", {
          duration: 2000,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormWrapper
      title="Вход в аккаунт"
      description="Введите свои данные ниже для входа в аккаунт"
      footerLink={{
        text: "Нет аккаунта?",
        href: "/auth/sign-up",
        linkText: "Зарегистрироваться",
      }}
    >
      <form
        className="p-5 space-y-4 lg:space-y-6"
        onSubmit={handleSubmit(onSubmitLogin)}
      >
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

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Вход..." : "Войти"}
        </Button>
      </form>
    </FormWrapper>
  );
};

export default SignInForm;
