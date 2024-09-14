import CustomImage from "@/components/common/custom-image";

import React from "react";

const ProductsPage = () => {
  return (
    <main className="container mx-auto px-4 lg:px-0">
      <h1 className="text-4xl font-bold text-center py-8"> Our Products</h1>

      <div className="flex flex-col gap-10">
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
        <CustomImage path="minhaj.png" width={600} height={600} alt="minhaj" />
      </div>
    </main>
  );
};

export default ProductsPage;
