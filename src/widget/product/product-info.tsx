import React from "react";

interface ProductInfoProps {
  info: {
    name: string;
    bestseller: boolean;
    article: number;
    category: string;
    brand: string;
  };
}

const ProductInfo = ({ info }: ProductInfoProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-black lg:text-3xl">{info.name}</h1>
        {info.bestseller && (
          <div className="bg-foreground text-background text-xl w-fit rounded-lg font-bold px-4 py-1 md:px-6 md:py-2">
            Хит
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-bold">Артикул:</h2>
        <p>{info.article}</p>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-bold">Бренд:</h2>
        <p>{info.brand}</p>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="font-bold">Категория:</h2>
        <p>{info.category}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
