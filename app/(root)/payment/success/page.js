"use client";

import React, { useEffect } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

const SuccessPage = () => {

  const clearCart = async () => {
    try {
      const data = await axios.post("/api/cart/clear");
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    clearCart();
  }, []);

  
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-black rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Successful!
        </h1>

        <p className="text-white mb-8">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        <div className="border-t botext-white pt-6">
          <Link href="/">
            <button
              //   onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Homepage</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
