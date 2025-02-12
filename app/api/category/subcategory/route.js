import { dbConnect } from "@/lib/db";
import { Subcategory } from "@/models/CategorySchema";
import { NextResponse } from "next/server";



// ✅ Get all categories
export async function GET(req) {
  try {


    await dbConnect(); // ✅ MongoDB connect karna
    const GetSubcategory = await Subcategory.find();

    return NextResponse.json(
      { message: "Subcategory fetched successfully", GetSubcategory },
      { status: 200 }
    );


  } catch (error) {
    console.error("Error fetching Subcategory:", error);
    return NextResponse.json(
      { error: "Error fetching Subcategory" },
      { status: 500 }
    );
  }
}
