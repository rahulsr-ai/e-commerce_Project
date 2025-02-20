"use client"

import NewFooter from "@/app/components/NewFooter";
import MinFilter from "@/app/components/useComponents/minimalFilter";
import Image from "next/image";
import React, { useState } from "react";

const searchPage = () => {
    const [Products, setProducts] = useState([]);
    const [UnFilterData, setUnFilterData] = useState([]);
  return (
    <div className="min-h-screen mt-1 bg-zinc-950 text-white overflow-x-hidden">
      <div className="relative h-[400px] bg-gradient-to-r from-zinc-900 to-indigo-900 overflow-hidden w-full">
        <Image
          width={1920}
          height={1080}
          src="/others/shopingMall.jpg"
          alt={`hero-section-image `}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">
            🛍️ Elevate Your Shopping Experience
          </h1>
          <p className="text-xl text-zinc-300 max-w-2xl">
            Discover the latest trends, exclusive deals, and top-quality
            products—all in one place. Shop with confidence and style, anytime,
            anywhere! 🚀
          </p>
        </div>
      </div>



      <div className="py-12" id="filter-section">
        <MinFilter
          products={Products}
          setproducts={setProducts}
          UnFilterData={UnFilterData}
        />
      </div>



      <div>
        <NewFooter />
      </div>


    </div>
  );
};

export default searchPage;
