//@ts-nocheck
"use client";

import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { products } from "@/app/data/products";
import { reviews } from "@/app/data/review";

import ReviewCard from "@/app/components/ReviewCard.jsx";
import { ProductCard } from "@/app/components/ProductCard";

const TrendingPage = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");

 
  const trendingProducts = products.filter((product) => product.trending);
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  // here categories array is filled with categories name = [all, electronics, fashion, accessories, footwear, watches]
  
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.trending
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 mt-1">
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <div className="relative h-[500px] bg-black">
          <div className="absolute inset-0">
            <img
              src={trendingProducts[activeSlide]?.image}
              alt="Hero"
              className="w-full h-full object-cover opacity-50"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-4">
              <h1 className="text-5xl font-bold text-white mb-6">
                🔥 Trending Now!
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover our most popular products loved by customers
              </p>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
          <button
            onClick={() =>
              setActiveSlide((prev) =>
                prev === 0 ? trendingProducts.length - 1 : prev - 1
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) =>
                prev === trendingProducts.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
          >
            <ChevronRight className="text-white" size={24} />
          </button>
        </div>

        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Filter size={24} className="text-gray-200 hover:text-indigo-600" />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => { 
                      setSelectedCategory(category)

                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      selectedCategory === category
                        ? "bg-violet-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={24} className="text-black" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              >
                <option value="popularity">Popularity</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
              What Our Customers Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingPage;
