"use client";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import AnimatedCounter from "@/shared/ui/animated-counter";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createOrder } from "@/features/order/lib/create-order";

interface OrderingInfoProps {
  totalPrice: number;
  totalCount: number;
}

const CartOrdering = ({ totalPrice, totalCount }: OrderingInfoProps) => {
  const [currentTotal, setCurrentTotal] = useState(totalPrice);
  const [prevTotal, setPrevTotal] = useState(totalPrice);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const order = await createOrder();
      toast.success("Заказ успешно оформлен!");
      router.push(`/profile`);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Произошла ошибка при оформлении заказа"
      );
    }
  };

  useEffect(() => {
    setPrevTotal(currentTotal);
    setCurrentTotal(totalPrice);
  }, [totalPrice]);

  return (
    <Card className="w-full md:max-w-sm h-fit sticky top-5">
      <CardHeader>
        <h2 className="font-bold text-[clamp(18px,2vw,22px)]">
          Оформление заказа
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />

        <div className="flex justify-between">
          <span>Товары ({totalCount}):</span>
          <span className="font-medium">
            <AnimatedCounter
              from={prevTotal}
              to={currentTotal}
              animationOptions={{ duration: 0.5 }}
            />{" "}
            ₽
          </span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Итого:</span>
          <span>
            <AnimatedCounter
              from={prevTotal}
              to={currentTotal}
              animationOptions={{ duration: 0.5 }}
            />{" "}
            ₽
          </span>
        </div>

        <Separator />

        <Button
          onClick={handleCheckout}
          className="w-full py-5 cursor-pointer text-lg font-bold"
        >
          Оформить заказ
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartOrdering;
