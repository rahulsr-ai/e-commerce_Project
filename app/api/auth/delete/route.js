import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req) => {
  try {
    const token = req.cookies.get("authToken")?.value;
    const session = await auth();

    if (!token && !session) {
      return NextResponse.json(
        { message: "No authentication provided", success: false },
        { status: 401 }
      );
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();
    let user;
    if (token) {
      user = await User.findOneAndDelete({ _id: decode?.id });
    } else {
      user = await User.findOneAndDelete({ email: session.user?.email });
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

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
      {
        message: "Account deleted",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Failed to delete account", success: false },
      { status: 500 }
    );
  }
};
