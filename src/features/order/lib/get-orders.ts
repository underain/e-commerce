import db from "@/shared/prisma/db";
import { auth } from "@/features/auth/models/auth";
import { redirect } from "next/navigation";

export interface OrderWithProducts {
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
}

export const getOrders = async (): Promise<OrderWithProducts[]> => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  try {
    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        orderProduct: {
          include: {
            productVariant: {
              include: {
                product: {
                  select: {
                    id: true,
                    name: true,
                    picture: true,
                  },
                },
                memory: {
                  select: {
                    label: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return orders.map((order) => ({
      id: order.id,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt,
      orderProducts: order.orderProduct.map((op) => ({
        id: op.id,
        count: op.count,
        productVariant: {
          id: op.productVariant.id,
          price: op.productVariant.price,
          product: {
            id: op.productVariant.product.id,
            name: op.productVariant.product.name,
            picture: op.productVariant.product.picture,
          },
          memory: op.productVariant.memory,
        },
      })),
    }));
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    throw new Error("Не удалось получить список заказов");
  }
};
