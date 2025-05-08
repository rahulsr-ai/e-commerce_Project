"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Laptop,
  Shirt,
  Gem,
  BookOpen,
  TrendingUp,
  Zap,
  Footprints,
  House,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import axios from "axios";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import toast from "react-hot-toast";
import { findUserSearch } from "@/lib/apiCalls";

const Navbar = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const [query, SetQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState([]);
  const timeoutIdRef = useRef(null); // Store timeout ID

  const [role, setrole] = useState(null);
  const [categoryName, setcategoryName] = useState([]);
  

  const [Loading, setLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

  const handleLogout = async () => {
    setUser(null);
    setrole(null);
    localStorage.clear();

    const { data } = await axios.post("/api/auth/logout");
    console.log(data);
    if (data?.success) {
      setIsOpen(false);
      toast.success("Logged out successfully");
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    const code = localStorage.getItem("code");
    setrole(code);

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
    clearTimeout(timeoutIdRef.current);

    timeoutIdRef.current = setTimeout(() => {
      setDebouncedQuery(query); // Update the debounced query state
    }, 950); // 1 second delay (adjust as needed)

    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);




  const brands = [
    {
      name: "Best-Sellers",
      icon: <Gem size={18} />,
      path: "/Explore/Best-Sellers",
    },
    {
      name: "Trending",
      icon: <TrendingUp size={18} />,
      path: "/Explore/Trending",
    },
    {
      name: "New-Arrivals",
      icon: <BookOpen size={18} />,
      path: "/Explore/New-Arrivals",
    },
  ];

  // **Prevent rendering until hydration is complete**
  if (!Loading) {
    return null;
  }

  // **Hide Navbar for Admin**
  if (user && role == "2637") {
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


  

  const handleSearch = async (e) => {
    const value = e.target.value

    if(value.trim().length >= 3 ) { 
     const productData = await findUserSearch(value.trim())
     setDebouncedQuery(productData)
    
    }
      
    SetQuery(value);

  };

  



  const sendSearchValue = (e) => {
    if (query.trim().length < 3) {
      return;
    }

    if (e.key === "Enter") {
      setIsOpen(false);
      router.push(`/search?search=${query}`);
      SetQuery("");
      return;
    }
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
        sendSearchValue={sendSearchValue}
        debouncedQuery={debouncedQuery}
        setIconsForCategoryName={setIconsForCategoryName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        brands={brands}
        router={router}
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
        role={role}
        setrole={setrole}
        
      />

      {/* Mobile menu */}
      <MobileMenu
        user={user}
        sendSearchValue={sendSearchValue}
        query={query}
        debouncedQuery={debouncedQuery}
        SetQuery={SetQuery}
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
        role={role}
        setrole={setrole}
        handleSearch={handleSearch}
        router={router}
      />
    </nav>
  );
};

export default Navbar;
