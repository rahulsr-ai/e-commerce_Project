//@ts-nocheck


import React from 'react';
import { ShoppingCart, Sparkles, Star } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        />
        {product.trending && (
          <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Sparkles size={12} />
            Trending
          </div>
        )}
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded-full text-xs font-semibold">
            New
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xl font-bold text-indigo-600">${product.price}</p>
          <span className="text-sm text-gray-500">{product.category}</span>
        </div>
        <button className="w-full bg-black hover:bg-indigo-600 text-white py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;