"use client";
import React, { useRef } from "react";
import { Upload, X, ImageIcon, Save, RefreshCcw } from "lucide-react";
import { useProductForm } from "@/hooks/useProductForm";
import { useCategories } from "@/hooks/useCategories";

function SingleProductUpload() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { formData, setFormData, handleSubmit, onImageChange, removeImage } = useProductForm();
  const { RealCategory, RealsubCategory } = useCategories();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields */}
          <div>
            <label className="block text-sm font-medium text-white">Product Name</label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
            />
          </div>

          {/* Other form fields... */}
          
          <div className="flex space-x-4">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Product
            </button>
            <button
              type="reset"
              onClick={() => setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                category: "",
                subcategory: "",
                attributes: {
                  newArrival: false,
                  bestSeller: false,
                  trending: false,
                },
                images: [],
              })}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset Form
            </button>
          </div>
        </form>
      </div>

      <div>
        {/* Image upload section */}
        <div className="border-2 border-dashed rounded-lg p-6 border-gray-300 hover:border-gray-400">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-violet-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose Images
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={onImageChange}
                accept="image/*"
                multiple
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Image preview */}
        {formData.images.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-white mb-4">Selected Images</h4>
            <div className="grid grid-cols-1 gap-4">
              {formData.images.map((file, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleProductUpload;