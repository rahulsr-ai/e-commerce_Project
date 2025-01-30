import React from "react";
import { motion } from "framer-motion";

const defaultProducts = [
  {
    id: 1,
    name: "Premium Leather Jacket",
    price: "$299",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300",
    category: "Outerwear",
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: "$199",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=300",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Luxury Watch",
    price: "$499",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=300",
    category: "Watches",
  },
  {
    id: 4,
    name: "Designer Sunglasses",
    price: "$159",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=300",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Premium Sneakers",
    price: "$249",
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=300",
    category: "Footwear",
  },
];

const ProductMarquee = ({ products = defaultProducts, speed = 30 }) => {
  return (
    <div className="w-full bg-[#1A1A1A] overflow-hidden py-8 relative">
      <h2 className="text-2xl font-bold text-white text-center mb-6">
        Best Sellers
      </h2>
      <div className="flex">
        <motion.div
          className="flex space-x-6 px-4"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...products, ...products].map((product, index) => (
            <div
              key={`${product.id}-${index}`}
              className="flex-none w-[250px] group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <h1 className="absolute top-2 right-2 bg-[#8B5CF6] hover:bg-[#7C3AED]">
                  Best Seller
                </h1>
              </div>
              <h3 className="text-white font-medium truncate">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <span className="text-[#8B5CF6] font-semibold">
                  {product.price}
                </span>
                <span className="text-gray-400 text-sm">
                  {product.category}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductMarquee;
