import { Subcategory } from "@/models/CategorySchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose for ObjectId validation

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    console.log("id -----", id);

    if (!id) {
      return NextResponse.json(
        { message: "No id found", fetchSubcategory: [] },
        { status: 200 }
      );
    }

    const fetchSubcategory = await Subcategory.find({ category: id });

    if (!fetchSubcategory) {
      return NextResponse.json(
        { message: "No fetchSubcategory found", fetchSubcategory: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "fetchSubcategory fetched successfully", fetchSubcategory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching fetchSubcategory:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 200 }
    );
  }
}
