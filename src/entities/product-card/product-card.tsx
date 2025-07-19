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

interface IProductCard {
  productCard: {
    id: string;
    image: string;
    name: string;
    price: number;
    description: string;
    bestseller: boolean;
  };
}

const ProductCard = () => {
  return (
    <Card className="max-w-md w-full space-y-4">
      <CardHeader>
        <Image src="/" alt="name" />
      </CardHeader>
      <CardContent>
        <CardTitle>
          `MacBook Air 13,6 2022 (M2 8c CPU/8c GPU 8/256 gb)
        </CardTitle>
        <CardDescription>
          MacBook Air 13,6 2022 (M2 8c CPU/8c GPU 8/256 gb) Представляем вам
          MacBook Air 13.6 2022 с процессором M2, который обеспечит вам
          невероятную производительность и эффективность.
        </CardDescription>
        <Link
          className="before:absolute before:inset-0 before:z-0"
          href={`/product/{id}`}
        >
          69 000$
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
