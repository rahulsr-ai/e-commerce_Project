"use server";

// ---

import { signIn } from "@/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import axios from "axios";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

// POST route for registration
// export const RegisterUser = async (FormData) => {
//   const name = FormData.get("name");
//   const email = FormData.get("email");
//   const password = FormData.get("password");
//   const confirmPassword = FormData.get("confirmPassword");

//   console.log(name, email, password, confirmPassword);

//   if (!name || !email || !password || !confirmPassword) {
//     throw new Error("Please fill all the fields");
//   }

//   await dbConnect();

//   const user = await User.findOne({ email });
//   if (user) {
//     throw new Error("User already exists");
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   });

//   console.log("user created successfully");
//   redirect("/sign-in");
// };

export const RegisterUser = async (FormData) => {
  const name = FormData.get("name");
  const email = FormData.get("email");
  const password = FormData.get("password");


  console.log(name, email, password);

  if (!name || !email || !password ) {
    throw new Error("Please fill all the fields");
  }

  // const { data } = await axios.post("/api/auth/verifyemail/sendotp", {
  //   name,
  //   email,
  // });

  // console.log(data);

  
};



export const VerifyEmail = async (verifyOtp, password, email, name) => {
  console.log(verifyOtp);
  console.log(password);
  console.log(email);
  console.log(name);

  if (verifyOtp.length < 6) {
    throw new Error("Please enter 6 digits");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  // try {
  //   const { data } = axios.post("/api/auth/verifyemail/verifyotp", {
  //     verifyOtp,
  //     password,
  //   });
  // } catch (error) {}
};

// POST route for login
export const LoginUser = async (FormData) => {
  const email = FormData.get("email");
  const password = FormData.get("password");
  console.log("login user");
  console.log("email", email, "password", password);

  try {
    await signIn("Credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error;
    return someError.cause;
  }
  redirect("/");
};

// Google login using next-auth
export const GoogleLogin = async () => {
  console.log("Google sign-in initiated");
  await signIn("google", {
    redirectTo: "/",
  });
};
