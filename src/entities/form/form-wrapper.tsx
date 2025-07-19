"use client";
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
import { FormWrapperProps } from "./lib/types";
import { cn } from "@/shared/lib/utils";

const FormWrapper = ({
  title,
  description,
  children,
  footerLink,
  className,
}: FormWrapperProps) => {
  return (
    <Card className={cn("mx-auto w-full max-w-md", className && className)}>
      <CardHeader className="space-y-2 text-center">
        <CardTitle>
          <h1 className="text-3xl font-bold">{title}</h1>
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent> {children}</CardContent>
      <Separator />
      {footerLink && (
        <CardFooter className="justify-center flex items-center gap-2 text-sm">
          {footerLink.text}
          <Link
            className="font-bold transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500"
            href={footerLink.href}
          >
            {footerLink.linkText}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default FormWrapper;
