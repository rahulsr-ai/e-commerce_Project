//@ts-nocheck

import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const EditProfile = () => {
  return (
    <div className="space-y-6 ">
      <h2 className="text-xl font-semibold mb-4">Cart</h2>
      <div className="flex justify-center items-center w-full ">
        <div className="flex md:flex-row flex-col ">
          
          <div className="bg-neutral-900 rounded-lg overflow-hidden border border-gray-700 hover:border-violet-500 transition-all duration-300">
            <div className="relative h-48 w-full">
              <Image
                src={"/others/userprofile01.jpg"}
                alt={"Profile"}
                fill
                className="object-cover"
              />
              <button className="absolute top-2 right-2 p-2 bg-gray-900/50 rounded-full hover:bg-red-500/50 transition-colors">
                <Trash2 className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-white">
                  Quality-Earbuds
                </h3>
                <span className="text-violet-400 font-bold">$ 80.99</span>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
                facere iure dolorum ex modi. Ea voluptatibus atque assumenda
                consectetur? Dolorum.
              </p>

              <button className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
