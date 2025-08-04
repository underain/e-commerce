"use server"
import db from "@/shared/prisma/db";
import { auth } from "@/features/auth/models/auth";
import { redirect } from "next/navigation";

export const createOrder = async () => {
  try {
    // 1. Проверяем авторизацию пользователя
    const session = await auth();
    if (!session?.user?.id) {
      redirect("/auth/signin");
    }

    // 2. Получаем корзину пользователя с товарами
    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        CartProduct: {
          include: {
            productVariant: {
              include: {
                product: true,
                memory: true
              }
            }
          }
        }
      }
    });

    if (!cart) {
      throw new Error("Корзина не найдена");
    }

    if (cart.CartProduct.length === 0) {
      throw new Error("Корзина пуста");
    }

    // 3. Рассчитываем общую сумму заказа
    const totalPrice = cart.CartProduct.reduce(
      (sum, item) => sum + item.productVariant.price,
      0
    );

    // 4. Создаем транзакцию
    const order = await db.$transaction(async (prisma) => {
      // Создаем заказ
      const newOrder = await prisma.order.create({
        data: {
          totalPrice,
          userId: session.user.id,
        }
      });

      // Добавляем товары в заказ (используем create вместо createMany)
      await Promise.all(
        cart.CartProduct.map(item =>
          prisma.orderProduct.create({
            data: {
              orderId: newOrder.id,
              productVariantId: item.productVariantId,
              count: 1
            }
          })
        )
      );

      // Очищаем корзину
      await prisma.cartProduct.deleteMany({
        where: { cartId: cart.id }
      });

      return newOrder;
    });

    // 5. Возвращаем созданный заказ с товарами
    return await db.order.findUnique({
      where: { id: order.id },
      include: {
        orderProduct: {
          include: {
            productVariant: {
              include: {
                product: true,
                memory: true
              }
            }
          }
        }
      }
    });

  } catch (error) {
    console.error("Ошибка при создании заказа:", error);
    throw error instanceof Error 
      ? error 
      : new Error("Произошла ошибка при оформлении заказа");
  }
};
