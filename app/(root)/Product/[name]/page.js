import React, { useEffect } from "react";

const ProductPage = ({ params }) => {
  const { name } = params;

  const fetchProductData = async () => {
    const { data } = await fetch("/product/GetSingleProductData");

    if (data?.success) {
      alert(data.message);
    }
  };


  useEffect(() => {
    fetchProductData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-center pt-44 ">
      <h1 className="text-4xl font-bold text-white">{name}</h1>
    </div>
  );
};

export default ProductPage;
