//@ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { DealsSlider } from "../components/DealSlider";
import { ProductCard } from "../components/ProductCard";
import { Filter } from "../components/Filter";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: "Professional DSLR Camera",
    price: 1499.99,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    category: "Cameras",
  },
  {
    id: 2,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
  },
  {
    id: 3,
    name: "Mechanical Gaming Keyboard",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    category: "Accessories",
  },
  {
    id: 4,
    name: "4K Webcam",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?auto=format&fit=crop&q=80&w=800",
    category: "Cameras",
  },
  {
    id: 5,
    name: "Wireless Earbuds",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800",
    category: "Headphones",
  },
  {
    id: 6,
    name: "Smart Home Hub",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    category: "Smart Home",
  },
];

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: [],
    priceRange: null,
  });

  const clearFilters = () => {
    setFilters({
      category: [],
      priceRange: null,
    });
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const categoryMatch =
      filters.category.length === 0 ||
      filters.category.includes(product.category);
    let priceMatch = true;

    if (filters.priceRange) {
      switch (filters.priceRange) {
        case "below-100":
          priceMatch = product.price < 100;
          break;
        case "100-200":
          priceMatch = product.price >= 100 && product.price <= 200;
          break;
        case "200-500":
          priceMatch = product.price >= 200 && product.price <= 500;
          break;
        case "above-500":
          priceMatch = product.price > 500;
          break;
      }
    }

    return categoryMatch && priceMatch;
  });

  return (
    isLoading && (
      <div className="min-h-screen mt-1 bg-zinc-950 text-white">
        {/* Hero Section */}
        <div className="relative h-[400px] bg-gradient-to-r from-zinc-900 to-indigo-900 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=2070"
            alt="Electronics Category"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 to-transparent" />
          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <h1 className="text-5xl font-bold mb-4">Explore Electronics</h1>
            <p className="text-xl text-zinc-300 max-w-2xl">
              Discover the best deals and latest gadgets. From smartphones to
              smart home devices, find everything you need to stay connected and
              entertained.
            </p>
          </div>
        </div>

        {/* Hot Deals Section */}
        <section className="py-12">
          <h2 className="text-3xl font-bold mb-8 px-6 max-w-7xl mx-auto">
            Hot Deals 🔥
          </h2>

          <DealsSlider />
        </section>

        {/* Main Content */}
        <div className="px-6 max-w-7xl mx-auto">
          {/* Filter Section */}
          <Filter
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            productCount={filteredProducts.length}
          />

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-zinc-400">
                No products match your filters
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-zinc-900 mt-12 py-8 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Smartphones</li>
                <li>Laptops & Computers</li>
                <li>Audio & Headphones</li>
                <li>Gaming & Entertainment</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Contact Us</li>
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
              <p className="text-zinc-400 mb-4">
                Subscribe to receive updates about new products and special
                offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button className="px-6 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  );
}

export default App;
