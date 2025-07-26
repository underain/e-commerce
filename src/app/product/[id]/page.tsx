import Product from "@/widget/product/product";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return <Product id={(await params).id} />;
};

export default page;
