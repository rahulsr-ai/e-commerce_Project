"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  Filter,
  Edit,
  X,
  AlertTriangle,
  CheckCircle,
  ArrowUpDown,
  Loader,
  IndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllProducts, UpdateProductStock } from "@/lib/apiCalls";
import Image from "next/image";
import { useSidebar } from "@/context/SidebarContext";

// Stock level thresholds
const STOCK_LEVELS = {
  LOW: 10,
  MEDIUM: 50,
};

const InventoryManagement = () => {
  const {isSidebarOpen, setisSidebarOpen} = useSidebar();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });
  const [skeleton, setSkeleton] = useState(true);
  const [updateModal, setUpdateModal] = useState({
    isOpen: false,
    product: null,
  });
  const [newQuantity, setNewQuantity] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const setCategoryName = (id) => {
    switch (id) {
      case "67af39a6666823df372a6770":
        return "Electronics";
      case "67af977892a804bf6b80be63":
        return "Accessories";
      case "67af3956666823df372a6764":
        return "Footwear";
      case "67af9c0a92a804bf6b80bea2":
        return "Fashion";
      case "67af3989666823df372a676a":
        return "Home";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    const getProductData = async () => {
      const response = await getAllProducts();
      console.log(response?.products);
      setProducts(response?.products);
    };

    getProductData();

    // Simulate loading data
    const timer = setTimeout(() => {
      setSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const applyFilter = () => {
    if (selectedFilter === "All") {
    }
  };

  // Filter products based on search term and selected filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      setCategoryName(product.category)
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    if (selectedFilter === "All") return matchesSearch;
    if (selectedFilter === "Low Stock")
      return matchesSearch && product.stock <= STOCK_LEVELS.LOW;
    if (selectedFilter === "Medium Stock")
      return (
        matchesSearch &&
        product.stock > STOCK_LEVELS.LOW &&
        product.stock <= STOCK_LEVELS.MEDIUM
      );
    if (selectedFilter === "High Stock")
      return matchesSearch && product.stock > STOCK_LEVELS.MEDIUM;

    return matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle update quantity
  const handleUpdateQuantity = async () => {
    if (!newQuantity || isNaN(Number(newQuantity))) return;

    setIsUpdating(true);

    const response = await UpdateProductStock(
      updateModal.product._id,
      Number(newQuantity)
    );
  

    if (response?.success) {
      // Update the state immediately
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updateModal.product._id
            ? { ...product, stock: Number(newQuantity) }
            : product
        )
      );
    }


    setIsUpdating(false);
    setUpdateModal({ isOpen: false, product: null });
    setNewQuantity("");
  };

  // Get stock level class
  const getStockLevelClass = (quantity) => {
    if (quantity <= STOCK_LEVELS.LOW) return "bg-red-900 text-red-200";
    if (quantity <= STOCK_LEVELS.MEDIUM) return "bg-yellow-900 text-yellow-200";
    return "bg-green-900 text-green-200";
  };

  // Get stock level text
  const getStockLevelText = (quantity) => {
    if (quantity <= STOCK_LEVELS.LOW) return "Low";
    if (quantity <= STOCK_LEVELS.MEDIUM) return "Medium";
    return "High";
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <main className={`p-4 md:p-6 ${isSidebarOpen ? "w-full" : "ml-20"}`}>
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold flex items-center">
            <Package className="mr-2 h-6 w-6 text-violet-500" />
            Inventory Management
          </h2>
          <p className="text-zinc-400">Manage product stock and inventory</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "All"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setSelectedFilter("All");
              }}
            >
              <Filter className="h-4 w-4" />
              <span>All</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "Low Stock"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setSelectedFilter("Low Stock");
              }}
            >
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span>Low Stock</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "Medium Stock"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => {
                setSelectedFilter("Medium Stock");
              }}
            >
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span>Medium Stock</span>
            </button>
            <button
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1 ${
                selectedFilter === "High Stock"
                  ? "bg-violet-500 text-white"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
              onClick={() => setSelectedFilter("High Stock")}
            >
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>High Stock</span>
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-zinc-800 border border-zinc-700 rounded-md py-2 pl-10 pr-4 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-zinc-800 rounded-lg border-4  border-zinc-700   ">
          <div className="overflow-x-auto overflow-y-scroll scrollbar-hide  max-h-[400px]">
            <table className="min-w-full divide-y divide-zinc-700">
              <thead className="bg-zinc-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Product
                      {sortConfig.key === "name" && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      {sortConfig.key === "category" && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("quantity")}
                  >
                    <div className="flex items-center">
                      Stock
                      {sortConfig.key === "quantity" && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider cursor-pointer"
                    onClick={() => requestSort("price")}
                  >
                    <div className="flex items-center">
                      Price
                      {sortConfig.key === "price" && (
                        <ArrowUpDown className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-zinc-400 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-700">
                {skeleton ? (
                  // Skeleton loading
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 bg-zinc-700 rounded animate-pulse"></div>
                            <div className="ml-4">
                              <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse"></div>
                              <div className="h-3 w-24 bg-zinc-700 rounded animate-pulse mt-2"></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 w-20 bg-zinc-700 rounded animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-6 w-16 bg-zinc-700 rounded animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="h-4 w-16 bg-zinc-700 rounded animate-pulse"></div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="h-8 w-8 bg-zinc-700 rounded-full animate-pulse ml-auto"></div>
                        </td>
                      </tr>
                    ))
                ) : sortedProducts.length > 0 ? (
                  sortedProducts.map((product) => (
                    <motion.tr
                      key={product._id}
                      className="hover:bg-zinc-750"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              width={100}
                              height={100}
                              className="h-10 w-10 rounded object-cover"
                              src={product.images[0]}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium">
                              {product.name}
                            </div>
                            <div className="text-sm text-zinc-400">
                              ID: {product._id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full bg-zinc-700 text-zinc-200">
                          {setCategoryName(product.category)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${getStockLevelClass(
                            product.stock
                          )}`}
                        >
                          {product.stock} ({getStockLevelText(product.stock)})
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <IndianRupee className="inline size-4"/> {product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          aria-label="Update stock quantity"
                          className="text-violet-400 hover:text-violet-300 p-1 rounded-full hover:bg-zinc-700"
                          onClick={() => {
                            setUpdateModal({ isOpen: true, product });
                            setNewQuantity(product.stock.toString());
                          }}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-zinc-400"
                    >
                      No products found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-zinc-400">
            Showing <span className="font-medium">{sortedProducts.length}</span>{" "}
            of <span className="font-medium">{products.length}</span> products
          </div>

          <div className="flex space-x-2">
            <button 
             aria-label="Previous page"
            className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button 
            aria-label="Next page"
            className="px-3 py-1 rounded-md bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Update Quantity Modal */}
      <AnimatePresence>
        {updateModal.isOpen && updateModal.product && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-800 rounded-lg border border-zinc-700 p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 10, duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Update Stock Quantity</h3>
                <button
                 aria-label="Close update modal"
                  className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-700"
                  onClick={() =>
                    setUpdateModal({ isOpen: false, product: null })
                  }
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center mb-4">
                <Image
                  width={100}
                  height={100}
                  src={updateModal.product.images[0]}
                  alt={updateModal.product.name}
                  className="h-16 w-16 rounded object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium">{updateModal.product.name}</h4>
                  <p className="text-sm text-zinc-400">
                    Current stock: {updateModal.product.stock}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-zinc-300 mb-1"
                >
                  New Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="0"
                  className="bg-zinc-700 border border-zinc-600 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                 aria-label="Cancel update"
                  className="px-4 py-2 rounded-md bg-zinc-700 hover:bg-zinc-600"
                  onClick={() =>
                    setUpdateModal({ isOpen: false, product: null })
                  }
                >
                  Cancel
                </button>
                <button
                 aria-label="Update stock quantity"
                  className="px-4 py-2 rounded-md bg-violet-600 hover:bg-violet-500 flex items-center"
                  onClick={handleUpdateQuantity}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <Loader className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Quantity"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InventoryManagement;
