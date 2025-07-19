"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import * as motion from "framer-motion/client";
import { Separator } from "@/shared/ui/separator";
import { cn } from "@/shared/lib/utils";
import AnimatedCounter from "@/shared/ui/animated-counter";

const Hero = () => {
  return (
    <section className="w-full pt-10 md:pt-24 overflow-hidden">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <section className="max-w-frame px-4">
          <motion.h1
            initial={{ y: "100px", opacity: 0, rotate: 10 }}
            whileInView={{ y: "0", opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={cn([
              "text-4xl font-black lg:text-[64px] lg:leading-[64px] mb-5 lg:mb-8",
            ])}
          >
            Продаем технику, которая попадает в самое сердцe
          </motion.h1>
          <motion.p
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm lg:text-base mb-6 lg:mb-8 max-w-[545px]"
          >
            LikeStore — магазин самых доступных цен на смартфоны Apple. Мы
            радуем наших покупателей отличным качеством работы уже более 7-ми
            лет и продолжаем это делать с огромным удовольствием.
          </motion.p>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-6 has-[>svg]:px-4"
            >
              В каталог
            </Link>
          </motion.div>
          <motion.div
            initial={{ y: "100px", opacity: 0 }}
            whileInView={{ y: "0", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="flex mt-6 md:h-full md:max-h-11 lg:max-h-[52px] xl:max-h-[68px] items-center justify-center md:justify-start flex-wrap sm:flex-nowrap md:space-x-3 lg:space-x-6 xl:space-x-8 md:mb-[116px]"
          >
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={15000} />+
              </span>
              <span className="text-xs xl:text-base text-nowrap">
                Cмартфонов продали
              </span>
            </div>
            <Separator
              className="ml-6 md:ml-0 h-12 md:h-full"
              orientation="vertical"
            />
            <div className="flex flex-col ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={25} />+
              </span>
              <span className="text-xs xl:text-base text-nowrap">
                Магазинов открыли
              </span>
            </div>
            <Separator
              className="hidden sm:block sm:h-12 md:h-full ml-6 md:ml-0 "
              orientation="vertical"
            />
            <div className="flex flex-col w-full text-center sm:w-auto sm:text-left mt-3 sm:mt-0 sm:ml-6 md:ml-0">
              <span className="font-bold text-2xl md:text-xl lg:text-3xl xl:text-[40px] xl:mb-2">
                <AnimatedCounter from={0} to={7} /> лет
              </span>
              <span className="text-xs xl:text-base text-nowrap">На рынке</span>
            </div>
          </motion.div>
        </section>
        <motion.section
          initial={{ y: "100px", opacity: 0, rotate: 10 }}
          whileInView={{ y: "0", opacity: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0, duration: 0.8 }}
          className="relative md:px-4 min-h-[448px] md:min-h-[428px] bg-cover bg-top xl:bg-[center_top_-1.6rem] bg-no-repeat bg-[url('/main/hero-res-homepage.png')] md:bg-[url('/main/hero-homepage.png')]"
        ></motion.section>
      </div>
    </section>
  );
};

export default Hero;
