"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const role = localStorage.getItem("code");
  const router = useRouter();
  if (role === "2637") {
    router.push("/admin/dashboard/Inventory");
    return;
  }

  
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");

  const handleform = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data } = await axios.post("/api/auth/forgot-password", {
      email,
    });

    if (data?.success) {
      setLoading(false);
    } else {
      seterrorMessage(data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center ">
      <div
        className="pt-10 pb-20 px-6 sm:px-10 lg:px-8 lg:pt-16  
      rounded-lg bg-zinc-950 mx-4 "
      >
        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <h1 className="text-3xl font-bold text-violet-600">Forgot Password</h1>
        <p className="mt-4 text-gray-50">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <div className="mt-6 flex flex-col gap-4  ">
          <form className="flex w-full flex-col gap-4" onSubmit={handleform}>
            <label htmlFor="email" className="text-sm font-medium text-white ">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-violet-500 focus:ring-violet-500 sm:text-sm
              px-3 py-3 text-black "
            />
            <p className="text-sm text-red-500 ml-4 my-4"> {errorMessage} </p>
            <button
              type="submit"
              className="w-full rounded-md bg-violet-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
            >
              Send reset link
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                href="sign-up"
                className="font-medium text-violet-600 hover:text-violet-500"
              >
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
