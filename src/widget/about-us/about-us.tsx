"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import React from "react";
import ServicesSection from "./services";
import AdvantagesSection from "./advantages";

const AboutUs = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto mt-5">
      <Breadcrumb className="m-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>О нас</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AdvantagesSection />
      <ServicesSection />
    </main>
  );
};

export default AboutUs;
