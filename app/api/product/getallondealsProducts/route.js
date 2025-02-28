import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  await dbConnect(); // MongoDB connect karo

  const ProductOnDeal = await Product.find({
    isOnDeal: true,
  });

  return NextResponse.json(
    { success: true, products: ProductOnDeal },
    { status: 200 }
  );
}
