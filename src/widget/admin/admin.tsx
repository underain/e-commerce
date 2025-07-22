import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import React from "react";
import CategoryForm from "./category-form";
import BrandForm from "./brand-form";
import MemoryForm from "./memory-form";
import { getBrands } from "@/features/brand/lib/get-brands";
import { getCategories } from "@/features/category/lib/get-categories";
import { getMemories } from "@/features/memory/lib/get-memories";
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
  const [brands, categories, memories] = await Promise.all([
    getBrands(),
    getCategories(),
    getMemories(),
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
            brands={brands}
            categories={categories}
            memoryOptions={memories}
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
