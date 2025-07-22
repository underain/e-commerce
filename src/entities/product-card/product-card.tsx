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
  productData: {
    id: string;
    name: string;
    description: string;
    bestseller: boolean;
    picture: string;
    price: number;
  };
}

const ProductCard = ({ productData }: IProductData) => {
  return (
    <Card className="relative justify-between max-w-xs w-full space-y-4">
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
          {productData.price >= 1000
            ? productData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
            : productData.price.toString()}
          ₽
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
