"use client";

import React, { useEffect, useState } from "react";
import { IndianRupee, RefreshCw, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import AddressModel from "../CustomizeMode";

const SamplePage = ({
  productsData,
  user,
  cartProducts: initialCartProducts,
}) => {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);
  const [isLoading, setisLoading] = useState(false);
  const [openAddressModel, setOpenAddressModel] = useState(false);

  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      return total + product.priceAtTimeOfAdding * product.quantity;
    }, 0);
  };

  if (cartProducts.length === 0) {
    return (
      <div className="space-y-6 bg-black text-white min-h-screen p-6">
        <h2 className="text-xl font-semibold mb-4 text-violet-500">
          Cart Products
        </h2>
        <div className="flex flex-col items-center justify-center py-12">
          <ShoppingCart className="w-12 h-12 text-violet-400 mb-4" />
          <p className="text-gray-400">No products in cart</p>
        </div>
      </div>
    );
  }

  
  const removeCartProduct = async (id) => {
    try {
      const { data } = await axios.post(`/api/cart/remove`, {
        id,
      });

      if (data?.success) {
        toast.success("Product removed from cart");
        setCartProducts(cartProducts.filter((product) => product._id !== id));
      }
    } catch (error) {
      console.log("frontend error while fetching wishlist", error);
      return null;
    }
  };

  const ProceedToCheckout = async () => {
    setisLoading(true);
    const stripe = await loadStripe(
      `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`
    );

    try {
      const { data } = await axios.post("/api/make-payment", {
        products: cartProducts,
      });

      console.log("response", data);

      stripe.redirectToCheckout({ sessionId: data.id });
    } catch (error) {
      console.log("error", error);
    }

    setisLoading(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-black text-white">
      {/* Cart Summary - Fixed on desktop, top on mobile */}
      <div className="w-full lg:w-1/3 xl:w-1/4 bg-black p-4 sm:p-6 lg:h-screen lg:sticky lg:top-32">
        <h3 className="text-xl sm:text-2xl font-bold mb-6 text-violet-500">
          Cart Summary
        </h3>
        <div className="space-y-4">
          <div className="max-h-[calc(100vh-300px)] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-gray-800">
            {cartProducts.map((product, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-gray-700"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-white">{product.name}</span>
                  <span className="text-sm text-gray-400">
                    Qty: {product.quantity}
                  </span>
                </div>
                <span className="font-medium ">
                  <IndianRupee className=" text-sm inline" />
                  {product.priceAtTimeOfAdding * product.quantity}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-4 mt-4 border-t-2 border-gray-700">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="">
                <IndianRupee className="size-6   inline" />
                {calculateTotal()}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              // setOpenAddressModel(true)
              ProceedToCheckout();
            }}
            className="w-full mt-6 bg-violet-600 text-white px-6 py-3 sm:py-4 rounded-lg hover:bg-violet-700 transition-all 
          font-semibold text-base sm:text-lg shadow-lg shadow-violet-600/20
           hover:shadow-violet-600/40 flex items-center justify-center"
          >
            {isLoading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              "Proceed to Checkout"
            )}
          </button>
        </div>
      </div>

      {<AddressModel open={openAddressModel} setOpen={setOpenAddressModel} />}

      {/* Scrollable Products */}
      <div className="flex-1 p-4 sm:p-6 lg:overflow-y-auto">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-violet-500">
          Cart Products
        </h2>
        <div className="space-y-6">
          {cartProducts.map((product, i) => (
            <div
              key={i}
              className="bg-black rounded-xl shadow-lg overflow-hidden hover:shadow-violet-600/10 transition-all"
            >
              <div className="flex flex-col md:flex-row">
                <div className="relative h-64 sm:h-72 md:h-auto md:w-1/2">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => removeCartProduct(product._id)}
                    className="absolute top-4 right-4 p-2 bg-black/50 rounded-full hover:bg-red-500/50 transition-all"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="p-4 sm:p-6 md:w-1/2">
                  <h3 className="text-lg sm:text-xl font-semibold text-violet-500">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Quantity:</span>
                      <span className="font-medium text-white">
                        {product.quantity}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Unit Price:</span>
                      <span className="font-medium text-white">
                        <IndianRupee className="inline size-6 " />
                        {product.price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span className="text-gray-400">Subtotal:</span>
                      <span className="">
                        <IndianRupee className="inline size-6 " />
                        {product.priceAtTimeOfAdding * product.quantity}
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-6 flex items-center justify-center gap-2 bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 transition-all font-semibold shadow-lg shadow-violet-600/20 hover:shadow-violet-600/40">
                    <ShoppingCart className="w-5 h-5" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SamplePage;
