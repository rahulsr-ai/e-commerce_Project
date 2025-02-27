import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const cookieStore = cookies();

    // Delete all relevant cookies
    const cookieNames = [
      "authjs.session-token",
      "authjs.callback-url",
      "authjs.csrf-token",
      "authToken", // Local auth token
     
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