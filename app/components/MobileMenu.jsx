import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const MobileMenu = ({
  isOpen,
  setIsOpen,
  brands,
  categoryOpen,
  setCategoryOpen,
  brandsOpen,
  setBrandsOpen,
  handleLogout,
  categoryName,
  role,
  setIconsForCategoryName,
  handleSearch,
  debouncedQuery,
  sendSearchValue,
  query,
  router
}) => {
    const pathname = usePathname();
     const [isFocused, setIsFocused] = useState(false);
       

  return (
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
              onFocus={(e) => {
                setIsFocused(true);
              }}
              onBlur={(e) => {
                setIsFocused(false);
              }}
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                handleSearch(e);
              }}
              onKeyDown={sendSearchValue}
              className="w-full bg-white/10 text-[var(--primary-text-color)] placeholder-white/60 px-4 py-2 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            />
            <Search
              onClick={(e) => sendSearchValue(e)}
              className="absolute right-3 top-2.5 text-[var(--primary-text-color)]/60 z-40"
              size={20}
            />
          </div>
          {isFocused && query.length >= 3 && (
    <div
      className="flex flex-col py-2 px-2 gap-2 border-2 rounded-md bg-white absolute top-14 w-full h-fit"
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
          setIsOpen(false)
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

        {role && (
          <Link
            onClick={() => setIsOpen(false)}
            href="/Account"
            className={`flex items-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-3 py-2 rounded-lg transition-colors duration-200
            underline-offset-4 hover:underline
            ${pathname === "/Account" ? "underline" : "text-[var(--primary-text-color)]"} `}
          >
            {/* <Home size={18} /> */}
            <span>Account</span>
          </Link>
        )}

        {/* Mobile Links */}
        <Link
          onClick={() => setIsOpen(false)}
          href="/"
          className={`flex items-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-3 py-2 rounded-lg transition-colors duration-200
            underline-offset-4 hover:underline
            ${pathname === "/" ? "underline" : "text-[var(--primary-text-color)]"} `}
        >
          {/* <Home size={18} /> */}
          <span>Home</span>
        </Link>

        <Link
          onClick={() => setIsOpen(false)}
          href="/deals"
          className={`flex items-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-3 py-2 rounded-lg transition-colors duration-200 
            underline-offset-4 hover:underline
            ${pathname === "/deals" ? "underline" : "text-[var(--primary-text-color)]"} `}
        >
          {/* <Home size={18} /> */}
          <span>Deals</span>
        </Link>

        {/* Mobile Categories */}
        <div className="">
          <button
            onClick={() => {
              setCategoryOpen(!categoryOpen);
            }}
            className={`flex items-center text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-2 pt-2 rounded-lg transition-colors duration-200
              underline-offset-4 hover:underline ml-1
              ${
                pathname.startsWith("/category") ? "underline" : "text-[var(--primary-text-color)]"
              } `}
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
            {categoryName.map((category) => (
              <Link
                onClick={() => setIsOpen(false)}
                key={category.name}
                href={`/category/${category?.name}`}
                className={`flex items-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-3
                 py-2 rounded-lg transition-colors duration-200 
                  
                  
                  `}
              >
                <span className="text-violet-600 group-hover:text-violet-700 text-xs transition-colors duration-200">
                  {setIconsForCategoryName(category.name)}
                </span>
                <span className="text-sm">
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="">
          <button
            onClick={() => {
              setBrandsOpen(!brandsOpen);
            }}
            className={`flex items-center text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-2 pt-2 rounded-lg transition-colors duration-200
              underline-offset-4 hover:underline ml-1
              ${
                pathname.startsWith("/Explore") ? "underline" : "text-[var(--primary-text-color)]"
              } `}
          >
            <span>Explore</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform duration-200 ${
                brandsOpen ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`mt-2 space-y-1 transition-all duration-200 ${
              brandsOpen ? "opacity-100 h-fit" : "opacity-0 h-0"
            }`}
          >
            {brands.map((brand) => (
              <Link
                onClick={() => setIsOpen(false)}
                key={brand.name}
                href={`/Explore/${brand?.name}`}
                className={`flex items-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] px-3 py-2 rounded-lg transition-colors duration-200
                  
                  `}
              >
                <span className="text-violet-600 group-hover:text-violet-700 text-xs transition-colors duration-200">
                  {brand.icon}
                </span>
                <span className="text-sm z-50">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Auth Buttons */}
        <div className="px-3 py-2 space-y-2">
          {role ? (
            <button
              onClick={handleLogout}
              className="bg-[var(--primary-btn)] text-[var(--secondary-text-color)] w-full px-4 py-2 rounded-full  transition-all duration-300 transform hover:scale-105"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/sign-in");
                }}
                className="bg-[var(--primary-btn)] text-[var(--secondary-text-color)] w-full px-4 py-2 rounded-full  transition-all duration-300 transform hover:scale-105"
              >
                Sign in
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/sign-up");
                }}
                className="bg-[var(--primary-btn)] text-[var(--secondary-text-color)] w-full px-4 py-2 rounded-full  transition-all duration-300 transform hover:scale-105"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
