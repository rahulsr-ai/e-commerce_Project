import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const DealsHeroSection = ({ slides, activeSlide, setActiveSlide }) => {

  
  const scrollWindow = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
  };


  return (
    <div className="relative h-[500px] bg-black">
      <div className="absolute inset-0">
        {slides.map((product, index) => (
          <Image
            fill
            priority={true}
            key={index}
            src={product.image}
            alt={`Hero ${index + 1}`}
            className={`w-full h-full object-cover opacity-50 ${
              index === activeSlide ? "block" : "hidden"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-center">
        <div className="max-w-4xl px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            🔥 Trending Now!
          </h1>
          <p className="text-xl text-gray-200 mb-8">
            Discover our most popular products loved by customers
          </p>
          <button
            onClick={scrollWindow}
            className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
        onClick={() =>
          setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      <button
        onClick={() =>
          setActiveSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-2 rounded-full backdrop-blur-sm transition-colors duration-300"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
    </div>
  );
};

export default DealsHeroSection;
