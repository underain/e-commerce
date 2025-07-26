import Product from "@/widget/product/product";
import React from "react";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <Product id={params.id} />
    </main>
  );
};

export default page;
