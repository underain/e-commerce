"use client";

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  return (
    <main className="px-5 my-10">
      <Card className="w-fit mx-auto my-5">
        <CardHeader>
          <CardTitle className="text-5xl lg:text-9xl font-black text-center">
            404
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <CardDescription className="text-base lg:text-xl">
            Страница не найдена, попробуйте снова
          </CardDescription>
          <CardAction className="my-5">
            <Button className="cursor-pointer" onClick={() => router.push("/")}>
              На главную
            </Button>
          </CardAction>
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
