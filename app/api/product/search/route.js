import { Subcategory } from "@/models/CategorySchema";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const search = req.nextUrl.searchParams.get("search");
    console.log("search", search);

    if (!search) {
      return NextResponse.json(
        { message: "No search found", products: [], fetchedCategory: [] },
        { status: 200 }
      );
    }

    // 🔹 First, try full-text search (if indexed)
    let textSearchResults = [];
    try {
      textSearchResults = await Product.find(
        { $text: { $search: search } },
        { score: { $meta: "textScore" } }
      ).sort({ score: { $meta: "textScore" } });
    } catch (error) {
      console.warn("Text search failed (index may be missing)", error);
    }

    // 🔹 Now, perform regex-based search for broader results
    const regexSearchResults = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive match
        { description: { $regex: search, $options: "i" } },
      ],
    });

    // 🔹 Merge both results and remove duplicates
    const productMap = new Map();
    [...textSearchResults, ...regexSearchResults].forEach((prod) =>
      productMap.set(prod._id.toString(), prod)
    );

    const products = Array.from(productMap.values());

    if (products.length === 0) {
      return NextResponse.json(
        { message: "No product found", products: [], fetchedCategory: [] },
        { status: 200 }
      );
    }

    // 🔹 Fetch category based on the first product (optional: you can extend this for multiple categories)
    const objectId = products[0]?.category?.toString();
    const fetchedCategory = objectId
      ? await Subcategory.find({ category: objectId })
      : [];

    return NextResponse.json(
      { message: "Search results", products, fetchedCategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in search API:", error);
    return NextResponse.json(
      { message: "Server error", products: [], fetchedCategory: [] },
      { status: 500 }
    );
  }
}
