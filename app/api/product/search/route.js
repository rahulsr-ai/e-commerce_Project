import { Category, Subcategory } from "@/models/CategorySchema";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const search = req.nextUrl.searchParams.get("search");
  console.log("search", search);

  if (!search) {
    return NextResponse.json(
      { message: "No search found", product: [] },
      { status: 200 }
    );
  }

  const product = await Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ]
  });

  

  if (!product) {
    return NextResponse.json(
      { message: "No product found", product: [] },
      { status: 200 }
    );
  }

  const fetchSubCategory = await Subcategory.find({
    category: product[0]?.category,
  });

  console.log("fetchSubCategory", fetchSubCategory);
  console.log("product", product);

  return NextResponse.json({ message: "Hello" , fetchSubCategory, product }, { status: 200 });
}
