import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import WishlistSchema from "@/models/WishlistSchema";
import User from "@/models/UserSchema";

export async function GET(req) {
  try {
    const token = req.cookies.get("authToken")?.value
    const session = await auth();

    if (!token && !session) {
      return NextResponse.json(
        { message: "Unauthorized access", success: false, wishlist: [] },
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
        { message: "User not found", success: false, wishlist: [] },
        { status: 404 }
      );
    }

    const wishlist = await WishlistSchema.findOne({ userId: user._id });

    return NextResponse.json(
      { 
        message: wishlist ? "Wishlist found" : "Wishlist not found", 
        success: !!wishlist, 
        wishlist: wishlist ? wishlist.products : [] 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { message: "Error fetching wishlist", success: false, wishlist: [] },
      { status: 500 }
    );
  }
}
