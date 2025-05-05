"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  ChevronRight,
  Plus,
  Minus,
  IndianRupee,
} from "lucide-react";
import ReviewCard from "@/app/components/ReviewCard";
import { reviews } from "@/app/data/review";
import RelatedProductsCard from "@/app/components/useComponents/RelatedProductsCard";
import { handleAddToCart } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import Link from "next/link";

const ProductPageNew = ({
  SingleProduct,
  RelatedProducts,
  wishlist,
  setWishlist,
  handleWishlist,
}) => {
  console.log(SingleProduct);

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, quantity + value));
    setQuantity(newQuantity);
  };

  const AddToCart = async () => {
    const Logincode = localStorage.getItem("code");

    if (!Logincode || Logincode !== "0001") {
      toast.loading("Log in to continue shopping", { duration: 1000 });
      router.push("/sign-in");
      return;
    }

    try {
      const response = await handleAddToCart(SingleProduct._id, quantity);
      console.log("response is", response);
      if (response.success) {
        
      }
    } catch (error) {
      console.log("frontend error while adding to cart", error);
      return null;
    }
  };

  useEffect(() => {
    console.log("SingleProduct", SingleProduct);
  }, [SingleProduct]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Product Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12 shadow-lg hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.5)] rounded-lg">
        {/* Product Image */}
        <div className="md:w-1/2 ">
          <div className="aspect-square rounded-lg overflow-hidden bg-[var(--primary-text-color)]">
            {SingleProduct?.images && (
              <img
                src={SingleProduct.images}
                alt={SingleProduct?.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2 pt-12 px-4">
          <h1 className="text-3xl font-bold text-[var(--primary-text-color)] mb-4">
            {SingleProduct?.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < 4
                      ? "text-yellow-400 fill-current"
                      : "text-[var(--primary-text-color)]"
                  }`}
                />
              ))}
            </div>
            <span className="text-[var(--primary-text-color)]">reviews</span>
          </div>

          <div className="text-3xl font-bold text-[var(--primary-text-color)] mb-6">
            <IndianRupee className="inline text-xs text-[var(--primary-text-color)]" />
              {SingleProduct?.price}
          </div>

          <p className="text-gray-200-100 mb-8">{SingleProduct?.description}</p>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-[var(--primary-text-color)] mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[var(--primary-text-color)] rounded-lg">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="p-2 hover:bg-zinc-800 transition-colors"
                >
                  <Minus className="w-5 h-5 text-[var(--primary-text-color)]" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="p-2 hover:bg-zinc-800 transition-colors"
                >
                  <Plus className="w-5 h-5 text-[var(--primary-text-color)]" />
                </button>
              </div>
              <span className="text-sm text-[var(--primary-text-color)]">(Max 10 items)</span>
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={AddToCart}
              className="flex-1 bg-[var(--primary-text-color)] text-black py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => {
                handleWishlist(SingleProduct._id);
              }}
              className={`p-3 border border-[var(--primary-text-color)] rounded-lg hover:bg-rose-500  transition-colors
                ${
                  wishlist.includes(SingleProduct._id)
                    ? "bg-rose-600 "
                    : "bg-white "
                }`}
            >
              <Heart
                className={`w-5 h-5 text-black hover:text-[var(--primary-text-color)]
                ${
                  wishlist.includes(SingleProduct._id)
                    ? "text-[var(--primary-text-color)] "
                    : "text-black"
                }`}
              />
            </button>
            <button className="p-3 border border-[var(--primary-text-color)] rounded-lg  transition-colors">
              <Share2 className="w-5 h-5 text-[var(--primary-text-color)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[var(--primary-text-color)]">
            Related Products
          </h2>
          <Link href="/">
            <button className="text-[var(--primary-text-color)] flex items-center gap-1 hover:text-[var(--primary-text-color)]">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {RelatedProducts.map((product, index) => (
            <RelatedProductsCard
              key={product?._id}
              wishlist={wishlist}
              setWishlist={setWishlist}
              id={product?._id}
              name={product?.name}
              description={product?.description}
              price={product?.price}
              slug={product?.slug}
              image={product?.images}
              handleWishlist={handleWishlist}
            />
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[var(--primary-text-color)] mb-8 text-center">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPageNew;
