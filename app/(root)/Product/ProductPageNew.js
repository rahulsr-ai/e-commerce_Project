"use client";

import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, Truck, Shield, ArrowLeft, ArrowRight, Package, RefreshCw, Clock, ChevronDown, Menu, Moon, Sun, MessageCircle, Mail } from 'lucide-react';

const product = {
  name: "Premium Wireless Headphones",
  price: 299.99,
  description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 40-hour battery life, and premium materials for ultimate comfort.",
  rating: 4.8,
  reviews: 128,
  colors: ["Midnight Black", "Silver", "Rose Gold"],
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
  ],
  specs: [
    { name: "Driver Size", value: "40mm" },
    { name: "Frequency Response", value: "20Hz - 20kHz" },
    { name: "Battery Life", value: "40 hours" },
    { name: "Charging Time", value: "2 hours" },
    { name: "Bluetooth Version", value: "5.2" },
    { name: "Weight", value: "250g" }
  ],
  relatedProducts: [
    {
      id: 1,
      name: "Wireless Earbuds Pro",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Studio Monitor Headphones",
      price: 349.99,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Bass Boost Headphones",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 weeks ago",
    comment: "These headphones are absolutely amazing! The sound quality is crystal clear, and the noise cancellation works perfectly. Battery life is impressive too.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "1 month ago",
    comment: "Great headphones overall. The comfort is outstanding for long listening sessions. Only minor issue is the ProductPageNew could be more intuitive.",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80"
  },
  {
    id: 3,
    name: "Emily Wilson",
    rating: 5,
    date: "2 months ago",
    comment: "The sound quality exceeded my expectations. These are now my go-to headphones for both work and travel. Worth every penny!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80"
  }
];

const faqs = [
  {
    question: "What's included in the box?",
    answer: "The package includes the wireless headphones, a carrying case, USB-C charging cable, 3.5mm audio cable, and user manual."
  },
  {
    question: "How long does the battery last?",
    answer: "The battery lasts up to 40 hours with active noise cancellation enabled, and up to 60 hours with ANC turned off."
  },
  {
    question: "Is there a mobile ProductPageNew available?",
    answer: "Yes, our mobile ProductPageNew is available for both iOS and Android devices. It allows you to customize EQ settings, update firmware, and control noise cancellation levels."
  },
  {
    question: "What's the warranty coverage?",
    answer: "We offer a 2-year warranty that covers manufacturing defects and hardware issues. This doesn't cover water damage or physical damage from drops."
  }
];

function ProductPageNew() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [email, setEmail] = useState("");

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Thanks for subscribing!");
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-violet-text-violet-400 text-gray-100' : 'bg-black text-white'}`}>
      {/* Navigation */}
   

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center text-sm text-white">
          <a href="#" className="hover:text-gray-400">Home</a>
          <ChevronDown className="w-4 h-4 mx-2 rotate-90" />
          <a href="#" className="hover:text-gray-400">Headphones</a>
          <ChevronDown className="w-4 h-4 mx-2 rotate-90" />
          <span className="text-gray-400">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden bg-gray-200">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-[500px] object-cover object-center"
              />
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/90 p-2 rounded-full shadow-lg hover:bg-zinc-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/90 p-2 rounded-full shadow-lg hover:bg-zinc-800 transition-colors"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative rounded-lg overflow-hidden aspect-w-1 aspect-h-1 ${
                    currentImageIndex === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-24 object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-300">{product.name}</h1>
              <div className="mt-4 flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-violet-500">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <p className="text-violet-200 text-lg leading-relaxed">{product.description}</p>

            <div className="text-4xl font-bold text-purple-500">${product.price}</div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-white">Color</h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`
                      px-6 py-2 rounded-full text-sm font-medium transition-colors
                      ${
                        selectedColor === color
                          ? 'bg-purple-700 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-medium text-white">Quantity</h3>
              <div className="mt-2 flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border rounded-md hover:bg-purple-800 transition-colors"
                >
                  -
                </button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border rounded-md hover:bg-purple-800 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-4">
              <button className="flex-1 bg-purple-700 text-white py-4 px-6 rounded-lg hover:bg-violet-700 transition-colors flex items-center justify-center space-x-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              <button className="px-4 py-4 border border-gray-300 rounded-lg hover:bg-rose-500 transition-colors">
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t">
              <div className="flex items-center space-x-3 bg-zinc-950 shadow-md p-4 rounded-lg">
                <Truck className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Free Shipping</h4>
                  <p className="text-sm text-gray-600">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-950 shadow-md p-4 rounded-lg">
                <Shield className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">2 Year Warranty</h4>
                  <p className="text-sm text-gray-600">Full coverage</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-950 shadow-md p-4 rounded-lg">
                <RefreshCw className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Free Returns</h4>
                  <p className="text-sm text-gray-600">Within 30 days</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-zinc-950 shadow-md p-4 rounded-lg">
                <Package className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Secure Packaging</h4>
                  <p className="text-sm text-gray-600">Safe delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Specifications */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.specs.map((spec, index) => (
              <div key={index} className="bg-neutral-950 p-4 rounded-lg shadow-sm">
                <h3 className="text-sm font-medium text-white">{spec.name}</h3>
                <p className="mt-1 text-lg font-medium text-purple-400">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((item) => (
              <div key={item.id} className="bg-neutral-900 rounded-lg shadow-sm overflow-hidden">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-white">{item.name}</h3>
                  <p className="mt-1 text-lg font-bold text-white">${item.price}</p>
                  <button className="mt-4 w-full bg-gray-100 text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-500'} mb-4`}>Customer Reviews</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-white'}`}>See what our customers are saying about our products</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className={`${darkMode ? 'bg-gray-800' : 'bg-neutral-950'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center mb-4">
                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                <div className="ml-4">
                  <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-violet-700'}`}>{review.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-100' : 'text-white'}`}>{review.date}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? 'text-yellow-400 fill-current'
                        : darkMode ? 'text-gray-600' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-purple-300'} leading-relaxed`}>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-black'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-700'} mb-4`}>Frequently Asked Questions</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-100'}`}>Everything you need to know about the product</p>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`${darkMode ? 'bg-gray-700' : 'bg-neutral-950'} rounded-lg shadow-md overflow-hidden`}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-200'}`}>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-white'} transform transition-transform ${
                      expandedFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className={`${darkMode ? 'text-gray-300' : 'text-purple-300'}`}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className={`${darkMode ? 'bg-violet-text-violet-400' : 'bg-black'} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-purple-600'} mb-4`}>Stay Updated</h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-white'} mb-8`}>
              Subscribe to our newsletter for exclusive offers and the latest updates
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-lg ${
                  darkMode
                    ? 'bg-gray-800 text-white placeholder-gray-400 border-gray-700'
                    : 'bg-gray-100 text-violet-400 placeholder-stone-text-white border-gray-200'
                } border focus:outline-none focus:ring-2 focus:ring-violet-300`}
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-900 transition-colors flex items-center space-x-2"
              >
                <Mail className="w-5 h-5" />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className={`${darkMode ? 'bg-black border-purple-600' : 'bg-black border-purple-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-700'} mb-4`}>About Us</h3>
              <p className={`${darkMode ? 'text-white' : 'text-white'}`}>
                We're dedicated to providing the best audio experience with cutting-edge technology and premium quality products.
              </p>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-700'} mb-4`}>Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>Shop</a></li>
                <li><a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>About</a></li>
                <li><a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>Contact</a></li>
                <li><a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-700'} mb-4`}>Contact</h3>
              <ul className={`space-y-2 ${darkMode ? 'text-white' : 'text-white'}`}>
                <li>1234 Audio Street</li>
                <li>Sound City, SC 12345</li>
                <li>Phone: (555) 123-4567</li>
                <li>Email: support@audiophile.com</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-purple-700'} mb-4`}>Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>Twitter</a>
                <a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>Facebook</a>
                <a href="#" className={`${darkMode ? 'text-white hover:text-white' : 'text-white hover:text-violet-400'}`}>Instagram</a>
              </div>
            </div>
          </div>
          <div className={`mt-8 pt-8 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t text-center ${darkMode ? 'text-gray-400' : 'text-white'}`}>
            <p>&copy; 2025 AudioPhile. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ProductPageNew;