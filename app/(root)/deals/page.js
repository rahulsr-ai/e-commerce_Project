//@ts-nocheck
// wishlist done

"use client";

import dynamic from "next/dynamic";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  Heart,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";

import Image from "next/image";
import { products } from "@/app/data/products";
import { reviews } from "@/app/data/review";

const slides = [
  {
    title: "Premium Electronics Collection",
    description: "Discover cutting-edge technology and innovative gadgets",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80",
    buttonText: "Shop Electronics",
    buttonUrl: "/category/electronic",
  },
  {
    title: "Luxury Fashion & Accessories",
    description: "Elevate your style with premium fashion pieces",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80",
    buttonText: "Explore Fashion",
    buttonUrl: "/category/fashion",
  },
  {
    title: "Home & Living Essentials",
    description: "Transform your space with carpets, posters, lights & more",
    image: "/homeCarousel/HomeCategoryCarpet01.jpg",
    buttonText: "View Collection",
    buttonUrl: "/category/home",
  },
];

const NewFooter = dynamic(() => import("@/app/components/NewFooter"), {
  ssr: false,
});
const ReviewCard = dynamic(() => import("@/app/components/ReviewCard.jsx"), {
  ssr: false,
});

const TrendingPage = () => {
  const [wishlist, setwishlist] = useState([]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("All");

  const [Products, setProducts] = useState(products);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const DisplayByCategory = (name) => {
    setSelectedCategory(name);
    setProducts(
      products.filter((product) => {
        if (name === "All") return true;
        return product.category === name;
      })
    );
    setSortBy("All");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setwishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setwishlist([...wishlist, id]);
    }

    console.table(wishlist);
  };

  const handlePriceSorting = (price) => {
    setSortBy(price);

    const sortedProducts = [...Products].sort((a, b) => {
      if (price === "High to Low") {
        return b.price - a.price; // Sort descending
      } else if (price === "Low to High") {
        return a.price - b.price; // Sort ascending
      } else {
        return 0; // No sorting
      }
    });

    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-1">
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <div className="relative h-[500px] bg-black">
          <div className="absolute inset-0">
            {slides.map((product, index) => (
              <Image
                height={500}
                width={500}
                key={index}
                src={product.image}
                alt={`Hero ${index + 1}`}
                className={`w-full h-full object-cover opacity-50 ${
                  index === activeSlide ? "block" : "hidden"
                }`}
              />
            ))}
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
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
            onClick={() =>
              setActiveSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
              )
            }
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          <button
            onClick={() =>
              setActiveSlide((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
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
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={24} className="text-white" />
              {/* <Filter
                size={24}
                className="text-gray-200 hover:text-indigo-600"
              /> */}
              <select
                value={selectedCategory}
                onChange={(e) => {
                  DisplayByCategory(e.target.value);
                }}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              >
                <option value="Categories" disabled>
                  Categories
                </option>
                {categories.map((category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {["All", "Low to High", "High to Low"].map((price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceSorting(price)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                      sortBy === price
                        ? "bg-violet-600 text-white"
                        : "bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Products.map((product) => (
              <div
                key={product.id}
                className="group bg-neutral-900 rounded-lg overflow-hidden "
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 space-y-2">
                    <button
                      onClick={() => {
                        handleWishlist(product);
                      }}
                      className={`bg-neutral-900 p-2 rounded-full text-white hover:text-[#ffcb6a] transition-colors
                       ${
                         wishlist.includes(product)
                           ? "bg-rose-500"
                           : "bg-neutral-900"
                       }
                      `}
                    >
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
                <div className="py-2 px-2 flex flex-col justify-between">
                  <div className="text-sm text-gray-400 mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-violet-400 font-medium mb-4">
                    {product.price}
                  </p>
                  <div className="flex space-x-2  ">
                    <button className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                      <ShoppingCart size={20} className="inline mr-2" />
                      Add to Cart
                    </button>
                    <button className="bg-[#621c9c] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
                      <Eye size={20} className="inline" />
                    </button>
                  </div>
                </div>
              </div>
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
      <NewFooter />
    </div>
  );
};

export default TrendingPage;
