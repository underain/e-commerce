import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import { AuthFormWrapperProps } from "../lib/types";

const AuthFormWrapper = ({
  title,
  description,
  children,
  footerLink,
}: AuthFormWrapperProps) => {
  return (
    <Card className="mx-auto max-w-md space-y-6">
      <CardHeader className="space-y-2 text-center">
        <CardTitle>
          <h1 className="text-3xl font-bold">{title}</h1>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent className="space-y-4"> {children}</CardContent>
      <Separator />
      {footerLink && (
        <CardFooter className="text-center text-sm">
          {footerLink.text}
          <Link href={footerLink.href} className="underline">
            {footerLink.linkText}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default AuthFormWrapper;
