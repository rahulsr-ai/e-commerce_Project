import Order from "@/models/OrderSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";

export async function GET(req) {
  try {
    console.log("req", req);
    const token = req.cookies.get("authToken")?.value;
    const session = await auth();

    if (!token && !session) {
      return NextResponse.json(
        { message: "No authentication provided", success: false },
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

    const order = await Order.find({ userId: user._id });
    console.log("order", order);

    return NextResponse.json(
      { message: "Order retrieved successfully", success: true, order },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error retrieving order", error: error.message },
      { status: 500 }
    );
  }
}
