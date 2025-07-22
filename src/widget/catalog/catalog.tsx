import ProductCard from "@/entities/product-card/product-card";
import Filtration from "@/features/filtration/ui/filtration";
import { getProducts } from "@/features/product/lib/get-products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import CatalogPagination from "./catalog-pagination";

interface CatalogProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    brand?: string;
    memory?: string;
  }>;
}

const Catalog = async ({ searchParams }: CatalogProps) => {
  const page = (await searchParams).page
    ? parseInt((await searchParams).page!)
    : 1;
  const { products, totalCount, totalPages } = await getProducts({
    category: (await searchParams).category,
    brand: (await searchParams).brand,
    memory: (await searchParams).memory,
    page,
  });

  return (
    <section className="max-w-[1440px] mx-auto p-5">
      <Breadcrumb className="mb-5">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Каталог</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-5 justify-between w-full md:flex-row">
        <Filtration />
        {products.length ? (
          <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
            {products.map((item) => (
              <ProductCard key={item.id} productData={item} />
            ))}
          </div>
        ) : (
          <p className="w-full flex items-center justify-center font-bold text-2xl">
            Товаров с такими фильтрами еще нет
          </p>
        )}
      </div>
      {totalPages > 1 && (
        <div className="my-5">
          <CatalogPagination searchParams={searchParams} totalPages={totalPages} />
        </div>
      )}
    </section>
  );
};

export default Catalog;
