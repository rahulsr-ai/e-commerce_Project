import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

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
  sendSearchValue,
  query,
}) => {
  const router = useRouter();
  const pathname = usePathname();

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
              placeholder="Search products..."
              value={query}
              onChange={(e) => {
                handleSearch(e);
              }}
              onKeyDown={sendSearchValue}
              className="w-full bg-white/10 text-white placeholder-white/60 px-4 py-2 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            />
            <Search
              onClick={(e) => sendSearchValue(e)}
              className="absolute right-3 top-2.5 text-white/60 z-40"
              size={20}
            />
          </div>
        </div>

        {role && (
          <Link
            onClick={() => setIsOpen(false)}
            href="/Account"
            className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
            underline-offset-4 hover:underline
            ${pathname === "/Account" ? "underline" : "text-white/90"} `}
          >
            {/* <Home size={18} /> */}
            <span>Account</span>
          </Link>
        )}

        {/* Mobile Links */}
        <Link
          onClick={() => setIsOpen(false)}
          href="/"
          className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
            underline-offset-4 hover:underline
            ${pathname === "/" ? "underline" : "text-white/90"} `}
        >
          {/* <Home size={18} /> */}
          <span>Home</span>
        </Link>

        <Link
          onClick={() => setIsOpen(false)}
          href="/deals"
          className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200 
            underline-offset-4 hover:underline
            ${pathname === "/deals" ? "underline" : "text-white/90"} `}
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
            className={`flex items-center text-white/90 hover:text-white px-2 pt-2 rounded-lg transition-colors duration-200
              underline-offset-4 hover:underline ml-1
              ${
                pathname.startsWith("/category") ? "underline" : "text-white/90"
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
                className={`flex items-center space-x-2 text-white/90 hover:text-white px-3
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
            className={`flex items-center text-white/90 hover:text-white px-2 pt-2 rounded-lg transition-colors duration-200
              underline-offset-4 hover:underline ml-1
              ${
                pathname.startsWith("/Explore") ? "underline" : "text-white/90"
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
                className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
                  
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
              className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
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
                className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
              >
                Sign in
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/sign-up");
                }}
                className="bg-white text-indigo-600 w-full px-4 py-2 rounded-full hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105"
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
