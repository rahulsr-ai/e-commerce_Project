import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import WishlistSchema from "@/models/WishlistSchema";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const token = request.cookies.get("authToken")?.value
    const session = await auth();
    const { id } = await request.json(); // Product ID

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required", success: false },
        { status: 400 }
      );
    }

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

    let wishlist = await WishlistSchema.findOne({ userId: user._id });

    if (!wishlist) {
      // Create new wishlist if not found
      wishlist = await WishlistSchema.create({
        userId: user._id,
        products: [id],
      });

      return NextResponse.json(
        { message: "Wishlist created, product added", success: true, wishlist },
        { status: 200 }
      );
    }

    if (wishlist.products.includes(id)) {
      // Remove product if already in wishlist
      wishlist.products = wishlist.products.filter((productId) => productId.toString() !== id);
      await wishlist.save();

      return NextResponse.json(
        { message: "Product removed from wishlist", success: true, wishlist },
        { status: 200 }
      );
    } else {
      // Add product if not in wishlist
      wishlist.products.push(id);
      await wishlist.save();

      return NextResponse.json(
        { message: "Product added to wishlist", success: true, wishlist },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error updating wishlist:", error);
    return NextResponse.json(
      { message: "Error updating wishlist", error: error.message, success: false },
      { status: 500 }
    );
  }
}
