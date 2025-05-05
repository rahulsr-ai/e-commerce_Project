"use client";

import ProductCard from "@/app/components/useComponents/ProductCard";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { handleSearchProduct } from "@/lib/apiCalls";
import { ArrowUp } from "lucide-react";
import NewFooter from "@/app/components/NewFooter";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [Products, setProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [whislist, setWhislist] = useState([]);
  const [sortBy, setSortBy] = useState("All");

  const scrollToFilter = () => {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) {
      const yOffset =
        filterSection.getBoundingClientRect().top + window.scrollY - 50;
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await handleSearchProduct(searchQuery);
        console.log("API Response:", response);
        setProducts(response?.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [searchQuery]);

  const sortProductsByPrice = (price) => {
    setSortBy(price);
    let sortedProducts = [...Products];

    if (price === "Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (price === "High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen mt-1 bg-[var(--background-color)]-950 text-[var(--primary-text-color)] overflow-x-hidden">
      <div className="relative h-[400px] bg-gradient-to-r from-zinc-900 to-indigo-900 pt-12 md:pt-0 overflow-hidden w-full">
        <Image
          width={1920}
          height={1080}
          src="/others/shopingMall.jpg"
          alt="hero-section image"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
          <h1 className="text-5xl font-bold mb-4">🛍️ Elevate Your Shopping Experience</h1>
          <p className="text-xl text-gray-200-300 max-w-2xl">
            Discover the latest trends, exclusive deals, and top-quality products—all in one place. Shop with confidence and style, anytime, anywhere! 🚀
          </p>
        </div>
      </div>

      <div className="min-h-screen px-4 md:px-8 ">
        <div id="filter-section" className="flex items-center gap-4 mb-8 justify-center mt-8">
          {['All', 'Low to High', 'High to Low'].map((price) => (
            <button
             aria-label="Sort by price"
              key={price}
              onClick={() => sortProductsByPrice(price)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                sortBy === price ? "bg-[var(--primary-color)] text-[var(--primary-text-color)]" : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {price}
            </button>
          ))}
        </div>

        <div className="min-h-screen">
          {Products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
              {Products.map((product, i) => (
                <div key={i} className="w-full max-w-sm mx-auto">
                  <ProductCard
                    whislist={whislist}
                    setWhislist={setWhislist}
                    id={product._id}
                    slug={product.slug}
                    imageUrl={product.images?.[0] || "/default-image.jpg"}
                    title={product.name}
                    category={product.category}
                    description={product.description}
                    price={product.price}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <h2 className="text-2xl font-semibold mt-4">No Products Found</h2>
              <p className="text-gray-200-400 mt-2">Search something else to find more products.</p>
            </div>
          )}

          {isVisible && (
            <button
             aria-label="Scroll to filter"
              onClick={scrollToFilter}
              className="fixed bottom-6 right-6 bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-[var(--primary-text-color)] p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
      <NewFooter />
    </div>
  );
};

export default SearchPage;
