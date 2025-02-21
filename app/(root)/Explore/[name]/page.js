"use client";

import dynamic from "next/dynamic";

import React, { useState, useEffect } from "react";
import { ArrowUp, SlidersHorizontal } from "lucide-react";

import { reviews } from "@/app/data/review";
import {
  fetchCategories,
  getProducts,
  getExploreProducts,
} from "@/lib/apiCalls";
import ProductCard from "@/app/components/useComponents/ProductCard";
import DealsHeroSection from "@/app/components/useComponents/DealsHeroSection";
import Loader from "@/app/components/useComponents/Loader";
import { useParams } from "next/navigation";

const slides = [
  {
    title: "Premium Electronics Collection",
    description: "Discover cutting-edge technology and innovative gadgets",
    image: "/CategoryHeroSection/electronic01.avif",
    buttonText: "Shop Electronics",
    buttonUrl: "/category/electronic",
  },
  {
    title: "Luxury Fashion & Accessories",
    description: "Elevate your style with premium fashion pieces",
    image: "/CategoryHeroSection/fashion.avif",
    buttonText: "Explore Fashion",
    buttonUrl: "/category/fashion",
  },
  {
    title: "Home & Living Essentials",
    description: "Transform your space with carpets, posters, lights & more",
    image: "/CategoryHeroSection/home02.jpg",
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
  const { name } = useParams();
  // alert(name);

  const [unfilteredProducts, setUnfilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("All");
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [Products, setProducts] = useState([]);
  const [whislist, setWhislist] = useState([]);
  const [category, setCategory] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const DisplayByCategory = (id) => {
    alert(id);
    const filteredProductsByCategory = unfilteredProducts.filter((product) => {
      if (id === "All") {
        return true;
      } else {
        return product.category === id;
      }
    });

    setProducts(filteredProductsByCategory);
  };

  const sortProductsByPrice = (price) => {
    setSortBy(price);

    const sortedProducts = [...Products].sort((a, b) => {
      if (price !== "Low to High") {
        return b.price - a.price; // Sort descending
      } else if (price !== "High to Low") {
        return a.price - b.price; // Sort ascending
      } else {
        return 0; // No sorting
      }
    });

    console.log(sortedProducts);
    setProducts(sortedProducts);
  };

  const scrollToFilter = () => {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) {
      const yOffset =
        filterSection.getBoundingClientRect().top + window.scrollY - 50; // 50px padding
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {

    const fetchDataForPage = async () => {
      const { category } = await fetchCategories();
      setCategory(category);

      const products = await getExploreProducts(name);
      console.log("products", products?.products);

      if (products?.products) {
        setUnfilteredProducts(products?.products);
        setProducts(products?.products);
        return;
      }


    };

    fetchDataForPage();


    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-1">
      <div className="min-h-screen bg-zinc-950 text-white">
        {/* Hero Section */}
        <DealsHeroSection
          slides={slides}
          activeSlide={activeSlide}
          setActiveSlide={setActiveSlide}
        />

        {/* Filters Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <div id="filter-section" className="flex items-center gap-2">
              <SlidersHorizontal size={24} className="text-white" />

              <select
                value={selectedCategory}
                onChange={(e) => {
                  DisplayByCategory(e.target.value);
                  setSelectedCategory(e.target.value);
                }}
                className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 text-black"
              >
                <option value="All" disabled>
                  All
                </option>
                {category.map((category, i) => (
                  <option key={i} value={category._id}>
                    {category.name.charAt(0).toUpperCase() +
                      category.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {["All", "Low to High", "High to Low"].map((price) => (
                  <button
                    key={price}
                    onClick={() => sortProductsByPrice(price)}
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
          {Products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {Products.map((product) => (
                <ProductCard
                  whislist={whislist}
                  setWhislist={setWhislist}
                  key={product._id}
                  imageUrl={product.images[0]}
                  category={product.category}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  id={product._id}
                  slug={product.slug}
                />
              ))}
              {isVisible && (
                <button
                  onClick={scrollToFilter}
                  className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
                >
                  <ArrowUp className="w-6 h-6" />
                </button>
              )}
            </div>
          ) : (
            <Loader />
          )}

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-violet-600 mb-8 text-center">
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
