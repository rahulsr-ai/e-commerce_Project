"use client";

import React, { useEffect, useState } from "react";
import {
  Star,
  TrendingUp,
  Shield,
  Truck,
  Clock,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import Hero from "./components/Hero";

const featuredProducts = [
  {
    id: 1,
    name: "Premium Smartwatch",
    price: "$299.99",
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&q=80",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: "$159.99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Audio",
  },
  {
    id: 4,
    name: "Classic Watch",
    price: "$399.99",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&q=80",
    category: "Watches",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    content:
      "StoreX has completely transformed my shopping experience. The quality of products and customer service is unmatched!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Tech Reviewer",
    content:
      "As a tech enthusiast, I'm impressed by the range of premium electronics available. Fast shipping and great prices!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
  },
];

const usp = [
  {
    icon: <Truck size={24} />,
    title: "Free Shipping",
    subHeading: "On orders over $100",
  },
  {
    icon: <Shield size={24} />,
    title: "Secure Payment",
    subHeading: "100% secure payment",
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Support",
    subHeading: "Dedicated support",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Best Prices",
    subHeading: "Quality products",
  },
];

const Landing = () => {
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
  }, []);
  return (
    loading && (
      <> 
       <Hero/>
      
      <div className="bg-gray-50 shadow-lg overflow-hidden">
       
        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {usp.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center space-x-4 p-6 bg-neutral-900 shadow-md rounded-lg
                  lg:hover:scale-110 transition-all duration-200"
                >
                  <div className="text-[#ffcb6a] ">{item.icon} </div>{" "}
                  <div>
                    <h3 className="font-semibold ">{item.title}</h3>
                    <p className="text-sm text-gray-300">{item.subHeading} </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover our handpicked selection of premium products, curated
                just for you.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-indigo-600 px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-indigo-50">
                      Quick View
                    </button>
                  </div>
                  <div className="mt-4">
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-indigo-600 font-medium">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offer */}
        <section className="py-1 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-6">Special Offer</h2>
                <p className="text-xl mb-8">
                  Get 20% off on all premium electronics this week! Don't miss
                  out on these amazing deals.
                </p>
                <div className="flex space-x-4">
                  <button className="bg-white text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors">
                    Shop Now
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-indigo-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&q=80"
                  alt="Special Offer"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl font-bold text-indigo-600">
                    20% OFF
                  </div>
                  <div className="text-sm text-gray-600">
                    Limited Time Offer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our satisfied
                customers have to say.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-gray-50 p-8 rounded-lg">
                  <div className="flex items-center space-x-4 mb-6">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600">{testimonial.role}</p>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600">{testimonial.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <BadgeCheck className="text-indigo-600 mb-2" size={32} />
                <h3 className="font-semibold">Authentic Products</h3>
                <p className="text-sm text-gray-600">100% Genuine Items</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Shield className="text-indigo-600 mb-2" size={32} />
                <h3 className="font-semibold">Secure Shopping</h3>
                <p className="text-sm text-gray-600">Protected Payments</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="text-indigo-600 mb-2" size={32} />
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Quick & Reliable</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <ArrowRight className="text-indigo-600 mb-2" size={32} />
                <h3 className="font-semibold">Easy Returns</h3>
                <p className="text-sm text-gray-600">Hassle-free Process</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      </>
    )
  );
};

export default Landing;
