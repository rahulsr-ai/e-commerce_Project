//@ts-nocheck

import React, { useState } from "react";
import { Eye, Heart, ShoppingCart } from "lucide-react";

export function ProductCard({ image, name, price, discount, id }) {
  const [wishlist, setwishlist] = useState([]);

  const handleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setwishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setwishlist([...wishlist, id]);
    }

    console.log(wishlist);
  };

  return (
    <div
      className="group relative 
    bg-zinc-900 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/20"
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button
            className={`p-2 rounded-full text-white hover:text-[#ffcb6a] transition-colors
           ${wishlist.includes(id) ? "bg-rose-500" : "bg-neutral-900"}  `}
            onClick={() => {
              handleWishlist(id);
            }}
          >
            <Heart size={20} color={"white"} />
          </button>
        </div>
      </div>
      {discount && (
        <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Save {discount}%
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
          {name}
        </h3>
        <div className="flex flex-col gap-3  justify-between ">
          <p className="text-xl font-bold text-indigo-400">
            ${price?.toFixed(2)}
          </p>

          <div className="flex items-center justify-between gap-x-3">
            <button className="flex gap-3 items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors w-full">
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Eye size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
