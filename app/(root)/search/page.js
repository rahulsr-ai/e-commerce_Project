"use client";

import ProductCard from "@/app/components/useComponents/ProductCard";
import Loader from "@/app/components/useComponents/Loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const SearchPage = () => {
  const role = localStorage.getItem("code");
  const router = useRouter();
  if (role === "2637") {
    router.push("/admin/dashboard/Inventory");
    return;
  }

  return (
    <div className="min-h-screen mt-1 bg-zinc-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-zinc-900 to-indigo-900 overflow-hidden w-full">
        {heroContent && (
          <>
            <Image
              width={1920}
              height={1080}
              src={`/public/others/shopingMall.jpg`}
              alt={`hero-section image `}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <h1 className="text-5xl font-bold mb-4">
                🛍️ Elevate Your Shopping Experience
              </h1>
              <p className="text-xl text-zinc-300 max-w-2xl">
                Discover the latest trends, exclusive deals, and top-quality
                products—all in one place. Shop with confidence and style,
                anytime, anywhere! 🚀
              </p>
            </div>
          </>
        )}
      </div>

      <div className="py-9">filter section</div>

      <div className="min-h-screen px-4 md:px-8 pb-20">
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
            {products.map((product, i) => (
              <div key={i} className="w-full max-w-sm mx-auto">
                <ProductCard
                  whislist={whislist}
                  setWhislist={setWhislist}
                  id={product._id}
                  slug={product.slug}
                  imageUrl={product.images[0]}
                  title={product.name}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
