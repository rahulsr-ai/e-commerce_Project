import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";

export const POST = async (req) => {
  try {
    const { id } = await req.json(); // productId
    const token = req.cookies.get("authToken")?.value;

    if (!id || !token) {
      return NextResponse.json(
        { message: "Product ID and token are required", success: false },
        { status: 400 }
      );
    }

    await dbConnect();

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode?.id) {
      return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
    }

    const getUser = await User.findOne({ _id: decode.id });

    if (!getUser) {
      return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
    }

    // ✅ Check if cart has the product
    const isProductInCart = getUser.cart.some(
      (item) => item.productId.toString() === id
    );

    if (!isProductInCart) {
      return NextResponse.json(
        { message: "Product not found in cart", success: false },
        { status: 404 }
      );
    }

    // ✅ Remove product from cart
    await User.updateOne(
      { _id: decode.id },
      { $pull: { cart: { productId: id } } }
    );

    return NextResponse.json(
      { message: "Product removed from cart", success: true },
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
