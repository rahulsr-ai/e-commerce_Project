"use client";

import React, { useRef, useState } from 'react';
import {
  Upload,
  X,
  ImageIcon,
  Save,
  RefreshCcw,
} from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

const SingleProductUpload = ({ RealCategory, RealsubCategory }) => {
  const [photo, setPhoto] = useState(null);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
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
      deals: false,
    },
    images: [],
  });

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: [],
    }));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const newPhotoURL = URL.createObjectURL(file);
      setPhoto(file);

      const files = Array.from(event.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...files],
      }));

      return () => URL.revokeObjectURL(newPhotoURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      category: formData.category,
      subcategory: formData.subcategory,
      attributes: formData.attributes,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("formData", JSON.stringify(formDataObj));

    if (photo) {
      formDataToSend.append("photo", photo);
    }

    console.log("formDataToSend", formDataToSend);
    

    try {
      const { data } = await toast.promise(
        axios.post("/api/product/create", formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        }),
        {
          loading: "Uploading Product...",
          success: "Product added successfully!",
          error: "Failed to add product",
        }
      );

      if (data?.success) {
        setFormData({
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
            deals: false,
          },
          images: [],
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
      {/* Form Section */}
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-violet-900 sm:text-sm">$</span>
                </div>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                  className="pl-7 block w-full rounded px-2 py-2 text-black border-gray-300 focus:border-violet-800 focus:ring-violet-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    stock: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => {
                  setFormData((prev) => ({
                    ...prev,
                    category: e.target.value,
                    subcategory: "",
                  }));
                }}
                className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
                required
              >
                <option value="">Select Category</option>
                {RealCategory.map((category) => (
                  <option key={category.name} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white">
                Subcategory
              </label>
              <select
                name="subcategory"
                value={formData.subcategory}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subcategory: e.target.value,
                  }))
                }
                className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-violet-800 focus:ring-violet-500"
                required
                disabled={!formData.category}
              >
                <option value="">Select Subcategory</option>
                {RealsubCategory.filter(
                  (sub) => sub.category === formData.category
                ).map((sub) => (
                  <option key={sub.name} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Special Attributes
            </label>
            <div className="space-y-2">
              {Object.entries(formData.attributes).map(([key, value]) => (
                <label key={key} className="inline-flex items-center mr-6">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        attributes: {
                          ...prev.attributes,
                          [key]: e.target.checked,
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

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
              onClick={() =>
                setFormData({
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
                })
              }
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Reset Form
            </button>
          </div>
        </form>
      </div>

      {/* Image Upload Section */}
      <div>
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

        {/* Image Preview */}
        {formData.images.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-white mb-4">
              Selected Images
            </h4>
            <div className="grid grid-cols-1 gap-4">
              {formData.images.map((file, index) => (
                <div
                  key={index}
                  className="relative rounded-lg overflow-hidden group"
                >
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
};

export default SingleProductUpload;