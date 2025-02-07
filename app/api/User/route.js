//@ts-nocheck

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";

export async function GET(req) {
  let token = req.cookies.get("authToken")?.value;
  console.log("Raw token:", token);

  try {
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    
    const userId = decoded.id;
    await dbConnect();

    // Fetch the user from the database
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

   

    // Remove sensitive information
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      code: "0001"
    };

    return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 401 }
    );
  }
}
