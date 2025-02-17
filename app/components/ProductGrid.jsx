import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart, Eye, X, Filter } from "lucide-react";
import { set } from "mongoose";
import Image from "next/image";

const categories = ["All", "Electronics", "Fashion", "Audio", "Watches"];
const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "Over $300", min: 300, max: Infinity },
];

const ProductGrid = ({ products }) => {
  const [RealProducts, setRealProducts] = useState([]);

  const [categoryName, setcategoryName] = useState([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [wishlist, setwishlist] = useState([]);

  const handleFilter = () => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedPriceRange.length === 2) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price.replace("$", ""));
        return price >= selectedPriceRange[0] && price <= selectedPriceRange[1];
      });
    }

    setFilteredProducts(filtered);
    setIsFilterOpen(false);
  };

  const setCategoryName = (id) => {
    switch (id) {
      case "67af39a6666823df372a6770":
        return "Electronics";
        break;
      case "67af977892a804bf6b80be63":
        return "accessories";
        break;
      case "67af3956666823df372a6764":
        return "Footwear";
        break;

      case "67af9c0a92a804bf6b80bea2":
        return "Fashion";
        break;

      case "67af3989666823df372a676a":
        return "Home";
        break;

      default:
        "Unknown";
        break;
    }
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedPriceRange([]);
    setFilteredProducts(products);
  };

  const handleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setwishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setwishlist([...wishlist, id]);
    }
  };

  return (
    <div className="relative">
      {/* Filter Button */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex lg:flex-row flex-col gap-4 justify-between items-center mb-4 ">
          <h2 className="text-2xl font-bold text-white">Our Products</h2>
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center space-x-2 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700"
          >
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter Modal */}
        {isFilterOpen && (
          <div className=" inset-0 bg-black bg-opacity-50  flex items-center justify-center">
            <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">
                  Filter Products
                </h3>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-white mb-2">Categories</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg ${
                        selectedCategory === category
                          ? "bg-[#d38bd1] text-black"
                          : "bg-neutral-800 text-white"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Ranges */}
              <div className="mb-6">
                <h4 className="text-white mb-2">Price Range</h4>
                <div className="grid grid-cols-2 gap-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.label}
                      onClick={() =>
                        setSelectedPriceRange([range.min, range.max])
                      }
                      className={`px-4 py-2 rounded-lg ${
                        selectedPriceRange[0] === range.min
                          ? "bg-[#ffcb6a] text-black"
                          : "bg-neutral-800 text-white"
                      }`}
                    >
                      {range.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700"
                >
                  Clear Filters
                </button>
                <button
                  onClick={handleFilter}
                  className="flex-1 px-4 py-2 bg-[#ffcb6a] text-black rounded-lg hover:opacity-90"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-h-[calc(100vh-200px)] ">
        {products.map((product, i) => (
          <div
            key={product._id}
            className="group bg-neutral-900 rounded-lg md:static my-7 md:my-0"
          >
            <div className="relative overflow-hidden">
              <Image
                height={400}
                width={400}
                src={product?.images[0]}
                alt={product?.name}
                className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className={`absolute top-4 right-4 space-y-2`}>
                <button
                  className={`bg-neutral-900 p-2 rounded-full text-white transition-colors
                ${wishlist.includes(product) ? "bg-rose-500" : "bg-neutral-900"}
                `}
                  onClick={() => {
                    handleWishlist(product);
                  }}
                >
                  <Heart size={20} />
                </button>
              </div>
            </div>
            <div className="py-2 px-2 flex flex-col justify-between">
              <div className="text-sm text-gray-400 mb-1">
                {setCategoryName(product.category)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {product.name}
              </h3>
              <h3 className="text-sm text-gray-400 mb-2">
                {product.description.replace(/^((\S+\s+){5}\S+).*/, "$1...")}
              </h3>
              <p className="text-violet-400 font-medium mb-4">
                $ {product.price}
              </p>
              <div className="flex space-x-2">
                <button className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition-colors">
                  <ShoppingCart size={20} className="inline mr-2" />
                  Add to Cart
                </button>
                <button className="bg-[#621c9c] text-white px-4 py-2 rounded-lg hover:opacity-90 transition-colors">
                  <Eye size={20} className="inline" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
