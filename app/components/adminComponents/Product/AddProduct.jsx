"use client";

import React, { useState, useEffect } from "react";
import { useSidebar } from "@/helpers/SidebarContext";
import SingleProductUpload from "./SingleProductUpload";
import BulkUpload from "./BulkUpload";
import CreateCategory from "./CreateCategory";

function AddProduct() {
  const { issidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("single");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-black border-r border-violet-800/20 ${issidebarOpen ? "ml-0" : "ml-14"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-950 border-r border-violet-800/20 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              {["single", "bulk", "createCategory"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-violet-800 text-violet-600"
                      : "text-gray-500 hover:text-white"
                  }`}
                >
                  {tab === "single"
                    ? "Single Product Upload"
                    : tab === "bulk"
                    ? "Bulk Upload"
                    : "Create Category"}
                </button>
              ))}
            </div>
          </div>

          {activeTab === "single" && <SingleProductUpload />}
          {activeTab === "bulk" && <BulkUpload />}
          {activeTab === "createCategory" && <CreateCategory />}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;