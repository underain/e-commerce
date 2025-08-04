"use client";
import { deleteProductFromCart } from "@/features/cart/lib/delete-product";
import { Card, CardContent } from "@/shared/ui/card";
import Image from "next/image";
import { FaTrash } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CartProductsProps {
  products: {
    id: string;
    name: string;
    price: number;
    picture: string;
    memory: string | null;
  }[];
}

const CartProducts = ({ products }: CartProductsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (variantId: string, productName: string) => {
    setIsDeleting(variantId);
    try {
      const result = await deleteProductFromCart(variantId);
      if (result.success) {
        toast.success(`Товар "${productName}" удален из корзины`);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Не удалось удалить товар");
      console.error("Delete error:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <Card className="w-full h-fit">
      <CardContent className="w-full">
        {products.map((item) => (
          <div
            className="flex justify-between gap-5 items-center my-4 relative"
            key={item.id}
          >
            {isDeleting === item.id && (
              <div className="absolute p-5 inset-0 bg-foreground/10 z-10 rounded" />
            )}
            <Image
              src={item.picture}
              alt={item.name}
              width={100}
              height={100}
              className={isDeleting === item.id ? "opacity-50" : ""}
            />
            <p className="text-start flex-[20%]">
              {item.name} {item.memory}
            </p>
            <p className="text-start flex-[20%]">{item.price} ₽</p>
            <button
              onClick={() => handleDelete(item.id, item.name)}
              disabled={isDeleting === item.id}
              className="text-red-500 hover:text-red-700 cursor-pointer transition-colors disabled:opacity-50"
            >
              <FaTrash className="size-6" />
            </button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CartProducts;
