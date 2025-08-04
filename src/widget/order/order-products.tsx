// order-products.tsx
"use client";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";
import Image from "next/image";

interface OrderProductsProps {
  orders: {
    id: string;
    totalPrice: number;
    createdAt: Date;
    orderProducts: {
      id: string;
      count: number;
      productVariant: {
        id: string;
        price: number;
        product: {
          id: string;
          name: string;
          picture: string;
        };
        memory: {
          label: string;
        } | null;
      };
    }[];
  }[];
}

const OrderProducts = ({ orders }: OrderProductsProps) => {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="py-10 text-center">
          <p className="text-muted-foreground">У вас пока нет заказов</p>
        </CardContent>
      </Card>
    );
  }

  function formatDate(date: Date): string {
    return new Date(date).toLocaleDateString("ru-RU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <CardTitle className="text-lg">
                  Заказ #{order.id.slice(0, 8)}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {formatDate(order.createdAt)}
                </p>
              </div>
              <Badge variant="outline" className="ml-auto">
                Итого: {order.totalPrice.toLocaleString("ru-RU")}₽
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {order.orderProducts.map((product) => (
                <div key={product.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
                      <Image
                        src={product.productVariant.product.picture}
                        alt={product.productVariant.product.name}
                        fill
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {product.productVariant.product.name}
                      </h4>
                      {product.productVariant.memory && (
                        <p className="text-sm text-muted-foreground">
                          {product.productVariant.memory.label}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end">
                      <p>
                        {product.productVariant.price.toLocaleString("ru-RU")}₽
                      </p>
                      <p className="text-sm text-muted-foreground">
                        × {product.count}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrderProducts;
