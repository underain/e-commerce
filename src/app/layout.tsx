import { MainProvider } from "@/shared/provider/main-provider";
import Footer from "@/widget/footer/ui/footer";
import Header from "@/widget/header/header";
import { Manrope } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const ManropeSans = Manrope({
  variable: "--font-Manrope-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LikeStore – магазин техники Apple",
  description:
    "Купить технику Apple, Dyson и аксессуары в фирменном магазине LikeStore. Оригинальная продукция Apple с гарантией и доставкой. Резерв и самовывоз. Подарки при покупке.",
  keywords:
    "Сеть магазинов Lstore, сеть магазинов лайк стор, сеть магазинов like store, кпить технику apple, лайкстор Сургут, лайкстор Иркутск, лайкстор магазин",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${ManropeSans.variable} antialiased bg-accent`}>
        <MainProvider>
          <Header />
          {children}
          <Footer />
        </MainProvider>
      </body>
    </html>
  );
}
