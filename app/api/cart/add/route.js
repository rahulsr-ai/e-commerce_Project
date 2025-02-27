import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id, quantity = 1 } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "id and quantity are required",
          success: false,
        },
        { status: 200 }
      );
    }

    await dbConnect();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        {
          message: "Product not found",
          success: false,
        },
        { status: 200 }
      );
    }

    const updatedCart = await User.updateOne({
      $push: {
        cart: {
          productId: product._id,
          quantity: quantity,
          priceAtTimeOfAdding: product.price * quantity,
        },
      },
    });

    console.log("updatedCart", updatedCart);

    return NextResponse.json(
      {
        message: "Product added to the user cart ",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Error adding product to the user cart",
        success: false,
      },
      { status: 400 }
    );
  }
};
