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
  setIconsForCategoryName,
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
          className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
            ${pathname === "/" ? "active-link" : "text-white/90"} `}
        >
          {/* <Home size={18} /> */}
          <span>Home</span>
        </Link>
        <Link
          onClick={() => setIsOpen(false)}
          href="/deals"
          className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
            ${pathname === "/deals" ? "active-link" : "text-white/90"} `}
        >
          {/* <Home size={18} /> */}
          <span>Deals</span>
        </Link>
       

        {/* Mobile Categories */}
        <div className="">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className={`flex items-center text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
              ${
                pathname.startsWith("/category")
                  ? "active-link"
                  : "text-white/90"
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
                href={`/category/${category.name}`}
                className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
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

        {/* Mobile Brands */}
        <div className="">
          <button
            onClick={() => setBrandsOpen(!brandsOpen)}
            className={`flex items-center space-x-2 text-white/90 hover:text-white px-3 py-2 rounded-lg transition-colors duration-200
              ${
                pathname.startsWith("/Explore")
                  ? "active-link"
                  : "text-white/90"
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
              brandsOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/Explore/${brand.name}`} // Add proper href
                className="flex items-center space-x-3 px-4 py-2 text-sm text-white/80 hover:text-white rounded-lg transition-colors duration-200"
              >
                <span className="text-violet-600 group-hover:text-violet-700 text-xs transition-colors duration-200">
                  {brand.icon}
                </span>
                <span className="text-sm">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Auth Buttons */}
        <div className="px-3 py-2 space-y-2">
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
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
