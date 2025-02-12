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
      return NextResponse.json(
        { message: "Invalid email " },
        { status: 200 }
      );
    }

    // Compare the entered password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 200 }
      );
    }

    // Generate a JWT token with the user's ID and expiration time (7 days)
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    let response = null;

    if (user.role === "admin") {
      // Create a response object
      response = NextResponse.json(
        { message: "Welcome to the admin panel", token, code: "2637" },
        { status: 200 }
      );

    } else {  
      // Create a response object
      response = NextResponse.json(
        { message: "Login successfully", token, code: "0001" },
        { status: 200 }
      );
      
    }

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
