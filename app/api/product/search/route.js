import { Category, Subcategory } from "@/models/CategorySchema";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const search = req.nextUrl.searchParams.get("search");
  console.log("search", search);

  if (!search) {
    return NextResponse.json(
      { message: "No search found", product: [], fetchedCategory: [] },
      { status: 200 }
    );
  }


  // 🔹 Perform a text search
  const Result = await Product.find(
    { $text: { $search: search } },
    { score: { $meta: "textScore" } } // Include relevance score
  ).sort({ score: { $meta: "textScore" } });
  // const Result = Product.getIndexes()

  console.log("result ", Result);

  const product = await Product.find({
    $or: [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ],
  });

  if (!product) {
    return NextResponse.json(
      { message: "No product found", product: [], fetchedCategory: [] },
      { status: 200 }
    );
  }
  const objectId = product[0]?.category.toString();
  const fetchedCategory = await Subcategory.find({ category: objectId });

  if (!fetchedCategory) {
    return NextResponse.json(
      { message: "No category found", product: [], fetchedCategory: [] },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { message: "Hello", product, fetchedCategory },
    { status: 200 }
  );
}
