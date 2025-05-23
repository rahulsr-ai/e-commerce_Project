import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { auth } from "@/auth";

export async function POST(req) {
  try {


    const token = req.cookies.get("authToken")?.value;
    const session = await auth();


    if (!token && !session) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

   
    await dbConnect();

    let user;
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decode?.id);
    } else {
      user = await User.findOne({ email: session.user?.email });
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }



    // Clear cart properly
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
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
