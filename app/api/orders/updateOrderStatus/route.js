import { dbConnect } from "@/lib/db";
import Order from "@/models/OrderSchema";
import { NextResponse } from "next/server";


export const POST = async (req) => {
  try {
    const { orderId, status } = await req.json();

    console.log("orderId", orderId);
    console.log("status", status);
    

    if (!orderId || !status) {
      return NextResponse.json(
        { error: "Invalid request", success: false },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, { status: status });

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    console.log("updatedOrder", updatedOrder);

    return NextResponse.json(
      { message: "Order status updated successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error while updating order status", error);
    return NextResponse.json(
      { error: "Error updating order status", success: false },
      { status: 500 }
    );
  }
};
