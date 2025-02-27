import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("authToken")?.value; // Get token from cookies

    if (!token) {
      return NextResponse.json(
        { message: "No token found", success: false, users: [] },
        { status: 200 }
      );
    }

    await dbConnect();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const users = await User.findById({ _id: decoded.id });

    if (!users) {
      return NextResponse.json(
        { message: "User not found", success: false, users: [] },
        { status: 200 }
      );
    }

    const AllUsers = await User.find();

    return NextResponse.json(
      { message: "User found", success: true, users: AllUsers },
      { status: 200 }
    );


  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: error.message, success: false, users: [] },
      { status: 500 }
    );
  }
}
