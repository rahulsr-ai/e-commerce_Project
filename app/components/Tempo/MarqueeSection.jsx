import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";



const MarqueeSection = ({
  title,
  emoji,
  products=[],
  variant,
  speed = 30,
}) => {
  const getBadgeColor = () => {
    switch (variant) {
      case "best-sellers":
        return "bg-[#8B5CF6] hover:bg-[#7C3AED]";
      case "limited-edition":
        return "bg-[#DC2626] hover:bg-[#B91C1C]";
      case "new-arrivals":
        return "bg-[#059669] hover:bg-[#047857]";
      case "deals":
        return "bg-[#D97706] hover:bg-[#B45309]";
      default:
        return "bg-[#8B5CF6] hover:bg-[#7C3AED]";
    }
  };

  return (
    <div className="w-full bg-[#1A1A1A] overflow-hidden py-8 relative">
      <div className="flex items-center justify-between px-6 mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
          <span>{emoji}</span>
          {title}
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className={`inline-flex items-center gap-2 px-6 py-2 rounded-full ${getBadgeColor()} text-white text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-[#8B5CF6]/50`}
        >
         SHopNow
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      <div className="flex overflow-hidden">
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
              className="flex-none w-[280px] group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
                <div
                  className={`absolute top-2 right-2 ${getBadgeColor()} px-3 py-1 rounded-full text-xs font-medium text-white`}
                >
                  {variant === "limited-edition" && product.stock
                    ? `Only ${product.stock} left`
                    : variant === "deals" && product.discount
                      ? product.discount
                      : variant === "new-arrivals" && product.isNew
                        ? "New Arrival"
                        : "Best Seller"}
                </div>
              </div>
              <h3 className="text-white font-medium truncate">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#8B5CF6] font-semibold">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through text-sm">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
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

export default MarqueeSection;
