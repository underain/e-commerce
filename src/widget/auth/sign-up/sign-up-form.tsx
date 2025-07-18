import AuthFormWrapper from "@/features/auth/ui/auth-form-wrapper";
import React from "react";

const SignInForm = () => {
  return (
    <AuthFormWrapper
      title="Регистрация"
      description="Заполните форму ниже для регистрации на сайте"
      footerLink={{
        text: "Есть аккаунт?",
        href: "/sign-in",
        linkText: "Войти",
      }}
    >
      <form action=""></form>
    </AuthFormWrapper>
  );
};

export default SignInForm;
