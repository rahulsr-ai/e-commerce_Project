import { Category } from "@/models/CategorySchema";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const name = req.nextUrl.searchParams.get("name");
  console.log("name", name);

  if (!name) {
    return NextResponse.json({ message: "No id found" }, { status: 400 });
  }

  const getCategoryByName = await Category.findOne({ name: name });

  if (!getCategoryByName) {
    return NextResponse.json({ message: "No category found" }, { status: 400 });
  }

  const product = await Product.find({ category: getCategoryByName._id });

  return NextResponse.json({ message: "Hello", product }, { status: 200 });


}
