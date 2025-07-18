"use client";
import { Button } from "@/shared/ui/button";
import { redirect } from "next/navigation";

const SignIn = () => {
  const handleSignIn = (): void => {
    redirect("/sign-in");
  };

  return (
    <Button variant="default" onClick={handleSignIn}>
      Зарегистрироваться
    </Button>
  );
};

export { SignIn };
