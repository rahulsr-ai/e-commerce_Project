"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";

const ProductPage = () => {
  // const { name } = React.use(params);

  const { name } = useParams();

  const fetchProductData = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/GetSingleProductData?name=${name}`
      );

      if (data?.success) {
        alert(data.message);
      }
    } catch (error) {
      console.log("error");
      console.log(error);
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
