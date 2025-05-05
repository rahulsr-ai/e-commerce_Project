"use client"; // ✅ Convert the entire page into a Client Component

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

    const fetchSession = async () => {
      try {
        const { data } = await axios.get(
          `/api/stripe-session?session_id=${sessionId}`
        );

        console.log("data", data.shipping_details);

        if (data?.shipping_details) {
          setShippingAddress(data.shipping_details);

          // ✅ Send order details separately (no async inside useEffect)
          axios.post("/api/orders", {
            shippingAddress: data.shipping_details,
          });

          // ✅ Clear cart separately
          axios.post("/api/cart/clear");
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, [sessionId]); 

  return (
   
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--background-color)] rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <CheckCircle 
          aria-label="Success"
          className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-[var(--primary-text-color)] mb-4">
          Payment Successful!
        </h1>

        <p className="text-[var(--primary-text-color)] mb-8">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* ✅ Shipping Address Section */}
        <div className="text-[var(--primary-text-color)]">
          {shippingAddress ? (
            <div className="mt-4">
              <p>
                {shippingAddress.line1}, {shippingAddress.line2}, {shippingAddress.city},{" "}
                {shippingAddress.state}, {shippingAddress.postal_code}, {shippingAddress.country}
              </p>
            </div>
          ) : (
            <p>Loading address...</p>
          )}
        </div>

        <div className="border-t text-[var(--primary-text-color)] pt-6">
          <Link
           aria-label="Return to homepage"
          href="/"
          >
            <button
             aria-label="Return to homepage"
            className="flex items-center justify-center space-x-2 text-blue-600 hover:text-blue-800 font-medium mx-auto">
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
