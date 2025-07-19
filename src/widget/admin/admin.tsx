import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React from "react";
import CategoryForm from "./category-form";
import BrandForm from "./brand-form";
import MemoryForm from "./memory-form";
import { getBrand } from "@/features/brand/lib/get-brand";
import { getCategory } from "@/features/category/lib/get-category";
import { getMemory } from "@/features/memory/lib/get-memory";
import { ProductForm } from "./product-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";

const Admin = async () => {
  const [brand, category, memory] = await Promise.all([
    getBrand(),
    getCategory(),
    getMemory(),
  ]);
  return (
    <section className="max-w-[1440px] mx-auto p-5">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/profile">Профиль</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Админ панель</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Tabs defaultValue="category" className=" w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="category">Категории</TabsTrigger>
          <TabsTrigger value="product">Товары</TabsTrigger>
          <TabsTrigger value="brand">Бренды</TabsTrigger>
          <TabsTrigger value="memory">Память</TabsTrigger>
        </TabsList>
        <TabsContent value="category">
          <CategoryForm />
        </TabsContent>
        <TabsContent value="product">
          <ProductForm
            brands={brand}
            categories={category}
            memoryOptions={memory}
          />
        </TabsContent>
        <TabsContent value="brand">
          <BrandForm />
        </TabsContent>
        <TabsContent value="memory">
          <MemoryForm />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Admin;
