import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const CATEGORIES = ['Mobile Phones', 'Headphones', 'Laptops'];
const PRICE_RANGES = [
  { id: 'below-100', label: 'Below $100' },
  { id: '100-200', label: '$100 - $200' },
  { id: '200-500', label: '$200 - $500' },
  { id: 'above-500', label: 'Above $500' },
];

export function ProductGrid() {
  const [expandedFilters, setExpandedFilters] = useState({});

  const toggleFilter = (filter) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <div className="flex">
      <div className="sticky top-0 h-screen p-4 bg-zinc-900 w-1/4">
        <h2 className="text-lg font-semibold text-white mb-4">Filters</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFilter('price')}>
              <h3 className="text-sm font-medium text-white">Price</h3>
              {expandedFilters.price ? <Minus size={16} color="white" /> : <Plus size={16} color="white" />}
            </div>
            {expandedFilters.price && (
              <div className="ml-4 mt-2 space-y-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range.id} className="flex items-center gap-2 text-zinc-300">
                    <input type="checkbox" className="text-indigo-600" />
                    {range.label}
                  </label>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleFilter('category')}>
              <h3 className="text-sm font-medium text-white">Categories</h3>
              {expandedFilters.category ? <Minus size={16} color="white" /> : <Plus size={16} color="white" />}
            </div>
            {expandedFilters.category && (
              <div className="ml-4 mt-2 space-y-2">
                {CATEGORIES.map((category) => (
                  <label key={category} className="flex items-center gap-2 text-zinc-300">
                    <input type="checkbox" className="text-indigo-600" />
                    {category}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        
        {/* Product cards will be rendered here */}
      </div>
    </div>
  );
}
