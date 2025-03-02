//@ts-nocheck
import User from "../../../../models/UserSchema";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "../../../../lib/db.js";

/// Sign in the User
export async function POST(req) {
  try {
    const { email, password } = await req.json(); // Get email & password from request

    await dbConnect(); // Connect to database

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 200 });
    }

    if (user.status === "Blocked") {
      return NextResponse.json(
        {
          message: "This email is blocked. Please contact support for help.",
          success: false,
        },
        { status: 200 }
      );
    }

    if (user.authProvider === "google") {
      return NextResponse.json(
        {
          message: "This email is already signed in with Google!",
          success: false,
        },
        { status: 200 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Password does not match" },
        { status: 200 }
      );
    }

    // Generate a JWT token with the user's ID and expiration time (7 days)
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const code = user.role === "admin" ? "2637" : "0001";

    // Create a response object
    const response = NextResponse.json(
      { message: "Login successful", token, code: code },
      { status: 200 }
    );

    // Set the cookie securely
    response.cookies.set("authToken", token, {
      httpOnly: true, // 🛡️ Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === "production", // ✅ Use HTTPS only in production
      sameSite: "strict", // 🛡️ CSRF protection (prevents cross-site cookie sending)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 🕒 Expires in 7 days
      path: "/", // ✅ Available for the whole domain
    });

    return response; // Return the response with the token stored in cookies
  } catch (error) {
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
