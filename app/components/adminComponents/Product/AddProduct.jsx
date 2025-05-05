import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { useSidebar } from "@/context/SidebarContext";

// Lazy load components
const SingleProductUpload = lazy(() => import("./SingleUpload"));
const BulkUpload = lazy(() => import("./BulkUpload"));
const CreateCategory = lazy(() => import("./CreateCategory"));

function AddProduct() {
  const { issidebarOpen } = useSidebar();
  const [activeTab, setActiveTab] = useState("single");
  const [isLoading, setIsLoading] = useState(true);
  const [RealCategory, setRealCategory] = useState([]);
  const [RealsubCategory, setRealsubCategory] = useState([]);

  const GetallCategory = async () => {
    const { data } = await axios.get("/api/category", {
      cache: "force-cache",
    });
    const response = await axios.get("/api/category/subcategory", {
      cache: "force-cache",
    });

    if (data?.success && response?.data.success) {
      setRealCategory(() => data.category);
      setRealsubCategory(() => response?.data.GetSubcategory);
    }
  };

  useEffect(() => {
    GetallCategory();
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

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
    <div
      className={`min-h-screen bg-[var(--background-color)] border-r border-violet-800/20 ${
        issidebarOpen ? "ml-0" : "ml-14"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-950 border-r border-violet-800/20 rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
               aria-label="Back to dashboard"
                onClick={() => setActiveTab("single")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "single"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-200-500 hover:text-[var(--primary-text-color)]"
                }`}
              >
                Single Product Upload
              </button>
              <button
               aria-label="Back to dashboard"
                onClick={() => setActiveTab("bulk")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "bulk"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-200-500 hover:text-[var(--primary-text-color)]"
                }`}
              >
                Bulk Upload
              </button>
              <button
               aria-label="Back to dashboard"
                onClick={() => setActiveTab("createCategory")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "createCategory"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-200-500 hover:text-[var(--primary-text-color)]"
                }`}
              >
                Create Category
              </button>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
              </div>
            }
          >
            {activeTab === "single" && (
              <SingleProductUpload
                RealCategory={RealCategory}
                RealsubCategory={RealsubCategory}
              />
            )}
            {activeTab === "bulk" && <BulkUpload />}
            {activeTab === "createCategory" && <CreateCategory />}
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
