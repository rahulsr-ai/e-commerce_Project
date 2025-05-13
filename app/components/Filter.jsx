//@ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { Filter as FilterIcon, X } from "lucide-react";
import { fetchSubCategories } from "@/lib/apiCalls";
import axios from "axios";

const PRICE_RANGES = [
  { id: "below-100", label: "Below $100" },
  { id: "100-200", label: "$100 - $200" },
  { id: "200-500", label: "$200 - $500" },
  { id: "above-500", label: "Above $500" },
];

export function Filter({
  filters,
  setFilters,
  clearFilters,
  productCount,
  Product,
  setProduct,
  categoryID,
  ApplyFilter,
  sethasActiveFilters,
  hasActiveFilters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [SubCategory, setSubcategory] = useState([]);

  useEffect(() => {
    const GetSubCategories = async () => {
      try {
        const { data } = await axios.get(
          `/api/category/subcategory/One?id=${categoryID}`
        );
        console.log("data is ================>");
        console.log(data?.fetchSubcategory);
        setSubcategory(data?.fetchSubcategory);
      } catch (error) {
        console.error("Error fetching SubCategories:", error);
        return null;
      }
    };
    GetSubCategories();
  }, [categoryID]);

  console.log(filters);

  return (
    <div className=" py-2 flex items-center  md:flex-row flex-col mx-auto md:px-12 ">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 
        ${
          hasActiveFilters
            ? "bg-[var(--primary-color)] text-[var(--primary-text-color)] shadow-lg shadow-[var(--primary-color)]"
            : "dark:bg-[var(--background-color)] dark:text-gray-300 bg-gray-300 text-black hover:bg-[var(--background-color)]"
        }`}
          >
            <FilterIcon
              size={20}
              className={hasActiveFilters ? "animate-pulse" : ""}
            />
            <span>Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={() => {
                clearFilters();
                sethasActiveFilters(false);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-black dark:bg-[var(--background-color)]
               dark:text-gray-300 rounded-lg hover:bg-[var(--background-color)]-700 transition-colors"
            >
              <X size={20} />
              <span>Clear</span>
            </button>
          )}
        </div>

        <div className="text-sm text-gray-400 md:ml-auto ">
          Showing {productCount} {productCount === 1 ? "product" : "products"}
        </div>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0  z-50 flex items-center justify-center p-4">
          <div className="dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-lg bg-neutral-100">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-black dark:text-white">Filters</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-[var(--background-color)] rounded-lg transition-colors text-black dark:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4 text-black dark:text-white">Categories</h3>
                  {SubCategory.length > 0 && (
                    <div className="grid grid-cols-2 gap-3">
                      {SubCategory.map((category) => (
                        <label
                          onClick={() =>
                            setFilters({ ...filters, category: category._id })
                          }
                          key={category._id}
                          className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors 
                          ${
                            filters.category === category._id
                              ? "bg-[var(--primary-color)] text-[var(--primary-text-color)]"
                              : "bg-[var(--background-color)] bg-stone-100 text-black hover:bg-[var(--background-color)]"
                          }`}
                        >
                          {/* <input type="checkbox" className="sr-only" /> */}
                          <span className="text-sm">
                            {category?.name?.charAt(0).toUpperCase() +
                              category?.name?.slice(1)}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="h-px dark:bg-[var(--background-color)] bg-neutral-50" />

                <div className="text-center">
                  <h3 className="text-sm font-medium mb-4 dark:text-white text-black">Price Range</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <input
                      type="number"
                      min="10"
                      max="1000"
                      step="10"
                      value={filters.minPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          minPrice: Number(e.target.value),
                        })
                      }
                      className="border rounded px-2 py-1 w-24 text-center text-black"
                      placeholder="Min Price"
                    />
                    <span className="text-sm text-gray-200-300">to</span>
                    <input
                      type="number"
                      min={filters.minPrice}
                      max="1000"
                      step="10"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          maxPrice: Number(e.target.value),
                        })
                      }
                      className="border rounded px-2 py-1 w-24 text-center text-black"
                      placeholder="Max Price"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    sethasActiveFilters(true);
                    ApplyFilter();
                  }}
                  className="flex-1 px-4 py-2 bg-[var(--primary-color)] text-[var(--primary-text-color)] rounded-lg hover:bg-[var(--primary-color)] transition-colors"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      sethasActiveFilters(false);
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-neutral-50 text-black dark:bg-[var(--background-color)] dark:text-gray-300 rounded-lg hover:bg-[var(--background-color)]-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
