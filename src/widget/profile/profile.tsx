import { auth } from "@/features/auth/models/auth";
import { getUserProfile } from "@/features/user/lib/get-user-profile";
import LogOutBtn from "@/features/user/ui/logout-btn";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import Link from "next/link";
import React from "react";

const Profile = async () => {
  const session = await auth();
  if (!session) return null;
  const userData = await getUserProfile(session?.user.id);

  return (
    <section className="w-full">
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <h1 className="text-center font-bold text-[clamp(22px,2vw,32px)]">
              Профиль
            </h1>
          </CardTitle>
          <LogOutBtn user={userData as any} />
        </CardHeader>
        <CardContent className="space-y-6">
          <label className="flex flex-col">
            <span className="mb-2">Имя</span>
            <Input value={userData!.name!} disabled />
          </label>
          <label className="flex flex-col">
            <span className="mb-2">Email</span>
            <Input value={userData!.email!} disabled />
          </label>
        </CardContent>
        <Separator />
        <CardFooter className="space-x-4">
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
            href="/profile/orders"
          >
            Мои заказы
          </Link>
          {userData?.role === "admin" && (
            <Link
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-9 px-4 py-2 has-[>svg]:px-3"
              href="/profile/admin"
            >
              Админ панель
            </Link>
          )}
        </CardFooter>
      </Card>
    </section>
  );
};

export default Profile;
