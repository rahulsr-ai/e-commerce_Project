import { ChevronDown, Menu, Search, ShoppingBag, User, X } from "lucide-react";
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
  router
}) => {
  const pathname = usePathname();

  const [isFocused, setIsFocused] = useState(false);
   

  return (
    <div className="max-w-full  px-4 sm:px-6 ">
      <div className="flex items-center justify-between  h-16">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center space-x-2">
          <ShoppingBag className="text-violet-600" size={24} />
          <span className="text-[var(--primary-text-color)] font-bold text-xl tracking-tight">
            QuickCart
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center lg:space-x-4 xl:space-x-8 flex-1 justify-center w-fit max-w-3xl ">
          <Link
            aria-label="Home"
            href="/"
            className={`hover:text-[var(--primary-text-color)] transition-all duration-200 flex items-center space-x-3 group underline-offset-4 hover:underline
                 ${pathname === "/" ? "underline text-white " : "text-white "} `}
          >
            <span className="mr-4">Home</span>
          </Link>

          <Link
            aria-label="Deals"
            href="/deals"
            className={`hover:text-[var(--primary-text-color)] transition-all duration-200 flex items-center space-x-3 group underline-offset-4 hover:underline
              ${pathname === "/deals" ? "underline text-white  " : "text-white"}  `}
          >
            <span className="mr-4 ">Deals</span>
          </Link>

          {/* Categories Dropdown */}
          <div className="relative group">
            <button
              aria-label="Categories"
              onMouseEnter={() => setCategoryOpen(true)}
              onMouseLeave={() => setCategoryOpen(false)}
              className={` transition-all duration-200 flex items-center space-x-1 underline-offset-4 hover:underline
                ${
                  pathname.startsWith("/category")
                    ? "underline text-white"
                    : "text-white"
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
                      aria-label="Category"
                      key={category?._id}
                      onClick={() => {
                        setCategoryOpen(false);
                      }}
                      href={`/category/${category?.name}`}
                      className={`group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-hover)] transition-colors duration-200
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
              aria-label="Brands"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
              className={`text-[var(--primary-text-color) hover:text-[var(--primary-text-color)] transition-all duration-200 flex items-center space-x-1 underline-offset-4 hover:underline
                ${
                  pathname.startsWith("/Explore")
                    ? "underline text-white "
                    : "text-white"
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
                      className="group flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[var(--primary-hover)] transition-colors duration-200"
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
                onChange={(e) => handleSearch(e)}
                onKeyDown={sendSearchValue}
                type="text"
                placeholder="Search products..."
                className="w-full bg-white/10 text-[var(--primary-text-color)] placeholder-white/60 px-4 py-1.5 pr-8 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-200"
              />
              <Search
                className="absolute right-3 top-1.5 text-[var(--primary-text-color)]/60 group-hover:text-[var(--primary-text-color)]/80 transition-colors duration-200"
                size={20}
              />
            </div>

            {isFocused && query.length >= 3 && (
    <div
      className="flex flex-col py-2 px-2 gap-2 border-2 rounded-md bg-white absolute top-14 max-w-xs w-full h-fit"
      onMouseDown={(e) => e.preventDefault()} // Prevent onBlur from triggering
    >
      <p className="text-violet-700">Search Results</p>
      <div className="space-y-1 text-black">
  {Array.isArray(debouncedQuery) &&
    debouncedQuery.map((item, i) => (
      <p
        key={i}
        onClick={() => {
          router.push(`/search?search=${query}`);
          setIsFocused(false);
        }}
        className="p-1 rounded hover:bg-violet-200 cursor-pointer"
      >
        {item.name}
      </p>
    ))}
</div>
    </div>
  )}
          </div>
        </div>

        <div className={`hidden lg:flex items-center space-x-4`}>
          {role ? (
            <div>

                          <Link
                aria-label="Account"
                href={"/Account"}
                className={`text-[var(--primary-text-color)] hover:underline underline-offset-4 px-6 py-2 rounded-full  transition-all duration-300 transform hover:scale-105

                ${
                  pathname.startsWith("/Account")
                    ? "underline "
                    : "text-white"
                }
                `}
              >
                Account
              </Link>
              <button
                aria-label="Log out"
                onClick={handleLogout}
                className={`bg-[var(--primary-btn)] text-[var(--secondary-text-color)] px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105
                `}
              >
                LogOut
              </button>
              </div>
          ) : (
            <>
              <Link aria-label="Sign in" href="/sign-in">
                <button
                  aria-label="Sign in"
                  className="text-white  transition-all duration-200 flex items-center space-x-2 group"
                >
                  <User
                    size={18}
                    className="group-hover:scale-110 transition-transform duration-200"
                  />
                  Sign in
                </button>
              </Link>

              <Link aria-label="Sign up" href="/sign-up">
                <button
                  aria-label="Sign up"
                  className="bg-[var(--primary-btn)] text-[var(--secondary-text-color)]  px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Sign up
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
           name="mobile-menu-button"
            aria-label="Mobile menu"
            onClick={() => setIsOpen(!isOpen)}
            className="dark:text-[var(--primary-text-color) text-white dark:hover:text-[var(--primary-text-color)] p-2 transition-colors duration-200"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopMenu;
