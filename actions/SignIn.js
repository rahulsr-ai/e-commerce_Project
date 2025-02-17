"use server";

import { signIn } from "@/auth"; // Ensure the library is correct
import { redirect } from "next/navigation";

async function EmailSignIn(email) {
  console.log("Google sign-in initiated");
  await signIn("nodemailer", {
    email,
    callbackUrl: "/dashboard",
  });
}

async function GoogleSignIn() {
  console.log("Google sign-in initiated");
  await signIn("google", {
    redirectTo: "/",
  });

  return true;
}

const GithubSignIn = async () => {
  await signIn("github", {
    redirectTo: "/",
  });
};

const handleUserLogout = async (success) => {
  console.log("logout");
  redirect("/sign-in");
  // return true;
};

export { GoogleSignIn, GithubSignIn, EmailSignIn, handleUserLogout };
