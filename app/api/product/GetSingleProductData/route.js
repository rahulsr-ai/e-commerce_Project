import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const name = req.nextUrl.searchParams.get("name");
    console.log("name is  ", name);
    if (!name) {
      return NextResponse.json(
        {
          message: "No product found",
          success: false,
          product: [],
          relatedProducts: [],
        },
        { status: 200 }
      );
    }

    await dbConnect();

    const product = await Product.findOne({ slug: name });

    if (!product) {
      return NextResponse.json(
        {
          message: "No product found",
          success: false,
          product: [],
          relatedProducts: [],
        },
        { status: 200 }
      );
    }

    const relatedProducts = await Product.find({ category: product.category });

    return NextResponse.json(
      { message: "Product Data", success: true, product, relatedProducts },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "No product found",
        success: false,
        product: [],
        relatedProducts: [],
      },
      { status: 500 }
    );
  }
}
