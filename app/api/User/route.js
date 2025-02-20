//@ts-nocheck

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { LetterText } from "lucide-react";

export async function GET(req) {
  let token = req.cookies.get("authToken"); // Get token from cookies
  console.log(token);

  token = JSON.stringify(token);
  try {
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded._id;

    await dbConnect();

    // Fetch the user from the database
    const user = await User.findById(decoded._id);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}
