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

const Navbar = () => {
  const router = useRouter();
  let isCategoryPage = router.pathname === "/category";

  const { user, setUser } = useAuth();

  const [Loading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const handleLogout = async () => {
    alert("Logging out");
    const { data } = await axios.post("/api/auth/logout");
    console.log(data);
    if (data.message === "Logged out successfully") {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    isCategoryPage = router.pathname === "/category";
    setIsLoading(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    useAuth();
  }, []);

  function logout() {
    setUser({
      token: "",
      user: {},
    });
  }

  const categories = [
    { name: "Electronics", icon: <Laptop size={18} /> },
    { name: "Mobile Phones", icon: <Smartphone size={18} /> },
    { name: "Audio", icon: <Headphones size={18} /> },
    { name: "Cameras", icon: <Camera size={18} /> },
    { name: "Fashion", icon: <Shirt size={18} /> },
    { name: "Watches", icon: <Watch size={18} /> },
  ];

  const brands = [
    { name: "Best Sellers", icon: <Gem size={18} /> },
    { name: "New Arrivals", icon: <BookOpen size={18} /> },
    { name: "Limited Edition", icon: <BookOpen size={18} /> },
  ];

  return (
    Loading && (
      <nav
        className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${
          !isScrolled
            ? "bg-gradient-to-b from-neutral-900 to-transparent backdrop-blur-sm"
            : "bg-gradient-to-b from-black to-transparent backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
          <div className="flex items-center justify-between  h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center space-x-2">
              <ShoppingBag className="text-[#9747ff]" size={24} />
              <span className="text-white font-bold text-xl tracking-tight">
                StoreX
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
              <Link
                href="/"
                className="text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-3 group"
              >
                {/* <Home
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              /> */}
                <span className="mr-4">Home</span>
              </Link>

              <Link
                href="/deals"
                className="text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-3 group"
              >
                {/* <Home
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              /> */}
                <span className="mr-4">Deals</span>
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setCategoryOpen(true)}
                  onMouseLeave={() => {
                    setTimeout(() => {
                      setCategoryOpen(false);
                    }, 2000);
                  }}
                  className="text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-1"
                >
                  <span>Categories</span>
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>
                {categoryOpen && (
                  <div
                    onMouseEnter={() => setCategoryOpen(true)}
                    onMouseLeave={() => {
                      setTimeout(() => {
                        setCategoryOpen(false);
                      }, 7000);
                    }}
                    className="absolute top-full left-0 mt-1 w-56 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black/5 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
                  >
                    <div className="py-1">
                      {categories.map((category, i) => (
                        <Link
                          key={category.name}
                          // onClick={() => setCategoryOpen(false)}
                          href={`/category`}
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                        >
                          <span className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200">
                            {category.icon}
                          </span>
                          <span className="ml-3">{category.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Brands Dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setBrandsOpen(true)}
                  onMouseLeave={() => setBrandsOpen(false)}
                  className="text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-1"
                >
                  <span>Shop</span>
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-transform duration-300"
                  />
                </button>
                {brandsOpen && (
                  <div
                    onMouseEnter={() => setBrandsOpen(true)}
                    onMouseLeave={() => setBrandsOpen(false)}
                    className="absolute top-full left-0 mt-1 w-56 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black/5 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
                  >
                    <div className="py-1">
                      {brands.map((brand) => (
                        <Link
                          key={brand.name}
                          href="brand/dynamicName"
                          className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition-colors duration-200"
                        >
                          <span className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200">
                            {brand.icon}
                          </span>
                          <span className="ml-3">{brand.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Bar */}
              {!isCategoryPage && (
                <div className={`flex-1 max-w-xs`}>
                  <div className="relative group">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-1.5 pr-8 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
                    />
                    <Search
                      className="absolute right-3 top-1.5 text-white/60 group-hover:text-white/80 transition-colors duration-200"
                      size={20}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <Link href="/sign-in">
                <button className="text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-2 group">
                  <User
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  Sign in
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105">
                  Sign up
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white/90 hover:text-white p-2 transition-colors duration-200"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? "max-h-screen opacity-100 bg-gradient-to-b from-black/50s to-transparent backdrop-blur-sm"
              : "max-h-0 opacity-0"
          } overflow-hidden `}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
                <Search
                  className="absolute right-3 top-2.5 text-white/60"
                  size={20}
                />
              </div>
            </div>

            {/* Mobile Links */}
            <Link
              onClick={() => setIsOpen(false)}
              href="/"
              className="flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              {/* <Home size={18} /> */}
              <span>Home</span>
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/deals"
              className="flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              {/* <Home size={18} /> */}
              <span>Deals</span>
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              href="/profile"
              className="flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200"
            >
              {/* <Home size={18} /> */}
              <span>Profile</span>
            </Link>

            {/* <div className="px-3 py-2">
              <button
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className="w-full text-left flex justify-between items-center text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Admin</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    isAdminOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mt-2 space-y-1 transition-all duration-200 ${
                  brandsOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {[
                  "admin/Product",
                  "admin/dashboard/Order",
                  "admin/dashboard/product",
                ].map((brand) => (
                  <Link
                    key={brand}
                    href={brand}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    <span>{brand}</span>
                  </Link>
                ))}
              </div>
            </div> */}

            {/* Mobile Categories */}
            <div className="px-3 py-2">
              <button
                onClick={() => setCategoryOpen(!categoryOpen)}
                className="w-full text-left flex justify-between items-center text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Categories</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mt-2 space-y-1 transition-all duration-200 ${
                  categoryOpen ? "opacity-100 h-fit" : "opacity-0 h-0"
                }`}
              >
                {categories.map((category) => (
                  <Link
                    onClick={() => setIsOpen(false)}
                    key={category.name}
                    href={`/category`}
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    {category.icon}
                    <span>{category.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Brands */}
            <div className="px-3 py-2">
              <button
                onClick={() => setBrandsOpen(!brandsOpen)}
                className="w-full text-left flex justify-between items-center text-white/90 hover:text-white transition-colors duration-200"
              >
                <span>Shop</span>
                <ChevronDown
                  size={16}
                  className={`transform transition-transform duration-200 ${
                    brandsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`mt-2 space-y-1 transition-all duration-200 ${
                  brandsOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href="brand/byname"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-colors duration-200"
                  >
                    {brand.icon}
                    <span>{brand.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            <div className="px-3 py-2 space-y-2">
              {/* <button className="flex items-center space-x-2 text-white/90 hover:text-white w-full px-4 py-2 rounded-lg transition-colors duration-200">
              <User size={18} />
              <span className="text-center">Sign in</span>
            </button> */}

              {!user.token ? (
                <>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/sign-in">Sign in</Link>
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <Link href="/sign-up">Sign up</Link>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    handleLogout();

                    setIsOpen(false);
                  }}
                  className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
                >
                  LogOut
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    )
  );
};

export default Navbar;
