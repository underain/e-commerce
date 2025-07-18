import { ReactNode } from "react";

export interface AuthFormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerLink?: {
    text: string;
    href: string;
    linkText: string;
  };
}
