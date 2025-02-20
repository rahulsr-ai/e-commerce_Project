"use client";

import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";

const product = {
  name: "Premium Wireless Headphones",
  price: "$299.99",
  description:
    "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium materials for ultimate comfort.",
  mainImage:
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524678714210-9917a6c619c2?auto=format&fit=crop&w=800&q=80",
  ],
};

const relatedProducts = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: "$149.99",
    image:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Over-Ear Headphones",
    price: "$249.99",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Studio Monitors",
    price: "$399.99",
    image:
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "DJ Headphones",
    price: "$199.99",
    image:
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=400&q=80",
  },
];

const reviews = [
  {
    id: 1,
    name: "Alex Thompson",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "Best headphones I've ever owned. The sound quality is incredible!",
    date: "2 days ago",
    verified: true,
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    comment: "Great sound and comfortable fit. Battery life could be better.",
    date: "1 week ago",
    verified: true,
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    comment:
      "Exceptional build quality and the noise cancellation is top-notch.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    rating: 4,
    comment: "Love the design and sound quality. Worth every penny!",
    date: "3 weeks ago",
    verified: false,
  },
];

function ProductPage() {
  const [isloading, setIsloading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.mainImage);

  useEffect(() => {
    setIsloading(true);
  }, []);

  
  return (
    isloading && (
      <div className="min-h-screen bg-gray-900">
        {/* Main Product Section */}
        <main className="container mx-auto px-4 py-8">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl mb-12">
            <div className="md:flex">
              {/* Product Images */}
              <div className="md:w-1/2 p-6">
                <div className="aspect-square mb-4 overflow-hidden rounded-lg">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === image
                          ? "border-violet-500"
                          : "border-transparent"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Product view ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {product.name}
                </h1>
                <p className="text-violet-500 text-2xl mb-4">{product.price}</p>
                <p className="text-gray-300 mb-8">{product.description}</p>

                <div className="flex space-x-4 mb-8">
                  <button className="flex-1 bg-violet-500 hover:bg-violet-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition duration-200">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="p-3 border border-violet-500 rounded-lg hover:bg-violet-500/20 transition duration-200">
                    <Heart className="w-6 h-6 text-violet-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-lg overflow-hidden group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                      <button className="p-2 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors">
                        <Eye className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 bg-violet-500 rounded-full hover:bg-violet-600 transition-colors">
                        <Heart className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <p className="text-violet-500">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-white font-semibold flex items-center">
                            {review.name}
                            {review.verified && (
                              <span className="ml-2 text-xs bg-violet-500 text-white px-2 py-0.5 rounded-full">
                                Verified
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center space-x-1">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-violet-500 text-violet-500"
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-bold mb-4">About Us</h3>
                <p className="text-gray-400">
                  Premium audio equipment for music enthusiasts and
                  professionals.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-violet-500">
                      Products
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-violet-500">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-violet-500">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-bold mb-4">Newsletter</h3>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-700 text-white px-4 py-2 rounded-l-lg flex-1"
                  />
                  <button className="bg-violet-500 text-white px-4 py-2 rounded-r-lg hover:bg-violet-600 transition duration-200">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>&copy; 2024 Premium Audio. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    )
  );
}

export default ProductPage;
