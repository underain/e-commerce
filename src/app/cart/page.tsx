import Cart from "@/widget/cart/cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корзина",
};

const page = async () => {
  return <Cart />;
};

export default page;
