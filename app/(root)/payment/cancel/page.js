"use client";
import React from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-black rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Payment Failed
        </h1>

        <p className="text-white mb-4">
          We're sorry, but there was an error processing your payment.
        </p>

        <p className="text-white mb-8">
          Please try again or contact support if the problem persists.
        </p>

        <div className="space-y-4 border-t text-white pt-6">
          <button
            // onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Try Again
          </button>


          <Link href="/">
            <button
            //   onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 text-white hover:text-white font-medium mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="mt-4">Return to Homepage</span>
            </button>
          </Link>





        </div>
      </div>
    </div>
  );
};

export default CancelPage;
