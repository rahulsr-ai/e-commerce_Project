//@ts-nocheck
"use client";


import React, { useState } from 'react';
import { Filter as FilterIcon, X } from 'lucide-react';

const CATEGORIES = ['Mobile Phones', 'Headphones', 'Laptops'];
const PRICE_RANGES = [
  { id: 'below-100', label: 'Below $100' },
  { id: '100-200', label: '$100 - $200' },
  { id: '200-500', label: '$200 - $500' },
  { id: 'above-500', label: 'Above $500' },
];

export function Filter({ filters, setFilters, clearFilters, productCount }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const hasActiveFilters = filters.category.length > 0 || filters.priceRange !== null;

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange === range ? null : range
    }));
  };

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${hasActiveFilters 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25' 
            : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
        >
          <FilterIcon size={20} className={hasActiveFilters ? 'animate-pulse' : ''} />
          <span>Filters</span>
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <X size={20} />
            <span>Clear</span>
          </button>
        )}
        <div className="ml-auto text-sm text-zinc-400">
          Showing {productCount} {productCount === 1 ? 'product' : 'products'}
        </div>
      </div>

      {/* Filter Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-xl shadow-xl w-full max-w-lg">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Filters</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4">Categories</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {CATEGORIES.map(category => (
                      <label
                        key={category}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${filters.category.includes(category)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                      >
                        <input
                          type="checkbox"
                          checked={filters.category.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="sr-only"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-zinc-800" />

                <div>
                  <h3 className="text-sm font-medium mb-4">Price Range</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {PRICE_RANGES.map(range => (
                      <label
                        key={range.id}
                        className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${filters.priceRange === range.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'}`}
                      >
                        <input
                          type="radio"
                          name="price-range"
                          checked={filters.priceRange === range.id}
                          onChange={() => handlePriceRangeChange(range.id)}
                          className="sr-only"
                        />
                        <span className="text-sm">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      clearFilters();
                      setIsModalOpen(false);
                    }}
                    className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
