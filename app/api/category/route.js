import { dbConnect } from "@/lib/db";
import { Category, Subcategory } from "@/models/CategorySchema";
import { NextResponse } from "next/server";

// ✅ Get all categories
export async function GET(req) {
  try {
    await dbConnect(); // ✅ MongoDB connect karna
    const category = await Category.find();

    return NextResponse.json(
      { message: "Category fetched successfully", success: true, category },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}


//-----------

export async function POST(req) {
  try {
    const body = await req.json();
    let { categoryName, subcategoryName } = body;

    if (!categoryName || !subcategoryName) {
      return NextResponse.json(
        {
          error: "Please provide a categoryName and subcategoryName",
          success: false,
        },
        { status: 200 }
      );
    }

    await dbConnect();

    // ✅ Convert input to lowercase
    categoryName = categoryName.toLowerCase();
    subcategoryName = subcategoryName.toLowerCase();

    // ✅ Case-insensitive category check
    let existingCategory = await Category.findOne({ name: categoryName });

    // ✅ Case-insensitive subcategory check
    const existingSubcategory = await Subcategory.findOne({
      name: subcategoryName,
    });

    // ✅ If category exists but subcategory doesn't, create subcategory
    if (existingCategory && !existingSubcategory) {
      const newSubcategory = await Subcategory.create({
        name: subcategoryName,
        slug: subcategoryName.replace(/\s+/g, "-"),
        category: existingCategory._id,
      });

      return NextResponse.json(
        {
          success: true,
          message: "Subcategory created successfully",
          category: existingCategory,
          subcategory: newSubcategory,
        },
        { status: 201 }
      );
    }

    // ✅ If category & subcategory already exist, return error
    if (existingCategory && existingSubcategory) {
      return NextResponse.json(
        { error: "Category and Subcategory already exist", success: true },
        { status: 200 }
      );
    }

    // ✅ If category doesn't exist, create category first
    if (!existingCategory) {
      existingCategory = await Category.create({
        name: categoryName,
        slug: categoryName.replace(/\s+/g, "-"),
      });
    }

    // ✅ Create new subcategory under newly created category
    const newSubcategory = await Subcategory.create({
      name: subcategoryName,
      slug: subcategoryName.replace(/\s+/g, "-"),
      category: existingCategory._id,
    });

    return NextResponse.json(
      {
        message: "Category and Subcategory created successfully",
        success: true,
        category: existingCategory,
        subcategory: newSubcategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Error creating category", success: false },
      { status: 500 }
    );
  }
}
