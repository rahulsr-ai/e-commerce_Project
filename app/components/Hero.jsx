//@ts-nocheck
"use client"
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=2070&q=80",
    title: "Elevate Your Style",
    subtitle: "Summer Collection 2024",
    description: "Discover curated pieces that define modern elegance",
    cta: "Shop Collection",
    position: "center"
  },
  {
    image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=2070&q=80",
    title: "Tech Innovation",
    subtitle: "Premium Electronics",
    description: "Experience the future of technology today",
    cta: "Explore Gadgets",
    position: "right"
  },
  {
    image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=1999&q=80",
    title: "Timeless Luxury",
    subtitle: "Exclusive Watches",
    description: "Precision crafted timepieces for the discerning collector",
    cta: "View Collection",
    position: "left"
  }
];

const Hero = () => {
    const [loading, setloading] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setloading(true)
    const timer = setInterval(() => {
      nextSlide();
    }, 6000); // Slightly longer duration for better readability

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index) => {
    if (isTransitioning || currentSlide === index) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return ( loading &&
    <div className="relative h-[85vh] mt-16 overflow-hidden  bg-gray-900">
      {/* Slides */}
      <div className="relative h-full ">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0 ">
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className={`w-full h-full object-cover object-${slide.position} transform scale-105`}
              />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="text-center max-w-3xl mx-auto">
                  <div className={`space-y-6 ${
                    currentSlide === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                    } transition-all duration-1000 delay-300`}
                  >
                    {/* Subtitle with line */}
                    <div className="flex items-center justify-center space-x-4">
                      <div className="w-8 h-[1px] bg-white/60" />
                      <span className="text-white/90 uppercase tracking-wider text-sm">
                        {slide.subtitle}
                      </span>
                      <div className="w-8 h-[1px] bg-white/60" />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
                      {slide.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                      {slide.description}
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                      <button className="group relative inline-flex items-center justify-center bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-indigo-50 transition-all duration-300 overflow-hidden">
                        <span className="relative flex items-center">
                          {slide.cta}
                          <ShoppingBag className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4 sm:px-6 lg:px-8 z-30">
        <button
          onClick={prevSlide}
          className="group p-2 rounded-full bg-black/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none"
          disabled={isTransitioning}
        >
          <ChevronLeft className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
        </button>
        <button
          onClick={nextSlide}
          className="group p-2 rounded-full bg-black/30 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 focus:outline-none"
          disabled={isTransitioning}
        >
          <ChevronRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
        </button>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div className="flex items-center space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              disabled={isTransitioning}
            >
              <span className="sr-only">Go to slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;