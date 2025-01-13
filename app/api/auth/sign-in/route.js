"use server";

import User from "@/models/UserSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import { redirect } from "next/navigation";

/// Sing in the User
export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await dbConnect();
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    // Return the token and user information
    const response = NextResponse.json({ token, user }, { status: 200 });

    response.cookies.set("auth_token", token, {
      httpOnly: true, // Prevent client-side JavaScript access
      secure: process.env.NODE_ENV === "production", // Only send cookies over HTTPS in production
      sameSite: "Strict", // CSRF protection
      maxAge: 60 * 60 * 6, // Token expires in 6 hours (same as JWT expiration)
      path: "/", // Cookie available for the whole domain
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
