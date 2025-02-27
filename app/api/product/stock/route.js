import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { stock, id } = await req.json();
    console.log("stock is  ", stock);
    console.log("id is  ", id);

    if (!id || !stock) {
      return NextResponse.json(
        { message: "Product Id is missing", success: false, product: [] },
        { status: 200 }
      );
    }

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found", success: false, product: [] },
        { status: 200 }
      );
    }

    product.stock = stock;
    await product.save();

    return NextResponse.json(
      { message: "Product stock updated successfully", success: true, product },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { message: "Error", success: false, product: [] },
      { status: 500 }
    );
  }
}
