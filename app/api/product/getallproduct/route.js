import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import ProductSchema from "@/models/ProductSchema";



export async function GET(req, res) {
  try {
    await dbConnect(); // MongoDB connect karo
    
    // ✅ Sare products fetch karo
    const products = await ProductSchema.find({});

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch products" },
      { status: 500 }
    );
  }


}
