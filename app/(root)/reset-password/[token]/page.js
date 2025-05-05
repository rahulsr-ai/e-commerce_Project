"use client";

import axios from "axios";
import { useParams} from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ResetpasswordPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const handleForm = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      toast.error("Please fill all the fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

   

    const data = await axios.post("/api/auth/reset-password", {
      token,
      confirmPassword,
    });

    console.log(data);

  };

  return (
    <div className="min-h-screen bg-[var(--background-color)]-900 text-[var(--primary-text-color)] flex items-center">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 rounded-lg bg-[var(--background-color)]-950">
        {loading && (
          <div className="absolute inset-0 bg-[var(--background-color)] bg-opacity-50 flex items-center justify-center z-50">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className=" rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-[var(--primary-text-color)]">Reset Password</h2>
            <p className="mt-4 text-gray-200-50">
              Enter your new password below to reset your account.
            </p>
            <div className="mt-6 flex flex-col gap-4">
              <form
                className="flex w-full flex-col gap-4"
                onSubmit={handleForm}
              >
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-[var(--primary-text-color)] "
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm
                  px-3 py-3 text-black "
                />
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-[var(--primary-text-color)] "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] sm:text-sm
                  px-3 py-3 text-black "
                />
                <button
                 aria-label="Reset password"
                  type="submit"
                  className="w-full rounded-md bg-[var(--primary-color)] px-3 py-2 text-sm font-semibold text-[var(--primary-text-color)] shadow-sm hover:bg-[var(--primary-color)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary-color)]"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetpasswordPage;
