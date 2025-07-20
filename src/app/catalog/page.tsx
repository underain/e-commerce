import Catalog from "@/widget/catalog/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
};
const page = async () => {
  return (
    <main>
      <Catalog />
    </main>
  );
};

export default page;
