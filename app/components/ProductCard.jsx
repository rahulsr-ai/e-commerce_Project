//@ts-nocheck

import React from 'react';
import { Eye } from 'lucide-react';



export function ProductCard({ image, name, price, discount }) {
  return (
    <div className="group relative bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20">
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      {discount && (
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Save {discount}%
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-indigo-400">${price.toFixed(2)}</p>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
            <Eye size={18} />
            <span>View</span>
          </button>
        </div>
      </div>
    </div>
  );
}