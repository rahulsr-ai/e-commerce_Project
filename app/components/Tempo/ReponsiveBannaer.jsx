import React from "react";
import { motion } from "framer-motion";



const ResponsiveBanner = ({
  title = "Special Offer",
  description = "Get 20% off on all premium items. Limited time offer!",
  backgroundImage = "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[200px] overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-[#8B5CF6] opacity-90" />
      </div>

      {/* Content container */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="space-y-4 max-w-2xl">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base lg:text-lg text-gray-200"
          >
            {description}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-3 bg-[#8B5CF6] text-white rounded-lg font-medium
            shadow-lg hover:shadow-[#8B5CF6]/50 transition-all duration-300"
        >
          Shop Now
        </motion.button>
      </div>

      {/* Mobile CTA Button */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-4 left-4 right-4 md:hidden px-6 py-3 bg-[#8B5CF6] 
          text-white rounded-lg font-medium shadow-lg hover:shadow-[#8B5CF6]/50 
          transition-all duration-300 text-center"
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

export default ResponsiveBanner;
