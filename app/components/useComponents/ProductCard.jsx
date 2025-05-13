"use client";

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Eye, IndianRupee, RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HandleWishlist } from "@/lib/apiCalls";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

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
  isOnDeal,
}) => {
  const router = useRouter();
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

  const [cartloading, setCartloading] = useState(false);

  // Load wishlist from LocalStorage when the component mounts
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWhislist(storedWishlist);
  }, []);

  const AddToCart = async () => {
    setCartloading(true);
    try {
      const Logincode = localStorage.getItem("code");

      if (!Logincode || Logincode !== "0001") {
        toast.loading("Log in to continue shopping", { duration: 1000 });
        router.push("/sign-in");
        return;
      }
      const data = await axios.post(`/api/cart/add`, {
        id,
      });
      toast.success("Product added to cart");
    } catch (error) {
      console.log("frontend error while adding to cart", error);
      return null;
    }

    setCartloading(false);
  };

  const handleWishlist = async (id) => {
    const Logincode = localStorage.getItem("code");

    if (!Logincode || Logincode !== "0001") {
      toast.loading("Log in to continue shopping", { duration: 1000 });
      router.push("/sign-in");
      return;
    }

    const response = await HandleWishlist(id);

    let updatedWishlist;
    if (whislist.includes(id)) {
      toast.error("Product removed from wishlist", { duration: 1000 });
      updatedWishlist = whislist.filter((itemId) => itemId !== id);
    } else {
      toast.success("Product added to wishlist", { duration: 1000 });
      updatedWishlist = [...whislist, id];
    }
    setWhislist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); // Save to LocalStorage
  };

  if (!(imageUrl || title || description || category || price || id || slug)) {
    <div className="flex py-24  justify-center ">
      <div className="text-center">
        <h2 className="text-3xl font-bold dark:text-gray-700 text-black">
          No Products Found
        </h2>
        <p className="mt-4 dark:text-[var(--secondary-text-color)] dark:text-gray-300 text-gray-800">
          No products found matching your search criteria.
        </p>
      </div>
    </div>;
  }

  return (
    <div
      className="max-w-sm
      place-content-center
    
    dark:bg-[var(--background-color)] bg-neutral-100 border dark:border-gray-700 rounded-lg shadow-lg hover:shadow-[inset_0_0_20px_rgba(139,92,246,0.5)] 
    overflow-hidden transition-transform duration-300 hover:-translate-y-1 w-full"
    >
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
              whislist?.includes(id) ? "text-red-500" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--secondary-text-color)] font-medium uppercase tracking-wide">
            {setCategoryName(category)}
          </span>
          <span className="text-sm text-gradient-[var(--secondary-text-color)]-[var(--secondary-text-color)] font-medium uppercase tracking-wide"></span>
        </div>

        <h3 className="mt-2 text-xl font-semibold dark:text-white text-black ">
          {title.split(" ").slice(-2).join(" ")}
        </h3>

        <p className="mt-2 text-[var(--fade-subtext-color)] text-sm line-clamp-2">
          {description}
        </p>

        <div className="mt-4 mb-2 font-bold text-white">
          {isOnDeal ? (
            <div className="flex items-center">
              <IndianRupee className="inline text-xs text-[var(--secondary-text-color)]" />
              <span className="text-base uppercase tracking-wide text-[var(--secondary-text-color)] line-through ml-1">
                {price + 200}
              </span>
              <span className="ml-2 text-md uppercase tracking-wide dark:text-gradient-[var(--secondary-text-color)]-[var(--secondary-text-color)]
              ">
                {price}
              </span>
            </div>
          ) : (
            <span className="uppercase text-xl font-medium tracking-wide dark:text-gradient-[var(--secondary-text-color)]-[var(--secondary-text-color)]
            text-black dark:text-white">
              <IndianRupee className="inline text-xs text-[var(--secondary-text-color)]" />
              {price}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            aria-label="Add to cart"
            onClick={() => {
              AddToCart();
            }}
            name="cart-button"
            className="flex-1 bg-[var(--primary-color)] text-[var(--primary-text-color)] font-semibold px-4 py-2 lg:px-2 text-wrap text-sm
             rounded-lg font-medium  transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {cartloading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </>
            )}
          </button>
          <Link aria-label="View product" href={`/Product/${slug}`}>
            <button
              aria-label="View product"
              name="view-button"
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-[var(--secondary-text-color)] hover:bg-gray-50 hover:text-black transition-colors duration-200 flex items-center justify-center"
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
