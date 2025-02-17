import React from "react";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ imageUrl, category, title, description, price , id, slug}) => {
  const setCategoryName = (id) => {
    switch (id) {
      case "67af39a6666823df372a6770":
        return "Electronics";
        break;
      case "67af977892a804bf6b80be63":
        return "accessories";
        break;
      case "67af3956666823df372a6764":
        return "Footwear";
        break;

      case "67af9c0a92a804bf6b80bea2":
        return "Fashion";
        break;

      case "67af3989666823df372a676a":
        return "Home";
        break;

      default:
        "Unknown";
        break;
    }
  };

  return (
    <div className="max-w-sm bg-neutral-900 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 w-full">
      <Link href={`/product/${slug}`}>
        <div className="relative">
          <Image
            className="w-full aspect-square object-cover"
            src={imageUrl}
            alt={title}
            width={640} // Set width here
            height={360} // Set height here (16:9 ratio)
          />
          <button
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors duration-200" />
          </button>
        </div>

        <div className="p-5 ">
          <span className="text-sm text-violet-500 font-medium uppercase tracking-wide">
            {setCategoryName(category)}
          </span>

          <h3 className="mt-2 text-xl font-semibold text-stone-200">{title}</h3>

          <p className="mt-2 text-gray-400 text-sm line-clamp-2">
            {description}
          </p>

          <div className="mt-4 mb-2 text-2xl font-bold text-gray-200">
            $ {price}
          </div>

          <div className="mt-4 flex gap-2">
            <button
              className="flex-1 bg-violet-600 text-white px-4 py-2 rounded-lg 
          font-medium hover:bg-violet-00 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-violet-400 hover:bg-gray-50
          hover:text-black transition-colors duration-200 flex items-center justify-center"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
