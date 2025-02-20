//@ts-nocheck
"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  Laptop,
  Smartphone,
  Headphones,
  Camera,
  Shirt,
  Watch,
  Gem,
  BookOpen,
  Home,
  User,
  Heart,
  TrendingUp,
  Zap,
  Footprints,
  House,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import axios from "axios";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [query, SetQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timeoutIdRef = useRef(null); // Store timeout ID
  const [Searchloading, setSearchloading] = useState(false); // For loading state if needed

  const [role, setrole] = useState("");
  const [categoryName, setcategoryName] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [SearchResults, setSearchResults] = useState([]);

  const handleLogout = async () => {
    setUser(null);
    setrole("");
    alert("Logging out");
    const { data } = await axios.post("/api/auth/logout");
    console.log(data);
    if (data?.success) {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    const Role = localStorage.getItem("code");
    setrole(Role);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const getAllCategory = async () => {
      try {
        const { data } = await axios.get("/api/category");

        if (data?.success) {
          setcategoryName(data.category);
        }
      } catch (error) {
        console.log("Frontend error : ", error);
      }
    };

    getAllCategory();

    window.addEventListener("scroll", handleScroll);
    setLoading(true);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brands = [
    { name: "Best-Sellers", icon: <Gem size={18} /> },
    { name: "Trending", icon: <TrendingUp size={18} /> },
    { name: "New-Arrivals", icon: <BookOpen size={18} /> },
  ];

  // **Prevent rendering until hydration is complete**
  if (!Loading) {
    return null;
  }

  // **Hide Navbar for Admin**
  if (user && user.role === "admin") {
    return null;
  }

  const setIconsForCategoryName = (categoryName) => {
    switch (categoryName) {
      case "electronic":
        return <Zap size={18} />;
        break;
      case "fashion":
        return <Shirt size={18} />;
        break;
      case "footwear":
        return <Footprints size={18} />;
        break;
      case "accessories":
        return <Laptop size={18} />;
        break;
      case "home":
        return <House size={18} />;
        break;

      default:
        return <Laptop size={18} />;
        break;
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    SetQuery(value); // Update query immediately to reflect in the UI

    // Clear any previous timeout if the user is typing
    clearTimeout(timeoutIdRef.current);

    // Set a new timeout to call the database/search function after 500ms
    timeoutIdRef.current = setTimeout(() => {
      setDebouncedQuery(value); // Update the debounced query state

      // Simulate database/API call (replace this with actual DB/API logic)
      fetchDatabaseResults(value);
    }, 950); // 1 second delay (adjust as needed)
  };

  const fetchDatabaseResults = async (query) => {
    setSearchloading(true);

    if (query.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    const { data } = await axios.get(`/api/product/search?search=${query}`);
    setSearchloading(false);
    setSearchResults(data?.products);

    console.log(data);
  };

  return (
    //  Loading &&
    <nav
      className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
        !isScrolled
          ? "bg-gradient-to-b from-neutral-900 to-transparent backdrop-blur-sm"
          : "bg-gradient-to-b from-black to-transparent backdrop-blur-sm"
      } ${role == "2637" ? "hidden" : ""}`}
    >
      <DesktopMenu
        debouncedQuery={debouncedQuery}
        setIconsForCategoryName={setIconsForCategoryName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        brands={brands}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        brandsOpen={brandsOpen}
        setBrandsOpen={setBrandsOpen}
        user={user}
        categoryName={categoryName}
        handleLogout={handleLogout}
        query={query}
        SetQuery={SetQuery}
        handleSearch={handleSearch}
      />

      {/* Mobile menu */}
      <MobileMenu
        setIconsForCategoryName={setIconsForCategoryName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        brands={brands}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        brandsOpen={brandsOpen}
        setBrandsOpen={setBrandsOpen}
        handleLogout={handleLogout}
        categoryName={categoryName}
        setcategoryName={setcategoryName}
      />
    </nav>
  );
};

export default Navbar;
