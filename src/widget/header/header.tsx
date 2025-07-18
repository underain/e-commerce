"use client";
import React from "react";
import ResTopNavbar from "../menu/menu";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/shared/ui/navigation-menu";
import { MenuItem } from "@/shared/ui/menu-item";
import { MenuList } from "@/shared/ui/menu-list";
import ThemeSwitcher from "@/features/theme-switch/theme-switcher";
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  const data = [
    {
      id: 1,
      label: "Категории",
      type: "MenuList",
      children: [
        {
          id: 11,
          label: "Смартфоны",
          url: "/catalog?categoty=phones",
          description:
            "Мощные, стильные и технологичные — выбирайте среди лучших моделей с инновационными функциями.",
        },
        {
          id: 12,
          label: "Планшеты",
          url: "/catalog?categoty=tablets",
          description:
            "Удобные, производительные и компактные — идеальные помощники для работы, творчества и развлечений.",
        },
        {
          id: 13,
          label: "Ноутбкуки",
          url: "/catalog?categoty=notebooks",
          description:
            "Высокая производительность, элегантный дизайн и надежность для работы, учебы и игр.",
        },
        {
          id: 14,
          label: "Аксессуарты",
          url: "/catalog?categoty=accessories",
          description:
            "Дополните ваши устройства стильными и функциональными аксессуарами для максимального комфорта.",
        },
      ],
    },
    {
      id: 2,
      type: "MenuItem",
      label: "О нас",
      url: "/about-us",
      children: [],
    },
    {
      id: 3,
      type: "MenuItem",
      label: "Каталог",
      url: "/catalog",
      children: [],
    },
  ];
  return (
    <header className="w-full bg-background">
      <div className="header-wrapper mx-auto max-w-[1440px] flex items-center justify-between px-5 py-3">
        <div className="flex items-center">
          <div className="block md:hidden mr-4">
            <ResTopNavbar data={data} />
          </div>
          <Link
            href="/"
            className="text-2xl font-black lg:text-[32px] mr-3 lg:mr-10"
          >
            LikeStore
          </Link>
        </div>
        <NavigationMenu className="hidden md:flex mr-2 lg:mr-7">
          <NavigationMenuList>
            {data.map((item) => (
              <React.Fragment key={item.id}>
                {item.type === "MenuItem" && (
                  <MenuItem label={item.label} url={item.url} />
                )}
                {item.type === "MenuList" && (
                  <MenuList data={item.children} label={item.label} />
                )}
              </React.Fragment>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-3">
          <ThemeSwitcher />
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-8"
            href="/cart"
          >
            <FaShoppingCart />
          </Link>
          <Link
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 size-8"
            href="/profile"
          >
            <FaUser />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
