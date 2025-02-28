"use client";

import React, { useEffect, useState } from "react";
import { Heart, Trash2, ShoppingCart, IndianRupee } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import { handleAddToCart, HandleWishlist } from "@/lib/apiCalls";

const Wishlist = ({ productsData, setproductsData }) => {
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [render, setRender] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axios.get("/api/wishlist/get");
        console.log(data?.wishlist);

        const wishlistItems = productsData?.products?.filter((item) =>
          data?.wishlist.includes(item._id)
        );

        setWishlistProducts(wishlistItems); // ✅ Single state update, better performance
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }

      setRender(true);
    };

    fetchWishlist();
  }, [render, productsData]);

  const AddToCart = async (item) => {
    console.log(`Added to cart: ${item._id}`);
    const response = await handleAddToCart(item._id);
    console.log(response);
    handleRemoveFromWishlist(item._id);
  };

  const handleRemoveFromWishlist = async (id) => {
    try {
      await HandleWishlist(id); // remove from the database

      let updatedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      console.log("updatedWishlist", updatedWishlist);

      if (updatedWishlist.includes(id)) {
        let newWishlist = updatedWishlist.filter((itemId) => itemId !== id);
        localStorage.setItem("wishlist", JSON.stringify(newWishlist));
      }

      // Update the state to remove the item from the wishlist
      setWishlistProducts((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-white">My Wishlist</h2>
        <div className="flex flex-col items-center justify-center bg-neutral-950 rounded-lg p-8 border-2 border-gray-700">
          <Heart className="w-16 h-16 text-rose-500 mb-4" />
          <p className="text-gray-400 text-lg">Your wishlist is empty</p>
          {/* <p className="text-gray-500 mt-2">Add items that you like to your wishlist</p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-white">My Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((item) => (
          <div
            key={item._id}
            className="bg-neutral-900 rounded-lg overflow-hidden border border-gray-700 hover:border-violet-500 transition-all duration-300"
          >
            <div className="relative h-48 w-full">
              <Image
                src={item.images[0]}
                alt={item.name}
                fill
                className="object-cover"
              />
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="absolute top-2 right-2 p-2 bg-gray-900/50 rounded-full hover:bg-red-500/50 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">
                  {item.name}
                </h3>
                <span className="text-violet-400 font-bold">
                  <IndianRupee className=" inline size-5 text-violet-600" />
                  {item.price}
                </span>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {item.description}
              </p>

              <button
                onClick={() => AddToCart(item)}
                className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
