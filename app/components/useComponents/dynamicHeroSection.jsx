"use client";

import React, { useEffect, useState } from "react";

const DynamicHeroSection = () => {
  const DynamicHeroSection = [
    {
      title: "Explore Home Essentials",
      para: "Discover the perfect additions to elevate your space. Whether you are looking for functionality or style, find everything you need to create a comfortable and welcoming environment.",
      image: "/CategoryHeroSection/home.webp",
      identifier: "home",
    },
    {
      title: "Step into Comfort",
      para: "Upgrade your style with the perfect pair! Explore trendy, comfortable, and durable footwear for every occasion, whether you're hitting the streets or relaxing at home",
      image: "/CategoryHeroSection/footwear.avif",
      identifier: "footwear",
    },
    {
      title: "Redefine Your Style",
      para: "Express yourself with trends that keep you ahead. From timeless classics to modern essentials, explore a collection that matches your unique personality.",
      image: "/CategoryHeroSection/fashion.avif",
      identifier: "fashion",
    },
    {
      title: "Complete Your Look",
      para: "Add the perfect finishing touch to your everyday style. Whether subtle or bold, discover pieces that complement and elevate any outfit effortlessly.",
      image: "/CategoryHeroSection/accessories.avif",
      identifier: "accessories",
    },
    {
      title: "Explore Electronics",
      para: "Discover the best deals and latest gadgets. From smartphonesto smart home devices, find everything you need to stay connected and productive.",
      image: "/CategoryHeroSection/electronic.avif",
      identifier: "electronic",
    },
  ];

  const [HeroSection, setHeroSection] = useState([
    {
      title: "",
      para: "",
      image: "",
      identifier: "",
    },
  ]);

  useEffect(() => {
    setHeroSection(() =>
      DynamicHeroSection.filter((section) => section.identifier === name)
    );
  }, []);

  return (
    <div
      className="relative h-[300px] md:h-[400px] overflow-hidden w-full 
      bg-gradient-to-r from-black via-black/70 to-transparent"
    >
      {HeroSection[0]?.image && (
        <Image
          fill
          src={HeroSection[0]?.image}
          alt={`${HeroSection[0]?.title} Category`}
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4 pt-16">
          {HeroSection[0]?.title}
        </h1>
        <p className="text-xl text-zinc-300 max-w-2xl">
          {HeroSection[0]?.para}
        </p>
      </div>
    </div>
  );
};

export default DynamicHeroSection;
