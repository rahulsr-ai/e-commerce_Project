"use client";
//@ts-nocheck

import React from "react";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";

const CategoryPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/electronics-hero.jpg"
          alt="Electronics"
          fill
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Electronics
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl text-center">
            Discover the latest in electronic innovations
          </p>
        </div>
      </div>

      {/* Deals Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300">
            <div className="relative h-48">
              <Image
                src="/images/deal1.jpg"
                alt="Premium Headphones"
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                Save 33%
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                Premium Headphones
              </h3>
              <p className="text-muted-foreground mb-4">Noise cancelling wireless headphones</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-white">$199.99</span>
                  <span className="ml-2 text-sm line-through text-muted-foreground">$299.99</span>
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  View Deal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white">All Products</h2>
          <div className="flex gap-4">
            <select className="bg-card text-white border border-border rounded-lg px-4 py-2">
              <option>Sort by</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 group">
            <div className="relative h-48 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/product1.jpg"
                alt="Wireless Earbuds"
                fill
                className="object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-200">
                <Heart className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Wireless Earbuds</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">$149.99</span>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 group">
            <div className="relative h-48 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/product2.jpg"
                alt="Gaming Mouse"
                fill
                className="object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-200">
                <Heart className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Gaming Mouse</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">$79.99</span>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-colors duration-300 group">
            <div className="relative h-48 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/product3.jpg"
                alt="Mechanical Keyboard"
                fill
                className="object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-200">
                <Heart className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Mechanical Keyboard</h3>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-white">$129.99</span>
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  <ShoppingCart className="h-5 w-5" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
