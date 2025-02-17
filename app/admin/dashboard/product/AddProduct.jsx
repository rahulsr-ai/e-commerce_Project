"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
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

import { useSidebar } from "@/helpers/SidebarContext";

function AddProduct() {
  const { issidebarOpen, setIsSidebarOpen } = useSidebar();

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [photo, setPhoto] = useState(null);
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
      trending: false,
      deals: false,
    },
    images: [],
  });

  const [RealCategory, setRealCategory] = useState([]);
  const [RealsubCategory, setRealsubCategory] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [csvFile, setCsvFile] = useState(null);
  const fileInputRef = useRef(null);

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

      // Clean up the URL when no longer needed
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

    try {
      const { data } = await toast.promise(
        axios.post("/api/product", formDataToSend, {
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
          },
          images: [],
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
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

  const GetallCategory = async () => {
    const { data } = await axios.get("/api/category", {
      cache: "force-cache", // 🔥 Equivalent to getStaticProps
    });
    const response = await axios.get("/api/category/subcategory", { 
      cache: "force-cache", // 🔥 Equivalent to getStaticProps
    });

    console.log("Data:", data);
    console.log("Response:", response);


    if (data?.success && response?.data.success) {
      setRealCategory(() =>  data.category);
      setRealsubCategory(() => response?.data.GetSubcategory);
    }


  };


  console.log(RealCategory);
  console.log(RealsubCategory);
  

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !subcategoryName.trim()) {
      toast.error("Both Fields are required");
      return;
    }

    try {
      // Send request with toast notifications
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

      console.log("Data:", data);

      // ✅ If category is successfully created, reset input fields
      if (data?.success) {
        setCategoryName("");
        setSubcategoryName("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    GetallCategory();
    // Simulate loading data
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
      className={`min-h-screen bg-black border-r border-violet-800/20 ${
        issidebarOpen ? "ml-0" : "ml-14"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-neutral-950 border-r  border-violet-800/20 rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => setActiveTab("single")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "single"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Single Product Upload
              </button>
              <button
                onClick={() => setActiveTab("bulk")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "bulk"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Bulk Upload
              </button>

              <button
                onClick={() => setActiveTab("createCategory")}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === "createCategory"
                    ? "border-b-2 border-violet-800 text-violet-600"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                Create Category
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
                      // required
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
                            trending: false,
                          },
                          images: [],
                        })
                      }
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
                    >
                      <RefreshCcw className="h-4 w-4 mr-2" />
                      Reset Form
                    </button>
                  </div>
                </form>
              </div>

              {/* Image Upload Section */}
              <div>
                <div className="border-2 border-dashed rounded-lg p-6  border-gray-300 hover:border-gray-400 ">
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
                        // onChange={handleImageUpload}
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
                            // src={photo[0].name}
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
          ) : activeTab === "bulk" ? (
            // Bulk Upload Section
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <div className="bg-black border-r border-violet-800/20 p-6 rounded-lg border border-gray-200">
                  <div className="text-center mb-6">
                    <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-white">
                      Bulk Product Upload
                    </h3>
                    <p className="mt-1 text-sm text-violet-500">
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
            </div> // if active tab is create category
          ) : (
            <div className="p-6">
              <div className="max-w-3xl mx-auto">
                <div className="bg-black border-r border-violet-800/20 p-6 rounded-lg border border-gray-200">
                  <div className="text-center mb-6">
                    {/* <FileSpreadsheet className="mx-auto h-12 w-12 text-gray-400" /> */}
                    <h1 className="mt-2 text-xl font-medium text-white">
                      Create category
                    </h1>
                    <p className="mt-1 text-sm text-violet-500">
                      Create a new category and subcategory
                    </p>
                  </div>

                  <form onSubmit={handleCreateCategory}>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm  font-medium text-white">
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
                        <label className="block text-sm font-medium text-white">
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
                        type="submit"
                        className="inline-flex items-center py-2 px-4  border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-violet-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Create Category
                      </button>
                      <button
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
          )}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
