import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";
import Product from "@/models/ProductSchema";
import Order from "@/models/OrderSchema";
import { dbConnect } from "@/lib/db";

export async function GET(req) {
  try {
    // const token = req.cookies.get("authToken")?.value;

    // if (!token) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    // const decode = jwt.verify(token, process.env.JWT_SECRET);

    // const Admin = await User.findOne({ _id: decode?.id });

    // if (!Admin || Admin.role !== "admin") {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    await dbConnect();

    const Orders = await Order.find({});
    const Products = await Product.find({});
    const Users = await User.find({});

    // Convert Products array into a Map for fast lookup
    const productMap = new Map(
      Products.map((prod) => [prod._id.toString(), prod.name])
    );

    // Convert Users array into a Map for fast lookup
    const userMap = new Map(Users.map((user) => [user._id.toString(), user]));

    const finalResult = Orders.map((order) => ({
      orderId: order._id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      userDetails: userMap.get(order.userId.toString()) || null, // Fix applied here
      shippingAddress: {
        street: order.shippingAddress.street,
        city: order.shippingAddress.city,
        state: order.shippingAddress.state,
        postalCode: order.shippingAddress.postalCode,
        country: order.shippingAddress.country,
      },
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      productsData: order.products.map((orderedProduct) => ({
        productId: orderedProduct.productId,
        name:
          productMap.get(orderedProduct.productId.toString()) ||
          "Unknown Product",
        quantity: orderedProduct.quantity,
        price: orderedProduct.price,
      })),
    }));

    return NextResponse.json({
      message: "Orders fetched successfully",
      success: true,
      finalResult: finalResult,
    });
  } catch (error) {
    console.log("backend error while fetching orders", error);
    return NextResponse.json(
      {
        message: "Error fetching data for admin dashboard",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
