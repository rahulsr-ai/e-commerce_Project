"use client";

import React, { useEffect, useState } from "react";
// import {
//   Star,
//   TrendingUp,
//   Shield,
//   Truck,
//   Clock,
//   ArrowRight,
//   BadgeCheck,
// } from "lucide-react";
import { motion } from "framer-motion";

import ProductGrid from "@/app/components/ProductGrid";
import HeroCarousel from "./components/HeroCarousel";
import BrandsMarquee from "./components/brandsMaruqee";
import ResponsiveBanner from "./components/Tempo/ReponsiveBannaer";
import NewFooter from "./components/NewFooter";

import { HomeProductData } from "./data/products";
import FAQSection from "./components/FAQSection";
import Testimonials from "./components/Testimonials";

import axios from "axios";
import { useAuth } from "@/context/Authcontext";

const Landing = () => {
  const { user, setUser } = useAuth();
  const [loading, setloading] = useState(false);

  const GetProductData = async () => {
    try {
      const { data } = await axios.get("/api/Products");
      console.log(data);

      setUser({ token: data.token });
    } catch (error) {
      console.log("frontend error while fetching products");
      console.log(error);
    }
  };

  useEffect(() => {
    GetProductData();
    setloading(true);
  }, []);

  return (
    loading && (
      <div className="bg-black min-h-screen w-full overflow-x-hidden">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* Brands Marquee */}
        <BrandsMarquee />

        {/* Featured Products */}
        <section className="py-16 bg-gradient-to-b from-black to-purple-900/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Featured Products
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Discover our handpicked selection of premium products
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "New Arrivals",
                  image:
                    "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400",
                },
                {
                  title: "Best Sellers",
                  image:
                    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=400",
                },
                {
                  title: "Limited Edition",
                  image:
                    "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=400",
                },
              ].map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group overflow-hidden rounded-lg"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {category.title}
                      </h3>
                      <button
                        title="Explore"
                        className="px-3 py-1.5 rounded-md bg-violet-600"
                      >
                        {" "}
                        Explore{" "}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer Banner */}

        <div>
          <ResponsiveBanner />
        </div>

        {/* Product Grid */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4">
            <ProductGrid products={HomeProductData} />
          </div>
        </section>

        <div>
          <Testimonials />
        </div>
        <div>
          <FAQSection />
        </div>

        {/* Footer */}
        <NewFooter />
      </div>
    )
  );
};

export default Landing;
