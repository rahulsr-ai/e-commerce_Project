"use client"


import React, { useState } from 'react';
import { Save, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !subcategoryName.trim()) {
      toast.error("Both Fields are required");
      return;
    }

    try {
      const { data } = await toast.promise(
        axios.post("/api/category", {
          categoryName,
          subcategoryName,
        }),
        {
          loading: "Processing...",
          success: "Success !",
          error: "Failed",
        }
      );

      if (data?.success) {
        setCategoryName("");
        setSubcategoryName("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="p-6 border">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[var(--background-color)] border-r border-violet-800/20 p-6 rounded-lg border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="mt-2 text-xl font-medium text-[var(--primary-text-color)]">
              Create category
            </h1>
            <p className="mt-1 text-sm text-violet-500">
              Create a new category and subcategory
            </p>
          </div>

          <form onSubmit={handleCreateCategory}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--primary-text-color)]">
                  Category Name
                </label>
                <input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  type="text"
                  className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--primary-text-color)]">
                  Subcategory Name
                </label>
                <input
                  value={subcategoryName}
                  onChange={(e) => setSubcategoryName(e.target.value)}
                  type="text"
                  className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 justify-between mt-4">
              <button
               aria-label='Create category'
                type="submit"
                className="inline-flex items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-800 hover:text-[var(--primary-text-color)] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Category
              </button>
              <button
               aria-label='Reset form'
                type="reset"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Reset Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;