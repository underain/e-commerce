import Order from "@/widget/order/order";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мои заказы",
};

const page = () => {
  return <Order />;
};

export default page;
