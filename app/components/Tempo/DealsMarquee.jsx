import React from "react";
import { motion } from "framer-motion";



const defaultDeals = [
  { id: 1, text: "🔥 30% OFF ALL JACKETS" },
  { id: 2, text: "⚡ FREE SHIPPING ON ORDERS $50+" },
  { id: 3, text: "🎁 BUY ONE GET ONE FREE" },
  { id: 4, text: "💫 NEW ARRIVALS - SHOP NOW" },
  { id: 5, text: "🌟 EXCLUSIVE MEMBER DEALS" },
];

const DealMarquee = ({
  deals = defaultDeals,
  speed = 20,
}) => {
  return (
    <div className="w-full bg-[#8B5CF6] overflow-hidden py-3 relative">
      <div className="flex">
        <motion.div
          className="flex space-x-8 whitespace-nowrap"
          animate={{
            x: ["-100%", "0%"],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {[...deals, ...deals].map((deal, index) => (
            <span
              key={`${deal.id}-${index}`}
              className="text-white font-medium text-sm md:text-base inline-block"
            >
              {deal.text}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DealMarquee;
