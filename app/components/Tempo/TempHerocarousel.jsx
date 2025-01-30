import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200",
    title: "Spring Collection",
    description: "Discover our latest arrivals for the season",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1200",
    title: "Summer Essentials",
    description: "Get ready for summer with our curated selection",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200",
    title: "Exclusive Deals",
    description: "Limited time offers on premium brands",
  },
];

const HeroCarousel = ({
  slides = defaultSlides,
  autoPlayInterval = 5000,
  showDots = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [slides.length, autoPlayInterval]);

  return (
    <div className="relative w-full h-[600px] bg-[#0A0A0A] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-[#8B5CF6] opacity-75" />
          </div>

          <div className="relative h-full flex items-center px-6 md:px-12 lg:px-24">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-lg md:text-xl text-gray-200 mb-8"
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Button
                  size="lg"
                  className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full"
                >
                  Shop Now
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {showDots && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className="focus:outline-none"
            >
              <Dot
                className={`w-4 h-4 ${
                  currentSlide === index
                    ? "text-[#8B5CF6]"
                    : "text-white opacity-50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroCarousel;
