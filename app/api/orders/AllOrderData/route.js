import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/UserSchema";
import Product from "@/models/ProductSchema";
import Order from "@/models/OrderSchema";
import { dbConnect } from "@/lib/db";

export async function GET(req) {
  try {
    // ✅ Step 1: Connect to MongoDB first
    await dbConnect();

    // ✅ Step 2: Get the token from cookies
    const token = req.cookies.get("authToken")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Step 3: Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    // ✅ Step 4: Verify Admin access
    const admin = await User.findById(decoded.id);
    if (!admin || admin.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ✅ Step 5: Fetch orders, users, and products
    const [orders, products, users] = await Promise.all([
      Order.find({}),
      Product.find({}),
      User.find({})
    ]);

    // ✅ Step 6: Create lookup maps for products and users
    const productMap = new Map(products.map(prod => [prod._id.toString(), prod.name]));
    const userMap = new Map(users.map(user => [user._id.toString(), user]));

    // ✅ Step 7: Build the response
    const finalResult = orders.map(order => ({
      orderId: order._id,
      userId: order.userId,
      totalAmount: order.totalAmount,
      userDetails: userMap.get(order.userId.toString()) || null,
      shippingAddress: {
        street: order.shippingAddress?.street,
        city: order.shippingAddress?.city,
        state: order.shippingAddress?.state,
        postalCode: order.shippingAddress?.postalCode,
        country: order.shippingAddress?.country,
      },
      status: order.status,
      paymentStatus: order.paymentStatus,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      productsData: order.products.map(orderedProduct => ({
        productId: orderedProduct.productId,
        name: productMap.get(orderedProduct.productId.toString()) || "Unknown Product",
        quantity: orderedProduct.quantity,
        price: orderedProduct.price,
      }))
    }));

    return NextResponse.json({
      message: "Orders fetched successfully",
      success: true,
      data: finalResult,
    });
  } catch (error) {
    console.error("backend error while fetching orders:", error);
    return NextResponse.json(
      {
        message: "Error fetching data for admin dashboard",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
