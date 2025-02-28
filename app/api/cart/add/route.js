import { auth } from "@/auth";
import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req) => {
  try {
    const { id, quantity = 1 } = await req.json();

    const token = req.cookies.get("authToken")?.value;
    const session = await auth();

    if (!id) {
      return NextResponse.json(
        { message: "id and quantity are required", success: false },
        { status: 400 }
      );
    }

    if (!token && !session) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    await dbConnect();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false },
        { status: 404 }
      );
    }

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

    // Check if product already exists in cart
    const existingProduct = user.cart.find(
      (item) => item.productId.toString() === id
    );

    let updatedCart;
    if (existingProduct) {
      // Increase quantity of existing product
      updatedCart = await User.findByIdAndUpdate(
        user._id,
        {
          $set: {
            "cart.$[elem].priceAtTimeOfAdding":
              product.price * (existingProduct.quantity + 1),
          },
          $inc: { "cart.$[elem].quantity": 1 },
        },
        {
          arrayFilters: [{ "elem.productId": id }],
          new: true,
        }
      );
    } else {
      // Add new product to cart
      updatedCart = await User.findByIdAndUpdate(
        user._id,
        {
          $push: {
            cart: {
              productId: id,
              quantity: quantity,
              priceAtTimeOfAdding: product.price * quantity,
            },
          },
        },
        { new: true }
      );
    }

    return NextResponse.json(
      {
        message: "Product added to the user cart",
        success: true,
        cart: updatedCart.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error:", error);
    return NextResponse.json(
      { message: "Error adding product to cart", success: false },
      { status: 500 }
    );
  }
};
``