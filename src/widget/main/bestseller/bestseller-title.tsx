"use client";
import { motion } from "framer-motion";

const BestsellerTitle = () => {
  return (
    <motion.h2
      initial={{ y: "100px", opacity: 0 }}
      whileInView={{ y: "0", opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-[32px] md:text-5xl mb-8 md:mb-14 capitalize text-center font-bold"
    >
      Хиты продаж
    </motion.h2>
  );
};

export default BestsellerTitle;
