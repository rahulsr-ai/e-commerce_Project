import { X } from "lucide-react";
import React from "react";

const FilterModel = ({ categories, setIsFilterOpen, isFilterOpen }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${
        isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-neutral-900 px-3 py-2 rounded-lg shadow-lg space-y-6">
        {/* <h3 className="text-lg font-bold"> Filter Products</h3> */}
        <div className="flex items-center  justify-end">
          <button onClick={() => setIsFilterOpen(false)}>
            <X />
          </button>
        </div>

        <div className="flex flex-wrap gap-4 ">
          <div className="flex justify-center items-center gap-2 ">
            <select className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black">
              <option value="Categories" disabled>
                Categories
              </option>
              {categories.map((category, i) => (
                <option key={i} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center items-center gap-2 ">
            <select className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black">
              <option value="Price" disabled>
                Price
              </option>
              {["fashion", "electronics", "footwear", "accessories"].map(
                (category, i) => (
                  <option key={i} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
        </div>

        <div className="flex items-center  justify-end">
          <button
            className="px-3 py-1 rounded bg-violet-500 text-white hover:bg-violet-600"
            onClick={() => setIsFilterOpen(false)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModel;
