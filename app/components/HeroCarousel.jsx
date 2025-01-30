"use client";
import React, { useState, useEffect } from "react";

const slides = [
  {
    title: "Premium Electronics Collection",
    description: "Discover cutting-edge technology and innovative gadgets",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80",
    buttonText: "Shop Electronics",
  },
  {
    title: "Luxury Fashion & Accessories",
    description: "Elevate your style with premium fashion pieces",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80",
    buttonText: "Explore Fashion",
  },
  {
    title: "Premium Audio Experience",
    description: "Immerse yourself in superior sound quality",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=1600&q=80",
    buttonText: "View Collection",
  },
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-4xl mx-auto px-4">
              <h1
                className="text-4xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-1000 ease-out"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(20px)",
                }}
              >
                {slide.title}
              </h1>
              <p
                className="text-xl text-gray-200 mb-8 transform transition-all duration-1000 delay-200 ease-out"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(20px)",
                }}
              >
                {slide.description}
              </p>
              <button
                className="bg-violet-600 text-white px-8 py-3 rounded-full hover:bg-violet-700 transition-all duration-300 transform"
                style={{
                  opacity: currentSlide === index ? 1 : 0,
                  transform:
                    currentSlide === index
                      ? "translateY(0)"
                      : "translateY(20px)",
                }}
              >
                {slide.buttonText}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-violet-600 w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
