"use client"

import { useState, useEffect } from "react";
import axios from "axios";



export function useCategories() {
  const [RealCategory, setRealCategory] = useState([]);
  const [RealsubCategory, setRealsubCategory] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesRes, subcategoriesRes] = await Promise.all([
          axios.get("/api/category", { cache: "force-cache" }),
          axios.get("/api/category/subcategory", { cache: "force-cache" }),
        ]);

        if (categoriesRes.data?.success && subcategoriesRes.data?.success) {
          setRealCategory(categoriesRes.data.category);
          setRealsubCategory(subcategoriesRes.data.GetSubcategory);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return { RealCategory, RealsubCategory };
}