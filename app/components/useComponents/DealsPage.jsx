import { Eye, Heart, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const DealsProductCard = ({
  imageUrl,
  category,
  title,
  description,
  price,
  id,
  slug,
  
}) => {
  return (
    <div className="group bg-neutral-900 rounded-lg overflow-hidden ">
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 space-y-2">
          <button
            onClick={() => {
              handleWishlist(product);
            }}
            className={`bg-neutral-900 p-2 rounded-full text-white hover:text-[#ffcb6a] transition-colors
                       ${
                         wishlist.includes(product)
                           ? "bg-rose-500"
                           : "bg-neutral-900"
                       }
                      `}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      <div className="py-2 px-2 flex flex-col justify-between">
        <div className="text-sm text-gray-400 mb-1">{category}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <h3 className="text-lg font-semibold text-white mb-2">{description}</h3>
        <p className="text-violet-400 font-medium mb-4">{price}</p>
        <div className="flex space-x-2  ">
          <button className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
            <ShoppingCart size={20} className="inline mr-2" />
            Add to Cart
          </button>
          <button className="bg-[#621c9c] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
            <Eye size={20} className="inline" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealsProductCard;
