"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const CustomizeModel = ({ isOpen, setisOpen, shippingAddress }) => {
  const [mounted, setMounted] = useState(false);

  console.log(shippingAddress);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative backdrop-blur-md border border-zinc-700 shadow-xl rounded-xl p-6 w-full max-w-md"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {/* Close Button */}
        <button
          className="absolute -top-4 -right-4 bg-[var(--background-color)]-800 p-2 rounded-full shadow-lg hover:bg-red-600 transition"
          onClick={() => setisOpen(false)}
        >
          <X className="w-5 h-5 text-[var(--primary-text-color)]" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-[var(--primary-text-color)] text-center mb-4">
          Setup Address
        </h3>

        {/* Address Box */}
        <div className="p-5 bg-[var(--background-color)]-800 rounded-lg shadow-lg border border-zinc-700 space-y-4">
          <div className="text-[var(--primary-text-color)] font-semibold text-lg">
            COUNTRY: <span className="text-violet-400">{shippingAddress?.country}</span>
          </div>
          <div className="text-[var(--primary-text-color)]">
            STREET: <span className="text-gray-200-400">{shippingAddress?.street}</span>
          </div>
          <div className="text-[var(--primary-text-color)]">
            CITY: <span className="text-gray-200-400">{shippingAddress?.city}</span>
          </div>
          <div className="text-[var(--primary-text-color)]">
            STATE: <span className="text-gray-200-400">{shippingAddress?.state}</span>
          </div>
          <div className="text-[var(--primary-text-color)]">
            POSTAL CODE: <span className="text-gray-200-400">{shippingAddress?.postalCode}</span>
          </div>
        </div>

        {/* Close Button */}
      
      </motion.div>
    </motion.div>
  );
};

export default CustomizeModel;
