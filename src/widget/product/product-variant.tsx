"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import AddToCartForm from "@/features/cart/ui/add-to-cart-form";
import AnimatedCounter from "@/shared/ui/animated-counter";

interface ProductVariantProps {
  variants: {
    id: string;
    price: number;
    memory: string | undefined;
  }[];
}

const ProductVariant = ({ variants }: ProductVariantProps) => {
  const hasMemory = variants.some((v) => v.memory !== undefined);
  const [selectedVariantId, setSelectedVariantId] = useState(
    variants[0]?.id || ""
  );
  const [previousPrice, setPreviousPrice] = useState(variants[0]?.price || 0);

  const selectedVariant =
    variants.find((v) => v.id === selectedVariantId) || variants[0];

  const handleVariantChange = (newVariantId: string) => {
    const currentVariant = variants.find((v) => v.id === selectedVariantId);
    if (currentVariant) {
      setPreviousPrice(currentVariant.price);
    }
    setSelectedVariantId(newVariantId);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-bold"> {hasMemory ? "Память" : "Цена"} </h3>
      <div className="flex items-center gap-4">
        {hasMemory ? (
          <Select value={selectedVariantId} onValueChange={handleVariantChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Выберите вариант" />
            </SelectTrigger>
            <SelectContent>
              {variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  {variant.memory || "Без памяти"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          hasMemory && (
            <div className="w-[180px] text-sm text-muted-foreground">
              Вариант товара
            </div>
          )
        )}

        <div className="text-nowrap text-xl font-bold">
          <AnimatedCounter
            from={previousPrice}
            to={selectedVariant.price}
            animationOptions={{ duration: 0.5, ease: "easeOut" }}
          />{" "}
          ₽
        </div>
      </div>

      {hasMemory && (
        <div className="text-sm text-muted-foreground">
          Выбран: <b>{selectedVariant.memory || "не указано"}</b>
        </div>
      )}

      <AddToCartForm variantId={selectedVariantId} />
    </div>
  );
};

export default ProductVariant;
