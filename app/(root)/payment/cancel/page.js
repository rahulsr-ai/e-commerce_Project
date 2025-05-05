"use client";
import React from "react";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-[var(--background-color)] rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <XCircle
          aria-label="Error"
          className="w-20 h-20 text-red-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-[var(--primary-text-color)] mb-4">Payment Failed</h1>

        <p className="text-[var(--primary-text-color)] mb-4">
          We're sorry, but there was an error processing your payment.
        </p>

        <p className="text-[var(--primary-text-color)] mb-8">
          Please try again or contact support if the problem persists.
        </p>

        <div className="space-y-4 border-t text-[var(--primary-text-color)] pt-6">
          <button
            aria-label="Try again"
            // onClick={() => window.location.reload()}
            className="w-full bg-red-600 hover:bg-red-700 text-[var(--primary-text-color)] font-medium py-2 px-4 rounded-md transition-colors"
          >
            Try Again
          </button>

          <Link
            href="/"
            aria-label="Return to homepage"
            className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)] text-[var(--primary-text-color)] font-medium py-2 px-4 rounded-md transition-colors"
          >
            <button
              aria-label="Return to homepage"
              //   onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 text-[var(--primary-text-color)] hover:text-[var(--primary-text-color)] font-medium mx-auto"
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
