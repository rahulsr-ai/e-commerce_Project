import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";

export async function POST(req) {
  try {
    console.log("requst accepted ========================");

    const token = req.cookies.get("authToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode?.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // Check if user exists
    const user = await User.findById(decode.id);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Clear cart properly
    const updatedUser = await User.findOneAndUpdate(
      { _id: decode.id },
      { $set: { cart: [] } }, // ✅ Use $set to clear the cart array
      { new: true } // ✅ Returns updated user
    );

    return NextResponse.json(
      { message: "Cart cleared", success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error clearing cart:", error);
    return NextResponse.json(
      { message: "Error clearing cart", success: false, error: error.message },
      { status: 500 }
    );
  }
}
