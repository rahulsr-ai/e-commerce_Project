import { dbConnect } from "@/lib/db";
import Order from "@/models/OrderSchema";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { id, status } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "id and status are required", success: false },
        { status: 200 }
      );
    }

    if (status !== "block" && status !== "unblock" && status !== "delete") {
      return NextResponse.json(
        { message: "Invalid status", success: false },
        { status: 200 }
      );
    }

    await dbConnect();




    // Ab status update karo
    if (status === "block") {
      await User.updateOne({ _id: id }, { $set: { status: "Blocked" } });
    } else if (status === "unblock") {
      await User.updateOne({ _id: id }, { $set: { status: "Active" } });
    } else if (status === "delete") {
      await User.deleteOne({ _id: id });
          await Order.findOneAndDelete({userId: id })
    }

    return NextResponse.json(
      { message: "User status updated", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
};
