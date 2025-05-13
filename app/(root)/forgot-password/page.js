"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [role, setRole] = useState(null);
  const router = useRouter();

  // Access localStorage inside useEffect (only runs in the browser)
  useEffect(() => {
    const storedRole = localStorage.getItem("code");
    setRole(storedRole);
  }, []);

  useEffect(() => {
    if (role === "2637") {
      router.push("/admin/dashboard/Inventory");
    }
  }, [role, router]);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const handleform = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post("/api/auth/forgot-password", { email });
      if (data?.success) {
        setLoading(false);
        toast.success(data?.message);
      } else {
        seterrorMessage(data?.message);
        setLoading(false);
      }
    } catch (error) {
      seterrorMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen dark:bg-[var(--background-color)] bg-neutral-100 flex items-center justify-center">
      <div className="pt-10 pb-20 px-6 sm:px-10 lg:px-8 lg:pt-16 rounded-lg bg-[var(--background-color)]-950 mx-4">
        {loading && (
          <div className="absolute inset-0 bg-[var(--background-color)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <h1 className="text-3xl font-bold text-[var(--primary-color)]">Forgot Password</h1>
        <p className="mt-4 text-gray-200-50">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          <form className="flex w-full flex-col gap-4" onSubmit={handleform}>
            <label htmlFor="email" className="text-sm font-medium dark:text-[var(--primary-text-color)]">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onFocus={() => seterrorMessage("")}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md dark:border-gray-300 border-black border shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm px-3 py-3
               text-black "
            />
            <p className="text-sm text-red-500 ml-2">{errorMessage}</p>
            <button
             aria-label="Send reset link"
              type="submit"
              className="w-full rounded-md bg-[var(--primary-color)] px-3 py-2 text-sm font-semibold text-[var(--primary-text-color)] shadow-sm hover:bg-[var(--primary-color)]"
            >
              Send reset link
            </button>
            <p className="mt-2 text-sm text-gray-200-500">
              Don't have an account?{" "}
              <Link href="sign-up" className="font-medium text-[var(--primary-color)] hover:text-[var(--primary-color)]">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
