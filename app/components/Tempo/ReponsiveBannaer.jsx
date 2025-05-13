import React from "react";
import { motion } from "framer-motion";

const ResponsiveBanner = ({
  title = "Special Offer",
  description = "Get 20% off on all premium items. Limited time offer!",
  backgroundImage = "/",
}) => {
  function scrollWindow() {
    window.scrollTo({ top: 1400,  behavior: "smooth" });
  }
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
        <div className="absolute inset-0 bg-white dark:bg-gradient-to-r dark:from-[#0A0A0A] dark:to-[#8B5CF6] opacity-90" />
      </div>

      {/* Content container */}
      <div className="relative bottom-7 h-full max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="space-y-4 max-w-2xl">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold dark:text-[var(--primary-text-color)]"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm md:text-base lg:text-lg dark:text-gray-200 text-gray-700"
          >
            {description}
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollWindow}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block px-6 py-3 bg-[#8B5CF6] dark:text-[var(--primary-text-color)] rounded-lg font-medium
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
        className="absolute bottom-4 left-4 right-4 md:hidden px-6 py-3  bg-[#8B5CF6]
          text-[var(--primary-text-color)]  rounded-lg font-medium shadow-lg hover:shadow-[#8B5CF6]/50 
          transition-all duration-300 text-center"
      >
        Shop Now
      </motion.button>
    </motion.div>
  );
};

export default ResponsiveBanner;
