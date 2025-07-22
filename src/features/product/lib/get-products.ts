import db from "@/shared/prisma/db";

interface GetProductsParams {
  category?: string;
  brand?: string;
  memory?: string;
  page?: number;
}

export async function getProducts(params: GetProductsParams = {}) {
  const { category, brand, memory, page = 1 } = params;
  const itemsPerPage = 6;
  const skip = (page - 1) * itemsPerPage;

  const where = {
    ...(category && { category: { name: category } }),
    ...(brand && { brand: { name: brand } }),
    ...(memory && {
      variants: { some: { memory: { size: parseInt(memory) } } },
    }),
  };

  const [products, totalCount] = await Promise.all([
    db.product.findMany({
      where,
      select: {
        id: true,
        name: true,
        description: true,
        bestseller: true,
        picture: true,
        variants: {
          select: {
            price: true,
          },
          orderBy: {
            price: "asc",
          },
          take: 1,
        },
      },
      skip,
      take: itemsPerPage,
    }),
    db.product.count({ where }),
  ]);

  const transformedProducts = products.map(({ variants, ...product }) => ({
    ...product,
    price: variants[0]?.price || 0,
  }));

  return {
    products: transformedProducts,
    totalCount,
    totalPages: Math.ceil(totalCount / itemsPerPage),
    currentPage: page,
  };
}
