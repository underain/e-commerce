import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Image from "next/image";
import React from "react";

const SERVICES = [
  {
    id: 1,
    value: "sale",
    title: "Розничная продажа",
    description:
      "Розничная продажа техники Apple, Dyson и сопутствующих аксессуаров к ним",
  },
  {
    id: 2,
    value: "installment",
    title: "Рассрочка",
    description:
      "Рассрочка до 36 месяцев без первоначального взноса. Нужен только паспорт",
  },
  {
    id: 3,
    value: "trade-in",
    title: "Трейд-ин",
    description:
      "Вы можете сдать свой старый iPhone по системе Trade-In начиная уже с 11 серии в любом магазине LikeStore и получить скидку на новый. Принимается техника Apple – iPhone, iPad, Apple Watch",
  },
  {
    id: 4,
    value: "обслуживание",
    title: "Лучшее сервисное обслуживание",
    description:
      "Сервисное обслуживание техники настоящими профессионалами своего дела",
  },
  {
    id: 5,
    value: "delivery",
    title: "Бесплатная доставка",
    description: "Бесплатная доставка при покупке устройств от 5000 ₽",
  },
];

const AboutUs = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto mt-5">
      <section className="flex gap-5 w-full">
        <Card className="w-1/3 pb-0 space-y-12 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-[32px] md:text-5xl font-bold">
              Наши услуги
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Image
              src="/about-us/dropdown.png"
              alt="dropdown"
              width={300}
              height={300}
              className="w-full bg-cover rounded-b-xl"
              loading="lazy"
              priority={false}
            />
          </CardContent>
        </Card>
        <Card className="w-2/3">
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible>
              {SERVICES.map((service) => (
                <AccordionItem key={service.id} value={service.value}>
                  <AccordionTrigger className="text-lg lg:text-xl cursor-pointer hover:no-underline">
                    {service.title}
                  </AccordionTrigger>
                  <AccordionContent className="pl-4 text-base pb-4 border-l">
                    {service.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default AboutUs;
