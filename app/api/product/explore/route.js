import { Category, Subcategory } from "@/models/CategorySchema";
import Product from "@/models/ProductSchema";
import { NextResponse } from "next/server";

export async function GET(req) {
  const name = req.nextUrl.searchParams.get("name");
  console.log("name ---> ", name);

  if (name.toLowerCase() === "best-sellers") {
    const bestSellersProducts = await Product.find({ isBestSeller: true });
    console.log("bestSellersProducts", bestSellersProducts);

    const fetchCategories = await Category.find({});

    if (!bestSellersProducts) {
      return NextResponse.json(
        { message: "No product found", product: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "best sellers", products: bestSellersProducts },
      { status: 200 }
    );
  }

  if (name.toLowerCase() === "trending") {
    const trendingProducts = await Product.find({ isTrending: true });
    console.log("trendingProducts", trendingProducts);

    if (!trendingProducts) {
      return NextResponse.json(
        { message: "No product found", product: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "trending", products: trendingProducts },
      { status: 200 }
    );
  }
   

  if(name.toLowerCase() === "new-arrivals"){
    const newArrivalsProducts = await Product.find({ isNewArrival: true });
    console.log("newArrivalsProducts", newArrivalsProducts);

    if (!newArrivalsProducts) {
      return NextResponse.json(
        { message: "No product found", product: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "new arrivals", products: newArrivalsProducts },
      { status: 200 }
    );
  }


  return NextResponse.json({ message: "invalid name", product: [] }, { status: 200 });



}
