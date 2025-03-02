"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { ArrowUp } from "lucide-react";
import ProductCard from "./components/useComponents/ProductCard";
import Loader from "./components/useComponents/Loader";
import MinFilter from "./components/useComponents/minimalFilter";


import ResponsiveBanner from "./components/Tempo/ReponsiveBannaer";
import BrandsMarquee from "./components/brandsMaruqee";
import FAQSection from "./components/FAQSection";
import NewFooter from "./components/NewFooter";
const LazyFeatured = React.lazy(() => import("./components/Featured"));
const LazyHeroCarousel = React.lazy(() => import("./components/HeroCarousel"));



const Landing = () => {
  
  const router = useRouter();

  const { user, setUser } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  
  const [Products, setProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [whislist, setWhislist] = useState([]);
  const [UnFilterData, setUnFilterData] = useState([]);

  

  const GetProductData = async () => {
    try {
      const { data } = await axios.get("/api/product/getallproduct");

      if (data?.success) {
        setProducts(data.products);
        setUnFilterData(data.products);
      }

      setUser({ token: data.token });
    } catch (error) {
      console.log("frontend error while fetching products");
      console.log(error);
    }
  };

  const scrollToFilter = () => {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) {
      const yOffset =
        filterSection.getBoundingClientRect().top + window.scrollY - 50; // 50px padding
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const fetchCategories = async () => {
    const { data } = await axios.get("/api/category/subcategory");

    if (data?.success) {
      setCategories(() => [...data?.GetSubcategory]);
    }
  };

  useEffect(() => {
   try {
    const role = localStorage.getItem("code");
    if (role === "2637") {
      router.push("/admin/dashboard/Inventory");
      return;
    }

    fetchCategories();
    GetProductData();
    setloading(false);

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
   } catch (error) {
     console.log("error", error);
     
   }
  }, []);

 
  
  

  return (
    !loading &&
    <div className="bg-black min-h-screen w-full ">
      {/* <HeroCarousel /> */}
      <Suspense fallback={<div></div>}>
        <LazyHeroCarousel />
      </Suspense>

      {/* Brands Marquee */}
      <BrandsMarquee />

      <div>
        <Suspense fallback={<div></div>}>
          <LazyFeatured />
        </Suspense>
      </div>

      {/* Special Offer Banner */}
      <div>
        <ResponsiveBanner />
      </div>

      <div className="py-12 md:px-16" id="filter-section">
        <MinFilter
          products={Products}
          setproducts={setProducts}
          UnFilterData={UnFilterData}
        />
      </div>

      {/* Product Grid */}
      {Products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12 place-items-center">
          {Products?.map((product) => (
            <ProductCard
              whislist={whislist}
              setWhislist={setWhislist}
              key={product._id}
              imageUrl={product.images[0]}
              category={product.category}
              title={product.name}
              description={product.description}
              price={product.price}
              id={product._id}
              slug={product.slug}
            />
          ))}
          {isVisible && (
            <button
              onClick={scrollToFilter}
              className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
            >
              <ArrowUp className="w-6 h-6" />
            </button>
          )}
        </div>
      ) : (
        <Loader />
      )}



      <div>
        <FAQSection />
      </div>


      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default Landing;
