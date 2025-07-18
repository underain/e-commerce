import AuthFormWrapper from "@/features/auth/ui/auth-form-wrapper";
import React from "react";

const SignInForm = () => {
  return (
    <AuthFormWrapper
      title="Вход в аккаунт"
      description="Введите свои данные ниже для входа в аккаунт"
      footerLink={{
        text: "Нет аккаунта?",
        href: "/sign-up",
        linkText: "Зарегистрируйтесь",
      }}
    >
      <form action=""></form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
