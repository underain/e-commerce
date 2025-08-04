import { auth } from "@/features/auth/models/auth";
import { redirect } from "next/navigation";
import db from "@/shared/prisma/db";

export interface CartProduct {
  id: string;
  name: string;
  price: number;
  picture: string;
  memory: string | null;
}

export const getCart = async (): Promise<CartProduct[]> => {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const cart = await db.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      CartProduct: {
        include: {
          productVariant: {
            include: {
              memory: true,
              product: true,
            },
          },
        },
      },
    },
  });

  if (!cart) {
    return [];
  }

  return cart.CartProduct.map((item) => ({
    id: item.productVariant.id,
    name: item.productVariant.product.name,
    price: item.productVariant.price,
    picture: item.productVariant.product.picture,
    memory:
      item.productVariant.memory && item.productVariant.memory.label
        ? item.productVariant.memory.label
        : null,
  }));
};
