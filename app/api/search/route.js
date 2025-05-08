import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const searchParams = req.nextUrl.searchParams;
    const find = searchParams.get("find");

    console.log("User search query:", find);

    if (!find || find.length < 3) {
      return NextResponse.json(
        { message: "Query must be at least 3 characters long." },
        { status: 400 }
      );
    }

    await dbConnect();

    const userSearch = await Product.find({
      name: { $regex: find, $options: "i" },
    }).limit(4);

    return NextResponse.json(
      { success: true, products: userSearch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error while searching products:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
