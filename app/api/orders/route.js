import { auth } from "@/auth";
import Order from "@/models/OrderSchema";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";

export async function POST(req) {
  try {
    const { shippingAddress } = await req.json();
    console.log("shippingAddress ======> ", shippingAddress);
    const session = await auth();

    const token = req.cookies.get("authToken")?.value;

    if (!token && !session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
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

    // Calculate total amount
    const totalAmount = user.cart.reduce((acc, item) => acc + item.priceAtTimeOfAdding * item.quantity, 0);

    const order = await Order.create({
      userId: user._id,
      products: user.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.priceAtTimeOfAdding,
      })),
      totalAmount: totalAmount,
      shippingAddress: {
        street: shippingAddress.line1,
        city: shippingAddress.city,
        state: shippingAddress.state,
        postalCode: shippingAddress.postal_code,
        country: shippingAddress.country,
      },
      paymentStatus: "Paid",
    });

    console.log("order", order);
    

    return NextResponse.json(
      { message: "Order created successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error creating order", error: error.message },
      { status: 500 }
    );
  }
}