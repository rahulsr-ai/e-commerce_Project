import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import Link from "next/link";
import React from "react";

import { usePathname } from "next/navigation";

const DesktopMenu = ({
  isOpen,
  setIsOpen,
  categories,
  brands,
  categoryOpen,
  setCategoryOpen,
  brandsOpen,
  setBrandsOpen,
  activelink,
  setactivelink,
  user,
  categoryName,
  setcategoryName,
  handleLogout,
}) => {
  const pathname = usePathname();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 ">
      <div className="flex items-center justify-between  h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <ShoppingBag className="text-violet-600" size={24} />
          <span className="text-white font-bold text-xl tracking-tight">
            StoreX
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
          <Link
            // onClick={() =>  setactivelink("home") }
            href="/"
            className={` hover:text-white transition-all duration-200 flex items-center space-x-3 group
                 ${pathname === "/" ? "active-link" : "text-white/90"} `}
          >
            {/* <Home
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              /> */}
            <span className="mr-4">Home</span>
          </Link>

          <Link
            // onClick={() => setactivelink("deals")}
            href="/deals"
            className={` hover:text-white transition-all duration-200 flex items-center space-x-3 group
              ${pathname === "/deals" ? "active-link" : "text-white/90"}  `}
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
              onClick={() => setactivelink("category")}
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
              className={`hover:text-white transition-all duration-200 flex items-center space-x-1
                ${
                  pathname.startsWith("/category")
                    ? "active-link"
                    : "text-white/90"
                }  `}
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
                onMouseLeave={() => setCategoryOpen(false)}
                className="absolute top-full left-0 mt-1 w-56 rounded-lg shadow-lg bg-white/95 backdrop-blur-sm ring-1 ring-black/5 transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200"
              >
                <div className="py-1">
                  {categoryName.map((category, i) => (
                    <Link
                      key={category?._id}
                      onClick={() => {
                        setCategoryOpen(false);
                        return setactivelink("category");
                      }}
                      href={`/category/${category?.name}`}
                      className={`group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200
                           `}
                    >
                      {/* <span className="text-indigo-500 group-hover:text-indigo-600 transition-colors duration-200">
                          {category.icon}
                        </span> */}
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
              className={`text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-1
                ${
                  pathname.startsWith("/Explore")
                    ? "active-link"
                    : "text-white/90"
                } `}
            >
              <span>Explore</span>
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
                      href={`/Explore/${brand.name}`}
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
        </div>

        <div className={`hidden lg:flex items-center space-x-4`}>
          {!user?.token ? (
            <>
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
            </>
          ) : (
            <button
              onClick={handleLogout}
              className={`bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105
            `}
            >
              LogOut
            </button>
          )}
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
  );
};

export default DesktopMenu;
