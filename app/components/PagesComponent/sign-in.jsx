// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, ArrowRight } from "lucide-react";

import axios from "axios";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { GoogleSignIn } from "@/actions/SignIn";
import { useAuth } from "@/context/Authcontext";

const SignIn = () => {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [render, setrender] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isProcessing, setisProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setisLoading(true);
  }, []);

  const handleform = async (e) => {
    e.preventDefault();

    if (!isProcessing) {
      return;
    }

    try {
      const { data } = await axios.post("/api/auth/sign-in", {
        email,
        password,
      });

      if (!data?.code) {
        setErrorMessage(data?.message);
      }

      if (data?.code === "2637") {
        router.push("/admin/dashboard/Inventory");
      }
      if (data?.code === "0001") {
        router.push("/");
      }

      if (data?.token) toast.success(data?.message);

      localStorage.setItem("code", data?.code);

      setUser(() => data);
    } catch (error) {
      console.log("error while login the user ");
      console.log(error);
      toast.error("Failed to sign in");
    }
    setisProcessing(false);
  };

  const handleGoogleSignIn = async () => {
    localStorage.setItem("code", "0001");
    const isLogedIn = await GoogleSignIn();
    if (isLogedIn) {
      router.push("/profile");
    }
  };

  return (
    isLoading && (
      <div className="relative lg:top-14 top-14">
        <div className=" flex flex-col justify-center min-h-[calc(100vh-64px)]">
          <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
            <div className="bg-black py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-white/10">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                <p className="mt-1 text-sm text-white/60">
                  Sign in to your account
                </p>
              </div>

              {/* Overlay for Loading */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <form
                className={`space-y-6 ${isProcessing ? "blur-sm" : ""}`}
                onSubmit={handleform}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/80"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                    />
                  </div>
                  <p className="text-red-500 text-sm mt-2 ml-2">
                    {errorMessage}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-white/20 rounded bg-black"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-white/80"
                    >
                      Remember me
                    </label>
                  </div>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-violet-600 hover:text-violet-500 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  onClick={() => {
                    setisProcessing(true);
                  }}
                  className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-violet-500 transition-all duration-200"
                >
                  <span className="absolute right-4 flex items-center">
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  Sign in
                </button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-black text-white/60 mb-2 ">
                      Or continue with
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleGoogleSignIn();
                  }}
                  className="border-2 border-violet-600 w-full flex py-2 itmes-center justify-center gap-2 
                    transition-all duration-300 ease-linear hover:bg-violet-600 rounded-md"
                  type="submit"
                >
                  <FcGoogle
                    size={22}
                    className=" text-
                    -800 dark:text-neutral-300"
                  />
                  <span
                    className="text-neutral-700 dark:text-neutral-300 text-md text-center mt-1.2
                  "
                  >
                    Google
                  </span>
                </button>
                {/* </form> */}

                <p className="mt-6 text-center text-sm text-white/60">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-medium text-violet-600 hover:text-violet-500 transition-colors duration-200"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SignIn;
