import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";



const CtaButton = ({
  text = "Shop Now",
  onClick = () => {},
  className = "",
  size = "lg",
  variant = "default",
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    default: "bg-[#8B5CF6] hover:bg-[#7C3AED] text-white",
    outline:
      "border-2 border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6] hover:text-white",
    ghost: "text-[#8B5CF6] hover:bg-[#8B5CF6]/10",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        inline-flex items-center gap-2
        rounded-full font-medium
        shadow-lg hover:shadow-[#8B5CF6]/50
        transition-all duration-300
        ${className}
      `}
    >
      {text}
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  );
};

export default CtaButton;
