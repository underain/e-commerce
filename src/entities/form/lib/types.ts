import { ReactNode } from "react";

export interface FormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  footerLink?: {
    text: string;
    href: string;
    linkText: string;
  };
  className?: string;
}
