import SignUpForm from "@/widget/auth/sign-up/sign-up-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Регистрация",
};
const page = () => {
  return (
    <main className="h-svh flex items-center justify-center">
      <SignUpForm />
    </main>
  );
};

export default page;
