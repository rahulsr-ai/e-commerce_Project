import {
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

import { usePathname } from "next/navigation";

const DesktopMenu = ({
  isOpen,
  setIsOpen,
  brands,
  categoryOpen,
  setCategoryOpen,
  brandsOpen,
  setBrandsOpen,
  categoryName,
  handleLogout,
  setIconsForCategoryName,
  handleSearch,
  query,
  debouncedQuery,
  role,
  sendSearchValue,
}) => {
  const pathname = usePathname();

  const [isFocused, setIsFocused] = useState(false);

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
            href="/"
            className={` hover:text-white transition-all duration-200 flex items-center space-x-3 group underline-offset-4 hover:underline
                 ${pathname === "/" ? "underline" : "text-white/90"} `}
          >
            <span className="mr-4">Home</span>
          </Link>

          <Link
            href="/deals"
            className={`  transition-all duration-200 flex items-center space-x-3 group underline-offset-4 hover:underline
              ${pathname === "/deals" ? "underline" : "text-white/90"}  `}
          >
            <span className="mr-4">Deals</span>
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
              className={`hover:text-white transition-all duration-200 flex items-center space-x-1 underline-offset-4 hover:underline
                ${
                  pathname.startsWith("/category")
                    ? "underline"
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
                      }}
                      href={`/category/${category?.name}`}
                      className={`group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-purple-100 transition-colors duration-200
                           `}
                    >
                      <span className="text-violet-600 group-hover:text-violet-700 transition-colors duration-200">
                        {setIconsForCategoryName(category.name)}
                      </span>
                      <span className="ml-3">
                        {category.name.charAt(0).toUpperCase() +
                          category.name.slice(1)}
                      </span>
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
              className={`text-white/90 hover:text-white transition-all duration-200 flex items-center space-x-1 underline-offset-4 hover:underline
                ${
                  pathname.startsWith("/Explore")
                    ? "underline "
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
                      <span className="text-violet-600 group-hover:text-violet-700 transition-colors duration-200">
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
                onFocus={(e) => {
                  setIsFocused(true);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                }}
                value={query}
                onChange={handleSearch}
                onKeyDown={sendSearchValue}
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-1.5 pr-8 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              />
              <Search
                className="absolute right-3 top-1.5 text-white/60 group-hover:text-white/80 transition-colors duration-200"
                size={20}
              />
            </div>

            {isFocused && query.length >= 3 && (
              <div
                className="flex flex-col py-2 px-2 gap-2 border-2 rounded-md
            bg-white absolute top-14 max-w-xs w-full h-fit "
              >
                <p className="text-violet-700"> Search Results</p>
                <p className="text-black hover:bg-gray-100 ">
                  {debouncedQuery.charAt(0).toUpperCase() +
                    debouncedQuery.slice(1).toLowerCase()}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className={`hidden lg:flex items-center space-x-4`}>
          {role ? (
            <>
              <Link
              href={"/Account"}
                
                className={`text-white  hover:underline underline-offset-4 px-6 py-2 rounded-full  transition-all duration-300 transform hover:scale-105

                ${
                  pathname.startsWith("/Account")
                    ? "underline"
                    : "text-white/90"
                }
                `}
              >
                Account
              </Link>
              <button
                onClick={handleLogout}
                className={`bg-white text-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105
                `}
              >
                LogOut
              </button>
            </>
          ) : (
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
