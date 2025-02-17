//@ts-nocheck
"use client";

import React, { useState, useEffect } from "react";
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

  const [role, setrole] = useState("");

  const [activelink, setactivelink] = useState("");

  const [categoryName, setcategoryName] = useState([]);

  const [Loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

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

  const categories = [
    { name: "Electronics", icon: <Laptop size={18} /> },
    { name: "Mobile Phones", icon: <Smartphone size={18} /> },
    { name: "Audio", icon: <Headphones size={18} /> },
    { name: "Cameras", icon: <Camera size={18} /> },
    { name: "Fashion", icon: <Shirt size={18} /> },
    { name: "Watches", icon: <Watch size={18} /> },
  ];

  const brands = [
    { name: "Best-Sellers", icon: <Gem size={18} /> },
    { name: "New-Arrivals", icon: <BookOpen size={18} /> },
    { name: "Limited-Edition", icon: <BookOpen size={18} /> },
  ];

  // **Prevent rendering until hydration is complete**
  if (!Loading) {
    return null;
  }

  // **Hide Navbar for Admin**
  if (user && user.role === "admin") {
    return null;
  }

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
        
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
        brands={brands}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        brandsOpen={brandsOpen}
        setBrandsOpen={setBrandsOpen}
        activelink={activelink}
        setactivelink={setactivelink}
        user={user}
        categoryName={categoryName}
        setcategoryName={setcategoryName}
        handleLogout={handleLogout}
      />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        categories={categories}
        brands={brands}
        categoryOpen={categoryOpen}
        setCategoryOpen={setCategoryOpen}
        brandsOpen={brandsOpen}
        setBrandsOpen={setBrandsOpen}
        handleLogout={handleLogout}
       
      />
    </nav>
  );
};

export default Navbar;
