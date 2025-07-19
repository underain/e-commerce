import SignInForm from "@/widget/auth/sign-in/sign-in-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Вход в аккаунт",
};

const page = () => {
  return (
    <main className="h-svh flex items-center justify-center px-5">
      <SignInForm />
    </main>
  );
};

export default page;
