import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookieStore = cookies();

    // Delete all relevant cookies
    const cookieNames = [  
      "__Secure-authjs.session-token",
      "__Secure-authjs.callback-url",
      "__Host-authjs.csrf-token",
      "authjs.session-token", // on development google 
      "authjs.callback-url", // on development google 
      "authjs.csrf-token", // on development google 
      "authToken",  // on development
     
    ];

    cookieNames.forEach((cookieName) => {
      cookieStore.set({
        name: cookieName,
        value: "",
        path: "/",
        expires: new Date(0), // Expire immediately
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    });

    return NextResponse.json(
      { message: "Logged out successfully", success: true, redirect: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}