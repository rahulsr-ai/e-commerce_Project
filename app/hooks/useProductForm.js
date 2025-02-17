"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export function useProductForm() {
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
    },
    images: [],
  });

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

    if (formData.images[0]) {
      formDataToSend.append("photo", formData.images[0]);
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
      console.error("Error:", error);
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const files = Array.from(event.target.files);
      setFormData((prev) => ({
        ...prev,
        images: [...files],
      }));
    }
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  return {
    formData,
    setFormData,
    handleSubmit,
    onImageChange,
    removeImage,
  };
}