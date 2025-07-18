import React from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";

const footerLinksData = [
  {
    id: 1,
    title: "Каталог",
    children: [
      {
        id: 11,
        label: "iPhone",
        url: "#",
      },
      {
        id: 12,
        label: "Samsung",
        url: "#",
      },
      {
        id: 13,
        label: "iPad",
        url: "#",
      },
      {
        id: 14,
        label: "MacBook",
        url: "#",
      },
    ],
  },
  {
    id: 2,
    title: "О компании",
    children: [
      {
        id: 21,
        label: "О компании",
        url: "#",
      },
      {
        id: 22,
        label: "Акции",
        url: "#",
      },
      {
        id: 23,
        label: "Контакты",
        url: "#",
      },
      {
        id: 24,
        label: "Доставка и оплата",
        url: "#",
      },
    ],
  },
  {
    id: 3,
    title: "Сервисы",
    children: [
      {
        id: 31,
        label: "Trade-In",
        url: "#",
      },
      {
        id: 32,
        label: "Кредит",
        url: "#",
      },
      {
        id: 33,
        label: "Подарки",
        url: "#",
      },
      {
        id: 34,
        label: "Гарантия",
        url: "#",
      },
    ],
  },
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className="flex flex-col mt-5" key={item.id}>
          <h3 className="font-black text-sm md:text-base uppercase tracking-widest mb-6">
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                link.id !== 41 && link.id !== 43 && "capitalize",
                "text-sm md:text-base mb-4 w-fit transition-all relative after:absolute after:w-0 after:h-1 after:bg-foreground hover:after:w-full after:-bottom-2 after:left-1/2 hover:after:left-0 after:transition-all after:duration-500",
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
