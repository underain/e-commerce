"use server";

import { auth } from "@/features/auth/models/auth";
import db from "@/shared/prisma/db";
import { redirect } from "next/navigation";

export const deleteProductFromCart = async (productVariantId: string) => {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/");
    }

    console.log(productVariantId);

    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: { CartProduct: true },
    });

    if (!cart) {
      throw new Error("Корзина не найдена");
    }

    const cartProduct = await db.cartProduct.findFirst({
      where: {
        cartId: cart.id,
        productVariantId,
      },
    });

    if (!cartProduct) {
      throw new Error("Товар не найден в корзине");
    }

    await db.cartProduct.delete({
      where: { id: cartProduct.id },
    });

    return { success: true, message: "Товар удален из корзины" };
  } catch (error) {
    console.error("Ошибка при удалении товара из корзины:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Произошла ошибка при удалении товара",
    };
  }
};
