import Catalog from "@/widget/catalog/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Каталог",
};

type Props = {
  searchParams: Promise<{
    page?: string;
    category?: string;
    brand?: string;
    memory?: string;
  }>;
};

const page = async ({ searchParams }: Props) => {
    
  return (
    <main>
      <Catalog searchParams={searchParams} />
    </main>
  );
};

export default page;
