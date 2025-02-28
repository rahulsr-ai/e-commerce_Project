import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";

export const POST = async (req) => {
  try {
    const { id } = await req.json(); // productId
    const token = req.cookies.get("authToken")?.value 
    const session = await auth();

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
      user = await User.findOne({ _id: decode?.id });
    } else {
      user = await User.findOne({ email: session.user?.email });
    }

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 }
      );
    }

    // ✅ Check if product exists in the cart
    const isProductInCart = user.cart.some(
      (item) => item.productId.toString() === id
    );

    if (!isProductInCart) {
      return NextResponse.json(
        { message: "Product not found in cart", success: false },
        { status: 404 }
      );
    }

    // ✅ Remove product from cart
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $pull: { cart: { productId: id } } },
      { new: true }
    );

    return NextResponse.json(
      {
        message: "Product removed from cart",
        success: true,
        cart: updatedUser.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error removing product from cart:", error);
    return NextResponse.json(
      { message: "Error removing product from cart", error: error.message, success: false },
      { status: 500 }
    );
  }
};
