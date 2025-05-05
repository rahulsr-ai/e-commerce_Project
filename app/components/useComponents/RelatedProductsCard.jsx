"use client";

import { HandleWishlist } from "@/lib/apiCalls";
import { Eye, Heart, IndianRupee } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const RelatedProductsCard = ({
  name,
  description,
  price,
  image,
  slug,
  id,
  wishlist,
  handleWishlist,
}) => {
  return (
    <div className="group relative bg-neutral-900 p-4 rounded-lg shadow-lg ">
      {/* Product Image */}
      <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-white relative">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist & View Buttons (Hidden by default, appear on hover) */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--background-color)]/50">
          <button
            onClick={() => {
              handleWishlist(id);
            }}
            className={`p-2 rounded-full hover:bg-rose-500  transition-colors
               ${wishlist.includes(id) ? "bg-rose-600 " : "bg-white"}`}
          >
            <Heart
              className={`w-5 h-5 hover:text-[var(--primary-text-color)]  text-violet-600
                ${wishlist.includes(id) && " text-[var(--primary-text-color)] "}`}
            />
          </button>
          <Link href={`/Product/${slug}`}>
            <button
              className={`p-2 bg-white rounded-full hover:bg-violet-700  transition-colors
            
            `}
            >
              <Eye className={`w-5 h-5 text-violet-600  hover:text-[var(--primary-text-color)]  `} />
            </button>
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <h3 className="font-medium text-violet-400 mb-2"> {name} </h3>
      <p className="text-gray-200-400 line-clamp-3 text-sm">{description}</p>
      <p className="text-[var(--primary-text-color)] mt-3 font-bold text-lg">
        {" "}
        <IndianRupee className="inline size-4" /> {price}{" "}
      </p>
    </div>
  );
};

export default RelatedProductsCard;
