"use client";

import React, { useState, useCallback, useRef } from "react";
import {
  Upload,
  X,
  Image as ImageIcon,
  Save,
  RefreshCcw,
  FileSpreadsheet,
  AlertCircle,
  Check,
  ChevronDown,
} from "lucide-react";

import toast from "react-hot-toast";
import axios from "axios";


const categories = {
  electronics: ["Phones", "Laptops", "Accessories"],
  clothing: ["Men", "Women", "Kids"],
  home: ["Furniture", "Decor", "Kitchen"],
};


function AddProduct() {


  const [activeTab, setActiveTab] = useState("single");
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
      featured: false,
    },
    images: [],
  });


  
  const [dragActive, setDragActive] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef(null);



  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);


  const handleDrop = useCallback(() => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));
    }
  }, []);



  const handleImageUpload = (e) => {
    if (e.target.files?.length) {

      const files = Array.from(e.target.files);
      // setFormData((prev) => ({
      //   ...prev,
      //   images: [...prev.images, ...files],
      // }));

      setFormData((prev) => ({
        ...prev,
        images: [...files],
      }));

     
    }
  };

 


  const removeImage = (index) => {

    // setFormData((prev) => ({
    //   ...prev,
    //   images: prev.images.filter((_, i) => i !== index),
    // }));

    setFormData((prev) => ({
      ...prev,
      images: [],
    }));

  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/api/product", formData);
      console.log("Data:", data);
    } catch (error) {
      toast.error("Frontend Error adding product!");
      console.log("Error:", error);
    }

    // Handle form submission
    console.log("Form submitted:", formData);

    toast.success("Product added successfully!");

    // setFormData({
    //   name: "",
    //   description: "",
    //   price: "",
    //   stock: "",
    //   category: "",
    //   subcategory: "",
    //   attributes: {
    //     newArrival: false,
    //     bestSeller: false,
    //     featured: false,
    //   },
    //   images: [],
    // });


  };



  const handleCsvUpload = (e) => {

    if (e.target.files?.[0]) {
      setCsvFile(e.target.files[0]);
    }

  };

  const ProcessCsvUplaod = () => {

    toast.success("CSV file uploaded successfully!");
    setCsvFile(null);

  };

  return (

    <div className="min-h-screen bg-black border-r border-violet-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-zinc-950 border-r  border-violet-800/20 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "single"
                    ? "border-b-2 border-purple-800 text-violet-600"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Single Product Upload
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "bulk"
                    ? "border-b-2 border-purple-800 text-violet-600"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Bulk Upload
              </button>
            </div>
          </div>

          {activeTab === "single" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
              {/* Form Section */}
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-white">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-purple-800 focus:ring-violet-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      rows={4}
                      className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-purple-800 focus:ring-violet-500"
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
                          <span className="text-purple-900 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          className="pl-7 block w-full rounded px-2 py-2 text-black border-gray-300 focus:border-purple-800 focus:ring-violet-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">
                        Stock
                      </label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            stock: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-purple-800 focus:ring-violet-500"
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
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value,
                            subcategory: "",
                          }))
                        }
                        className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-purple-800 focus:ring-violet-500"
                        required
                      >
                        <option value="">Select Category</option>
                        {Object.keys(categories).map((category) => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white">
                        Subcategory
                      </label>
                      <select
                        value={formData.subcategory}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            subcategory: e.target.value,
                          }))
                        }
                        className="mt-1 block w-full rounded px-2 py-2 text-black border-gray-300 shadow-sm focus:border-purple-800 focus:ring-violet-500"
                        required
                        disabled={!formData.category}
                      >
                        <option value="">Select Subcategory</option>
                        {formData.category &&
                          categories[formData.category].map((sub) => (
                            <option key={sub} value={sub}>
                              {sub}
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
                      {Object.entries(formData.attributes).map(
                        ([key, value]) => (
                          <label
                            key={key}
                            className="inline-flex items-center mr-6"
                          >
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
                        )
                      )}
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
                            featured: false,
                          },
                          images: [],
                        })
                      }
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-purple-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Image Upload Section */}
              <div>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 ${
                    dragActive
                      ? "border-purple-800 bg-violet-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
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
                        onChange={handleImageUpload}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      or drag and drop images here
                    </p>
                  </div>
                </div>


                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-white mb-4">
                      Selected Images
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {formData.images.map((file, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden group"
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover"
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

          ) : (
            // Bulk Upload Section
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <div className="bg-black border-r border-violet-800/20 p-6 rounded-lg border border-gray-200">
                  <div className="text-center mb-6">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-white">
                      Bulk Product Upload
                    </h3>
                    <p className="mt-1 text-sm text-purple-500">
                      Upload a CSV file containing multiple products
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-white">
                      Choose CSV File
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-medium
                        file:bg-violet-50 file:text-violet-700
                        hover:file:bg-violet-100"
                    />
                  </div>

                  {csvFile && (
                    <div className="mt-6">
                      <div className="flex items-center space-x-2 text-sm text-white">
                        <Check className="h-5 w-5 text-green-500" />
                        <span>File selected: {csvFile.name}</span>

                        <button
                          onClick={() => setCsvFile(null)}
                          className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all duration-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => ProcessCsvUplaod()}
                        type="button"
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Process CSV File
                      </button>
                    </div>
                  )}

                  <div className="mt-6">
                    <div className="rounded-md bg-violet-50 p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <AlertCircle className="h-5 w-5 text-violet-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-violet-800">
                            CSV Format Guidelines
                          </h3>
                          <div className="mt-2 text-sm text-violet-700">
                            <p>Required columns:</p>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                              <li>name</li>
                              <li>description</li>
                              <li>price</li>
                              <li>stock</li>
                              <li>category</li>
                              <li>subcategory</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )}

        </div>
      </div>
    </div>
  );
}

export default AddProduct;
