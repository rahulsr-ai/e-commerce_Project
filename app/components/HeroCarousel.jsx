"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const slides = [
  {
    title: "Premium Electronics Collection",
    description: "Discover cutting-edge technology and innovative gadgets",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=1600&q=80",
    buttonText: "Shop Electronics",
    buttonUrl: "/category/electronic",
  },
  {
    title: "Luxury Fashion & Accessories",
    description: "Elevate your style with premium fashion pieces",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=80",
    buttonText: "Explore Fashion",
    buttonUrl: "/category/fashion",
  },
  {
    title: "Home & Living Essentials",
    description: "Transform your space with carpets, posters, lights & more",
    image: "/homeCarousel/HomeCategoryCarpet01.jpg",
    buttonText: "View Collection",
    buttonUrl: "/category/home",
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
    <section className="relative min-h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            objectFit="cover"
            priority={index === 0} // Pehli image ko priority de rahe hain
            className="absolute inset-0 w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-6 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-semibold mb-6">{slide.title}</h1>
            <p className="text-xl text-gray-200 mb-8">{slide.description}</p>
            <Link href={slide.buttonUrl} passHref>
              <button className="bg-violet-600 text-white px-8 py-3 rounded-full hover:bg-violet-700 transition-all duration-300">
                {slide.buttonText}
              </button>
            </Link>
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
              currentSlide === index ? "bg-violet-600 w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
