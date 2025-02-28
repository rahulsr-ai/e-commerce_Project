"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    // {"shipping_details":{"city":"New Delhi","country":"IN","line1":"pallet town","line2":"near the lake","postal_code":"110030","state":"DL"}}

    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `/api/stripe-session?session_id=${sessionId}`
        );

        console.log("data", data.shipping_details);

        if (data?.shipping_details) {
          setShippingAddress(data.shipping_details);

          // ✅ Clear cart after successful payment
          await axios.post("/api/orders", {
            shippingAddress: data.shipping_details,
          });
          await axios.post("/api/cart/clear");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, [sessionId]); // ✅ Added sessionId in dependency array

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
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

        {/* ✅ Shipping Address Section */}
        <div className="text-white">
          {shippingAddress ? (
            <div className="mt-4">
              <p>
                {shippingAddress.line1}, {shippingAddress.city},{" "}
                {shippingAddress.line2}, {shippingAddress.city},{" "}
                {shippingAddress.state},{shippingAddress.postal_code},{" "}
                {shippingAddress.country}
              </p>
            </div>
          ) : (
            <p>Loading address...</p>
          )}
        </div>

        <div className="border-t text-white pt-6">
          <Link href="/">
            <button className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mx-auto">
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
