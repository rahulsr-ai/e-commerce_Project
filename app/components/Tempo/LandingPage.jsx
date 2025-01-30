import React from "react";
import HeroCarousel from "./TempHerocarousel";
import CtaButton from "./CtaButton";
import { motion } from "framer-motion";
import ResponsiveBanner from "./ReponsiveBannaer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Hero Section */}
      <section>
        <HeroCarousel />
      </section>

      {/* Featured Categories Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Categories
          </h2>
          <p className="text-gray-400 text-lg">
            Explore our curated collection of premium products
          </p>
        </motion.div>

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
                  <CtaButton text="Explore" size="sm" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Banner Section */}
      <section className="my-16">
        <ResponsiveBanner
          title="Summer Collection 2024"
          description="Discover the latest trends and exclusive deals on our premium collection."
        />
      </section>

      {/* Newsletter Section */}
      <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new arrivals, and
            fashion tips.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:flex-1 px-4 py-3 rounded-lg bg-[#2A2A2A] text-white border border-[#3A3A3A] focus:outline-none focus:border-[#8B5CF6] transition-colors"
            />
            <CtaButton text="Subscribe" size="default" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
