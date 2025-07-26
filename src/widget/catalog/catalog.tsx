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
  const { page = "1", category, brand, memory } = await searchParams;
  const currentPage = parseInt(page) || 1;
  const filters = {
    category,
    brand,
    memory,
    page: currentPage,
  };
  const { products, totalCount, totalPages } = await getProducts(filters);

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
      <h1 className="text-2xl font-black lg:text-3xl mb-5 lg:mb-8 relative w-fit mt-10">
        Каталог
        <b className="text-base text-accent-foreground absolute -right-5 -top-3">
          {totalCount}
        </b>
      </h1>
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
          <CatalogPagination
            searchParams={searchParams}
            totalPage={totalPages}
          />
        </div>
      )}
    </section>
  );
};

export default Catalog;
