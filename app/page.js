"use client";

import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HomeProductData } from "./data/products";
import axios from "axios";
import { useAuth } from "@/context/Authcontext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { ArrowUp, Home } from "lucide-react";
import HomeProductGrid from "./components/skeletons/homeProductGrid";
import ProductCard from "./components/useComponents/ProductCard";

const HeroCarousel = dynamic(() => import("./components/HeroCarousel"), {
  ssr: false,
});
const Testimonials = dynamic(() => import("./components/Testimonials"), {
  ssr: false,
});
const FAQSection = dynamic(() => import("./components/FAQSection"), {
  ssr: false,
});
const NewFooter = dynamic(() => import("./components/NewFooter"), {
  ssr: false,
});
const BrandsMarquee = dynamic(() => import("./components/brandsMaruqee"), {
  ssr: false,
});
const ResponsiveBanner = dynamic(
  () => import("./components/Tempo/ReponsiveBannaer"),
  { ssr: false }
);

const ProductGrid = dynamic(() => import("@/app/components/ProductGrid"));

const Featured = dynamic(() => import("@/app/components/Featured"));

const Landing = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  
  const [products, setProducts] = useState([]);
  const [loading, setloading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  


  const GetProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/getallproduct");
      console.log(data);

      if (data?.success) {
        setProducts(data.products);
      }

      console.log(data.products[0].images[0]);

      setUser({ token: data.token });
    } catch (error) {
      console.log("frontend error while fetching products");
      console.log(error);
    }
  };

  useEffect(() => {
    GetProductData();
    setloading(true);


    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);


  }, []);



  const scrollToFilter = () => {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) {
      const yOffset = filterSection.getBoundingClientRect().top + window.scrollY - 50; // 50px padding
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  return (
    loading && (
      <div className="bg-black min-h-screen w-full ">
        {/* Hero Carousel */}

        <HeroCarousel />

        {/* Brands Marquee */}
        <BrandsMarquee />

        <Featured />

        {/* Special Offer Banner */}

        <div>
          <ResponsiveBanner />
        </div>

        {/* Product Grid */}
        <section id="filter-section" className="mx-auto px-4 py-8 bg-black">
          {/* <h2 className="text-2xl font-semibold text-white mb-4">
            Featured Products
          </h2> */}

          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={i}
                id={product._id}
                slug={product.slug}
                imageUrl={product.images[0]}
                title={product.name}
                category={product.category}
                description={product.description}
                price={product.price}
              />
            ))}
          </div>
          {isVisible && (
        <button
          onClick={scrollToFilter}
          className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
        </section>

        {/* <div>
          <Testimonials />
        </div> */}

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
