import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import path from "path";
import { permanentRedirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Await the cookies function before setting a value
    const cookieStore = await cookies();

    cookieStore.set({
      name: "authToken",
      value: "",
      path: "/",
      expires: new Date(0), // Expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

  
    return NextResponse.json(
      { message: "Logged out successfully", success: true, redirect: true },
      { status: 200 }
    );

    

  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
