"use client";

import { fetchCategories } from "@/lib/apiCalls";
import { SlidersHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";

const MinFilter = ({
  products,
  setproducts,
  UnFilterData,
}) => {
  const [sortBy, setSortBy] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showProducts, setshowProducts] = useState(products);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    setshowProducts(products);
  }, []);

  console.log("products show data ", showProducts);
  console.log("products data ", products);

  const DisplayByCategory = (id) => {
    alert(id);
    const filteredProductsByCategory = UnFilterData.filter((product) => {
      if (id === "All") {
        return true;
      } else {
        return product.category === id;
      }
    });
    setproducts(filteredProductsByCategory);
  };

  const sortProductsByPrice = (price) => {
    setSortBy(price);

    const sortedProducts = [...products].sort((a, b) => {
      if (price !== "Low to High") {
        return b.price - a.price; // Sort descending
      } else if (price !== "High to Low") {
        return a.price - b.price; // Sort ascending
      } else {
        return 0; // No sorting
      }
    });
    setproducts(sortedProducts);
  };

  useEffect(() => {
    const fetchDataForPage = async () => {
      const { category } = await fetchCategories();
      setCategory(category);
    };

    fetchDataForPage();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 ">
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
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
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
    </div>
  );
};

export default MinFilter;
