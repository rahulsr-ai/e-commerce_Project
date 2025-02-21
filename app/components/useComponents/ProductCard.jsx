"use client";

import React, { useEffect } from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Subcategory } from "@/models/CategorySchema";

const ProductCard = ({
  imageUrl,
  category,
  title,
  description,
  price,
  id,
  slug,
  whislist,
  setWhislist,
}) => {
  const setCategoryName = (id) => {
    switch (id) {
      case "67af39a6666823df372a6770":
        return "Electronics";
      case "67af977892a804bf6b80be63":
        return "Accessories";
      case "67af3956666823df372a6764":
        return "Footwear";
      case "67af9c0a92a804bf6b80bea2":
        return "Fashion";
      case "67af3989666823df372a676a":
        return "Home";
      default:
        return "Unknown";
    }
  };


   // Load wishlist from LocalStorage when the component mounts
   useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWhislist(storedWishlist);
  }, []);

  const handleWishlist = (id) => {
    let updatedWishlist;
    if (whislist.includes(id)) {
      updatedWishlist = whislist.filter((itemId) => itemId !== id);
    } else {
      updatedWishlist = [...whislist, id];
    }

    setWhislist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to LocalStorage
  };


  // console.log(whislist);


  if(!(imageUrl || title || description || category || price || id || slug) ) { 
    <div className="flex py-24  justify-center ">
    <div className="text-center">
      <h2 className="text-3xl font-bold text-gray-700">
        No Products Found
      </h2>
      <p className="mt-4 text-violet-600">
        No products found matching your search criteria.
      </p>
    </div>
  </div>
  }

  return (
    <div className="max-w-sm bg-neutral-950 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 w-full">
      <div className="relative">
        <Image
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          src={imageUrl}
          alt={title}
          width={300}
          height={160}
        />
        <button
          name="wishlist-button"
          onClick={() => handleWishlist(id)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
          aria-label="Add to wishlist"
        >
          <Heart
            className={`w-5 h-5 z-40 transition-colors duration-200 ${
              whislist.includes(id) ? "text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <span className="text-sm text-gradient-violet-to-violet-900 font-medium uppercase tracking-wide">
          {setCategoryName(category)}
        </span>

        <h3 className="mt-2 text-xl font-semibold text-stone-200">
          {title.split(" ").slice(-2).join(" ")}
        </h3>

        <p className="mt-2 text-gray-300 text-sm line-clamp-2">{description}</p>

        <div className="mt-4 mb-2 text-2xl font-bold text-gray-200">
          $ {price}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            name="cart-button"
            className="flex-1 bg-violet-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-violet-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
          <Link key={title} href={`/Product/${slug}`} aria-label="View product">
            <button
              name="view-button"
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-violet-400 hover:bg-gray-50 hover:text-black transition-colors duration-200 flex items-center justify-center"
            >
              <Eye className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
