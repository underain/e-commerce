"use client";
import { FaFacebookF, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Separator } from "@/shared/ui/separator";
import LayoutSpacing from "./layout-spacing";
import LinksSection from "./links-section";
import Link from "next/link";
import { SiHearth } from "react-icons/si";

const socialsData = [
  {
    id: 1,
    icon: <FaYoutube />,
    url: "https://youtube.com",
  },
  {
    id: 2,
    icon: <FaFacebookF />,
    url: "https://facebook.com",
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://instagram.com",
  },
  {
    id: 4,
    icon: <FaGithub />,
    url: "https://github.com",
  },
];

const Footer = () => {
  return (
    <footer className="mt-10 bg-background w-full">
      <div className="max-w-[1440px] mx-auto p-5">
        <nav className="lg:grid lg:grid-cols-12 mb-8">
          <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
            <h2
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="cursor-pointer flex items-center gap-2 text-[28px] lg:text-[32px] mb-6 font-black"
            >
              <SiHearth className="-rotate-30" />
              LikeStore
            </h2>
            <p className="text-sm mb-9">
              ИП Колесников Владимир Павлович ИНН 381012304607
            </p>
            <div className="flex items-center">
              {socialsData.map((social) => (
                <Link
                  href={social.url}
                  key={social.id}
                  className="transition-all mr-3 w-7 h-7 rounded-full border flex items-center justify-center p-1.5"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
            <LinksSection />
          </div>
          <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4">
            <LinksSection />
          </div>
        </nav>
        <Separator className="my-4" />
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-2">
          <p className="text-sm text-center sm:text-left mb-4 sm:mb-0 sm:mr-1">
            2025 ©LikeStore — фирменная продукция. Сведения указанные на сайте
            приведены как справочная информация и не являются публичной офертой,
            определяемой положениями статей 437 и 435 Гражданского кодекса
            Российской Федерации
          </p>
        </div>
      </div>
      <LayoutSpacing />
    </footer>
  );
};

export default Footer;
