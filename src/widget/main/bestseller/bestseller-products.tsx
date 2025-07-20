"use client";
import ProductCard from "@/entities/product-card/product-card";
import { motion } from "framer-motion";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description: string;
  bestseller: boolean;
  article: number;
  picture: string;
  categoryId: string;
  brandId: string;
  variants: {
    price: number;
    id?: string;
    memoryId?: string;
  }[];
};

type BestsellerProductsProps = {
  bestseller: Product[];
};

const BestsellerProducts = ({ bestseller }: BestsellerProductsProps) => {
  return (
    <motion.div
      initial={{ y: "100px", opacity: 0 }}
      whileInView={{ y: "0", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="flex flex-col items-center"
    >
      <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
        {bestseller.map((item) => (
          <ProductCard
            key={item.id}
            productData={item}
            variants={item.variants}
          />
        ))}
      </div>

      <Link
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 my-5"
        href="/catalog"
      >
        Смотреть все
      </Link>
    </motion.div>
  );
};

export default BestsellerProducts;
