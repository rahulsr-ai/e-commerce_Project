import { Download, Package, RefreshCw, Search, Upload } from "lucide-react";
import React, { useState } from "react";

const Header = ({
  setSearchTerm,
  searchTerm,
  setIsLoading,
  isLoading,
  products,
  stockFilter,
  setStockFilter,
}) => {
  const exportInventory = () => {
    const csvContent = [
      ["Product Name", "SKU", "Price", "Stock"],
      ...products.map((product) => [
        product.name,
        product.sku,
        product.price.toString(),
        product.stock.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "inventory-report.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const refreshInventory = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // In real InventoryPage, fetch fresh data from backend
      setIsLoading(false);
    } catch (error) {
      console.error("Error refreshing inventory:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 border-b border-violet-600">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-3">
          <Package className="h-6 w-6 text-violet-600" />
          <h1 className="text-xl font-semibold text-white">
            Inventory Management
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-black"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-black" />
          </div>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-violet-500 focus:border-violet-500
          text-black"
          >
            <option value="all">All Stock Levels</option>
            <option value="low">Low Stock</option>
            <option value="medium">Medium Stock</option>
            <option value="high">High Stock</option>
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={refreshInventory}
          disabled={isLoading}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white
         bg-violet-600 hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <RefreshCw
            className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
        <button
          onClick={exportInventory}
          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Download className="h-4 w-4 mr-1" />
          Export CSV
        </button>
        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <Upload className="h-4 w-4 mr-1" />
          Import CSV
        </button>
      </div>
    </div>
  );
};

export default Header;
