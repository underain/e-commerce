import Product from "@/widget/product/product";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <main>
      <Product id={(await params).id} />
    </main>
  );
};

export default page;
