import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Featured = () => {
  const collectionImages = [
    {
      title: "New Arrivals",
      image: "/featuredImages/clothes.jpeg",
      path: "/Explore/New-Arrivals",
    },
    {
      title: "Best Sellers",
      image: "/featuredImages/ladyshoping.jpeg",
      path: "/Explore/Best-Sellers",
    },
    {
      title: "Trending",
      image: "/featuredImages/headphone0.jpg",
      path: "/Explore/Trending",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-black to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--primary-text-color)] mb-4">
            Featured Products
          </h2>
          <p className="text-gray-200-300 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionImages.map((category, index) => (
            <Link key={index} href={category.path} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <div className="w-full h-64 relative">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }} // ✅ Use `style` instead
                    className="group-hover:scale-110  transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-[var(--primary-text-color)] mb-2">
                      {category.title}
                    </h3>
                    <button className="px-3 py-1.5 rounded-md bg-[var(--primary-color)] hover:bg-violet-800 shadow-md">
                      Explore
                    </button>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
