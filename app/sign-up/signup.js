//@ts-nocheck
"use client";



import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Signup() {
  const [isLoading, setisLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setisLoading(true);
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    let holdTimeout;
    try {
      if (password === confirmPassword) {
        const { data } = await axios.post("/api/auth/sign-up", {
          name,
          email,
          password,
        });
        console.log(data);

        if (data.success) {
          toast.success("ACCOUNT CREATED");
          router.push("/sign-in") 
        }

      } else {
        toast.error("PASSWORD DIDNOT MATCH");
      }

     
    } catch (error) {
      console.log("error while sign upping the user ");
      console.log(error);
    }
  };

  return (
    isLoading && (
      <div className="relative lg:top-3 top-16 ">
        <div className="lg:py-16 pb-12  flex flex-col justify-center min-h-[calc(100vh-64px)] ">
          {/* <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 mt-8">
            <div className="flex justify-center">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="text-[#f5deb3]" size={32} />
                <span className="text-2xl font-bold text-white">StoreX</span>
              </div>
            </div>
          </div> */}

          <div className="sm:mx-auto sm:w-full sm:max-w-md px-4">
            <div className="bg-black py-8 px-4 shadow-2xl rounded-2xl sm:px-10 border border-white/10">
              <div className="text-center mb-6">
                
                <h2 className="text-2xl font-bold text-white">
                  Create Account
                </h2>
                <p className="mt-2 text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Join us and start shopping
                </p>
               
              </div>

              <form className="space-y-4" onSubmit={handleForm}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-white/80"
                  >
                    Full Name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="size-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="Signupearance-none block w-full pl-10 pr-3 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/80"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="size-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full pl-10 pr-3 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/80"
                  >
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="appearance-none block w-full pl-10 pr-10 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="size-5" />
                      ) : (
                        <Eye className="size-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-white/80"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="size-5 text-white/40" />
                    </div>
                    <input
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                      className="appearance-none block w-full pl-10 pr-10 py-2.5 bg-black border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/40 hover:text-white/60 transition-colors"
                    ></button>
                  </div>
                
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/20 rounded bg-black"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-white/80"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Terms
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Sign up button */}
                <button className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-indigo-500 transition-all duration-200">
                  <span className="absolute right-4 flex items-center">
                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                  Create Account
                </button>

                {/* Sign in link */}
                {/* <p className="mt-4 text-center text-sm text-white/60">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Sign in
                  </Link>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default Signup;
