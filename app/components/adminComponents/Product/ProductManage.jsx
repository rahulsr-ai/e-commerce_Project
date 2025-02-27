"use client";
import React, { useState, useEffect } from "react";
import {
  Upload,
  Package,
  FileSpreadsheet,
  HelpCircle,
  Download,
} from "lucide-react";

import { useSidebar } from "@/context/SidebarContext";

const CATEGORIES = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports",
  "Toys",
];

const ManageProducts = () => {
  const {isSidebarOpen} = useSidebar();



  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("single");
  const [product, setProduct] = useState({});
  const [csvFile, setCsvFile] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure the component only renders on the client
  useEffect(() => {
    setIsClient(true);
    setIsLoading(true); // Simulate data fetching or initial loading
  }, []);

  const handleProductChange = (e) => {
    
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    }
  };

  const handleSingleUpload = (e) => {
    e.preventDefault();
    console.log("Uploading single product:", product);
    // Add your API call here
  };

  const handleBulkUpload = (e) => {
    e.preventDefault();
    console.log("Uploading CSV file:", csvFile);
    // Add your API call here
  };

  const handleCsvChange = (e) => {
    if (e.target.files?.[0]) {
      setCsvFile(e.target.files[0]);
    }
  };

  const downloadTemplate = () => {
    console.log("Downloading CSV template");
    // Add template download logic here
  };

  if (!isClient) return null; // Prevent server rendering before hydration

  return (
    isLoading ? (
      <div className="min-h-screen bg-white mx-auto  pl-16">
        <div className="bg-blackshadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-3xl font-bold text-black ">Manage Products</h1>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setMode("single")}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                mode === "single"
                  ? "bg-black text-white"
                  : "bg-[#f5f5f5] text-black hover:bg-gray-50"
              } transition-colors duration-200 shadow-sm`}
            >
              <Package className="w-5 h-5 mr-2" />
              Single Product Upload
            </button>
            <button
              onClick={() => setMode("bulk")}
              className={`flex items-center px-4 py-2 rounded-lg font-medium ${
                mode === "bulk"
                  ? "bg-black text-white"
                  : "bg-[#f5f5f5] text-black hover:bg-gray-50"
              } transition-colors duration-200 shadow-sm`}
            >
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Bulk Product Upload
            </button>
          </div>

          <div className=" rounded-lg shadow-sm p-6">
            {mode === "single" ? (
              <form onSubmit={handleSingleUpload} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Product Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={product.name || ""}
                      onChange={handleProductChange}
                      className="mt-1 block w-[100%] bg-neutral-100 px-3 py-2 text-black rounded-md border-gray-300 shadow-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Price<span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        required
                        min="0"
                        step="0.01"
                        value={product.price || ""}
                        onChange={handleProductChange}
                        className="block w-[100%] pl-7 px-3 py-2 text-black rounded-md border-gray-300 shadow-sm outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black">
                      Stock Quantity<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      required
                      min="0"
                      value={product.stock || ""}
                      onChange={handleProductChange}
                      className="mt-1 block w-[100%] bg-neutral-100 px-3 py-2 text-black rounded-md border-gray-300 shadow-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black ">
                      Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      required
                      value={product.category || ""}
                      onChange={handleProductChange}
                      className="mt-1 text-black block w-[100%] px-3 py-2.5 text-black.5 rounded-md border-gray-300 shadow-sm outline-none"
                    >
                      <option value="">Select a category</option>
                      {CATEGORIES.map((category) => (
                        <option key={category} value={category} className="text-black">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button className="px-3 py-2 rounded font-medium bg-violet-600 hover:bg-violet-900 ">
                      Add Product
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={handleBulkUpload} className="space-y-6 border-2 p-2 bg-white">
                <label className="block font-medium text-2xl text-black">
                  Upload CSV File
                </label>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCsvChange}
                  className="block w-[100%] px-3 text-violet-400"
                />
                <button
                  type="button"
                  onClick={downloadTemplate}
                  className="text-blue-600 hover:underline"
                >
                  <Download className="inline w-4 h-4 mr-1" />
                  Download Template
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-black rounded-md"
                >
                  Upload CSV
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    ) : (  <div>  this will never rendered </div>  )
  );
};

export default ManageProducts;
