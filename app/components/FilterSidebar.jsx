//@ts-nocheck


import React from 'react';

const CATEGORIES = ['Mobile Phones', 'Headphones', 'Laptops'];
const PRICE_RANGES = [
  { id: 'below-100', label: 'Below $100' },
  { id: '100-200', label: '$100 - $200' },
  { id: '200-500', label: '$200 - $500' },
  { id: 'above-500', label: 'Above $500' },
];

export function FilterSidebar({ filters, setFilters, clearFilters, productCount }) {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          Clear all
        </button>
      </div>

      <div className="h-px bg-zinc-800" />

      <div>
        <h3 className="text-sm font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {CATEGORIES.map(category => (
            <label key={category} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.category.includes(category)}
                onChange={() => handleCategoryChange(category)}
                className="w-4 h-4 rounded border-zinc-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900"
              />
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      <div>
        <h3 className="text-sm font-medium mb-4">Price Range</h3>
        <div className="space-y-2">
          {PRICE_RANGES.map(range => (
            <label key={range.id} className="flex items-center gap-2">
              <input
                type="radio"
                name="price-range"
                checked={filters.priceRange === range.id}
                onChange={() => handlePriceRangeChange(range.id)}
                className="w-4 h-4 border-zinc-600 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-zinc-900"
              />
              <span className="text-sm">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px bg-zinc-800" />

      <div className="text-sm text-zinc-400">
        Showing {productCount} {productCount === 1 ? 'product' : 'products'}
      </div>
    </div>
  );
}
