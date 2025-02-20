"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { useSidebar } from "@/helpers/SidebarContext";

import dynamic from "next/dynamic";
import Loader from "@/app/components/useComponents/Loader";

const Header = dynamic(
  () => import("@/app/components/adminComponents/inventory/Header"),
  { ssr: false }
);

const EditStockModel = dynamic(
  () => import("@/app/components/adminComponents/inventory/EditStockModel"),
  { ssr: false }
);

const Table = dynamic(
  () => import("@/app/components/adminComponents/inventory/Table"),
  { ssr: false }
);

// Sample data - expanded for pagination
const initialProducts = [
  {
    id: "1",
    name: "Wireless Earbuds",
    sku: "WE-001",
    price: 99.99,
    stock: 150,
  },
  { id: "2", name: "Smart Watch", sku: "SW-002", price: 199.99, stock: 75 },
  { id: "3", name: "Laptop Pro", sku: "LP-003", price: 1299.99, stock: 25 },
  { id: "4", name: "Gaming Mouse", sku: "GM-004", price: 59.99, stock: 200 },
  {
    id: "5",
    name: "Mechanical Keyboard",
    sku: "MK-005",
    price: 129.99,
    stock: 100,
  },
  { id: "6", name: "USB-C Hub", sku: "UC-006", price: 49.99, stock: 85 },
  {
    id: "7",
    name: "Wireless Charger",
    sku: "WC-007",
    price: 39.99,
    stock: 120,
  },
  {
    id: "8",
    name: "Bluetooth Speaker",
    sku: "BS-008",
    price: 89.99,
    stock: 45,
  },
  { id: "9", name: "Webcam HD", sku: "WH-009", price: 79.99, stock: 30 },
  { id: "10", name: "Gaming Headset", sku: "GH-010", price: 149.99, stock: 60 },
];

function InventoryPage() {
  const { isSidebarOpen } = useSidebar();

  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [stockFilter, setStockFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const [Skeleton, setSkeleton] = useState(true);

  // Filter products based on search and stock level
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStockFilter =
      stockFilter === "all" ||
      (stockFilter === "low" && product.stock <= 20) ||
      (stockFilter === "medium" && product.stock > 20 && product.stock <= 50) ||
      (stockFilter === "high" && product.stock > 50);

    return matchesSearch && matchesStockFilter;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setNewStock(product.stock.toString());
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (Skeleton) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-black border-r border-violet-800/20 p-4 sm:p-6 lg:p-8 ">
      <div
        className={`bg-neutral-950 rounded-lg shadow-lg overflow-hidden ${
          isSidebarOpen ? "w-full" : "ml-12"
        }`}
      >
        {/* Header */}

        <Header
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          products={products}
          stockFilter={stockFilter}
          setStockFilter={setStockFilter}
        />

        {/* Low Stock Alert */}
        {products.some((p) => p.stock <= 20) && (
          <div className="bg-yellow-50 p-4 border-b border-yellow-100">
            <div className="flex">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Low Stock Alert
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  Some products are running low on stock. Please review and
                  restock as needed.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Table */}

        <Table currentItems={currentItems} handleEditClick={handleEditClick} />

        {/* Pagination */}
        <div className="bg-black px-4 py-3 flex items-center justify-between border-t border-violet-600 sm:px-6">
          <div className="flex-1 flex justify-end sm:hidden">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="">
              <p className="text-sm text-violet-600">
                Showing{" "}
                <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastItem, filteredProducts.length)}
                </span>{" "}
                of{" "}
                <span className="font-medium">{filteredProducts.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Stock Modal */}

      <EditStockModel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedProduct={selectedProduct}
        newStock={newStock}
        setNewStock={setNewStock}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setSelectedProduct={setSelectedProduct}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
}

export default InventoryPage;
