"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/apiCalls";
import Image from "next/image";
import { Filter } from "@/app/components/Filter";
import { useParams } from "next/navigation";
import ProductCard from "@/app/components/useComponents/ProductCard";
import NewFooter from "@/app/components/NewFooter";
import { ArrowUp } from "lucide-react";

const CategoryPage = () => {
  const { name } = useParams();

  const DynamicHeroSection = [
    {
      title: "Explore Home Essentials",
      para: "Discover the perfect additions to elevate your space. Whether you are looking for functionality or style, find everything you need to create a comfortable and welcoming environment.",
      image: "home.webp",
      identifier: "home",
    },
    {
      title: "Step into Comfort",
      para: "Upgrade your style with the perfect pair! Explore trendy, comfortable, and durable footwear for every occasion, whether you're hitting the streets or relaxing at home.",
      image: "footwear02.jpg",
      identifier: "footwear",
    },
    {
      title: "Redefine Your Style",
      para: "Express yourself with trends that keep you ahead. From timeless classics to modern essentials, explore a collection that matches your unique personality.",
      image: "fashion.avif",
      identifier: "fashion",
    },
    {
      title: "Complete Your Look",
      para: "Add the perfect finishing touch to your everyday style. Whether subtle or bold, discover pieces that complement and elevate any outfit effortlessly.",
      image: "accessories.avif",
      identifier: "accessories",
    },
    {
      title: "Explore Electronics",
      para: "Discover the best deals and latest gadgets. From smartphones to smart home devices, find everything you need to stay connected and productive.",
      image: "electronic01.avif",
      identifier: "electronic",
    },
  ];
 const [hasActiveFilters, sethasActiveFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [whislist, setWhislist] = useState([]);
  const [heroContent, setHeroContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    setFilteredProducts(products);
    sethasActiveFilters(false);
  };

  useEffect(() => {
    const matchingHero = DynamicHeroSection.find(
      (section) => section.identifier === name
    );

    setHeroContent(matchingHero || DynamicHeroSection[0]); // Fallback to first item if no match

    const fetchData = async () => {
      try {
        const { product } = await getProductsByCategory(name);
        setProducts(product);
        setFilteredProducts(product); // Initialize filtered products
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchData();

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, [name]);

  if (!name) {
    notFound();
  }

  const scrollToFilter = () => {
    const filterSection = document.getElementById("filter-section");
    if (filterSection) {
      const yOffset =
        filterSection.getBoundingClientRect().top + window.scrollY - 50; // 50px padding
      window.scrollTo({ top: yOffset, behavior: "smooth" });
    }
  };

  const ApplyFilter = () => {
    const { category, minPrice, maxPrice } = filters;
    // alert(category);

    let filtered = products; // Start with all products

    if (category) {
      filtered = filtered.filter((product) => product.subcategory == category);
    }

    if (minPrice !== "" && maxPrice !== "") {
      filtered = filtered.filter(
        (product) =>
          product.price >= Number(minPrice) && product.price <= Number(maxPrice)
      );
    }

    console.log("filtered", filtered);

    setFilteredProducts(filtered);
    console.log("products", filteredProducts);
  };

  useEffect(() => {
    ApplyFilter();
  }, [filters]);

  return (
    <div className="min-h-screen mt-1 bg-zinc-950 text-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-gradient-to-r from-zinc-900 to-indigo-900 overflow-hidden w-full">
        {heroContent && (
          <>
            <Image
              width={1920}
              height={1080}
              src={`/CategoryHeroSection/${heroContent.image}`}
              alt={`${heroContent.title} Category`}
              className="blur-bg absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
            <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
              <h1 className="text-5xl font-bold mb-4">{heroContent.title}</h1>
              <p className="text-xl text-zinc-300 max-w-2xl">
                {heroContent.para}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="py-9" id="filter-section">
        <Filter
          Products={products}
          setProducts={setProducts}
          filters={filters}
          setFilters={setFilters}
          clearFilters={clearFilters}
          productCount={filteredProducts.length}
          categoryID={products[0]?.category}
          sethasActiveFilters={sethasActiveFilters}
          hasActiveFilters={hasActiveFilters}
          ApplyFilter={ApplyFilter}
        />
      </div>

      <div className="min-h-screen px-4 md:px-8 pb-20">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-6">
            {filteredProducts.map((product, i) => (
              <div key={i} className="w-full max-w-sm mx-auto">
                <ProductCard
                  whislist={whislist}
                  setWhislist={setWhislist}
                  id={product._id}
                  slug={product.slug}
                  imageUrl={product.images[0]}
                  title={product.name}
                  category={product.category}
                  description={product.description}
                  price={product.price}
                />
              </div>
            ))}

            {isVisible && (
              <button
               aria-label="Scroll to filter"
                
                onClick={scrollToFilter}
                className="fixed bottom-6 right-6 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transition-all duration-300"
              >
                <ArrowUp className="w-6 h-6" />
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96">
            <h2 className="text-2xl font-semibold mt-4">No Products Found</h2>
            <p className="text-zinc-400 mt-2">
              Try adjusting your filters to find more products.
            </p>
            <button
              aria-label="Clear filters"
              onClick={clearFilters}
              className="mt-4 px-6 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <div>
        <NewFooter />
      </div>
    </div>
  );
};

export default CategoryPage;
