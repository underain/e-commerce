"use client";

import { type PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";
import { ToastProvider } from "./toast-provider";

export function MainProvider({ children }: PropsWithChildren<unknown>) {
  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
        storageKey="teacoder-theme"
      >
        <ToastProvider />
        {children}
      </ThemeProvider>
  );
}
