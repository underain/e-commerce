import { getProductById } from "@/features/product/lib/get-product-by-id";
import { Card, CardAction, CardContent, CardHeader } from "@/shared/ui/card";
import ProductSpecifications from "./product-specifications";
import ProductBreadcrumbs from "./product-breadcrumbs";
import ProductDescription from "./product-description";
import ProductVariant from "./product-variant";
import { notFound } from "next/navigation";
import ProductInfo from "./product-info";
import Image from "next/image";

interface ProductProps {
  id: string;
}

const Product = async ({ id }: ProductProps) => {
  const product = await getProductById(id);

  if (!product) {
    return notFound();
  }

  const productInfo = {
    name: product.name,
    bestseller: product.bestseller,
    article: product.article,
    category: product.category,
    brand: product.brand,
  };

  return (
    <section className="max-w-[1440px] w-full mx-auto p-5">
      <ProductBreadcrumbs
        productName={product.name}
        categoryName={product.category}
      />
      <div className="flex flex-col gap-5 justify-between md:flex-row">
        <Card className="h-fit">
          <CardContent>
            <Image
              className="transition-all duration-700 scale-100 hover:scale-105 mx-auto"
              src={product.picture}
              alt={product.name}
              width={400}
              height={400}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <ProductInfo info={productInfo} />
          </CardHeader>
          <CardContent className="space-y-4">
            <CardAction>
              <ProductVariant variants={product.variants} />
            </CardAction>
            <ProductDescription description={product.description} />
            <ProductSpecifications specifications={product.specifications} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Product;
