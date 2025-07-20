import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IProductData {
  variants: {
    price: number;
  }[];
  productData: {
    name: string;
    id: string;
    description: string;
    bestseller: boolean;
    picture: string;
    article: number;
    categoryId: string;
    brandId: string;
  };
}

const ProductCard = ({ productData, variants }: IProductData) => {
  return (
    <Card className="relative max-w-xs w-full space-y-4">
      <CardHeader>
        {productData.bestseller && (
          <div className="bg-foreground text-background w-fit rounded-lg font-bold relative z-50 h-9 px-4 py-2">
            Хит
          </div>
        )}
        <Image
          className="mx-auto relative z-20 transition-all duration-700 scale-100 hover:scale-110"
          src={productData.picture}
          alt={productData.name}
          width={200}
          height={200}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="font-bold">{productData.name}</CardTitle>
        <CardDescription className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {productData.description}
        </CardDescription>
        <Link
          className="before:absolute before:inset-0 before:z-0 font-bold text-xl"
          href={`/product/${productData.id}`}
        >
          {variants[0].price >= 1000
            ? variants[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            : variants[0].price.toString()}
          ₽
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
