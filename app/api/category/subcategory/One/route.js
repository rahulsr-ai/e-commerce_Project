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

    let query = {};

    // Check if the ID is a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(id)) {
      query.category = new mongoose.Types.ObjectId(id); // Use ObjectId if valid
    } else {
      query.category = id; // Use string if not a valid ObjectId
    }

    const fetchSubcategory = await Subcategory.find(query);

    if (!fetchSubcategory || fetchSubcategory.length === 0) {
      return NextResponse.json(
        { message: "No subcategory found", fetchSubcategory: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Subcategories fetched successfully", fetchSubcategory },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 200 }
    );
  }
}
