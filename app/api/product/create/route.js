import { dbConnect } from "@/lib/db";
import ProductSchema from "@/models/ProductSchema";
import { NextResponse } from "next/server";
import supabase from "@/lib/SupaBaseClient";

// ✅ **POST Route to Upload Image & Save Product**
export async function POST(req) {
  try {
    const formData = await req.formData();

    console.log("Form Data:", formData);

    if (!formData.get("formData") || !formData.get("photo")) {
      return NextResponse.json(
        { message: "No form data or photo found", success: true },
        { status: 400 }
      );
    }

    const file = JSON.parse(formData.get("formData")); // its a object with all the data without photo
    const photo = formData.get("photo"); // here is the photo object

    console.log("Photo", photo);
    console.log("File", file);

    const filePath = `Products/${Date.now()}-${photo.name.replace(/\s/g, "-")}`; // Unique file name
    const { data, error } = await supabase.storage
      .from("StoreX-Bucket") // Your Supabase bucket name
      .upload(filePath, photo, {
        contentType: photo.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (data.error) {
      console.log("Error uploading file:", data.error);
      return NextResponse.json(
        { message: "Failed to upload image", success: true },
        { status: 400 }
      );
    }

    const publicURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data.fullPath}`;
    console.log("publicURL", publicURL);

    if (error) {
      console.error("Upload error:", error);
      return NextResponse.json(
        { message: "Failed to upload image", success: true },
        { status: 400 }
      );
    }

    console.log("file attributes ", file.attributes.newArrival);
    console.log("file attributes are ----------", file.attributes);

    await dbConnect(); // MongoDB connect karna

    const newProduct = new ProductSchema({
      name: file.name,
      description: file.description,
      price: file.price,
      stock: file.stock,
      category: file.category,
      subcategory: file.subcategory,
      isBestSeller: file.attributes.bestSeller,
      isNewArrival: file.attributes.newArrival,
      isTrending: file.attributes.trending,
      images: publicURL,
    });

    await newProduct.save();

    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully & product added to database",
        publicURL: publicURL,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message, message: "Error adding product!" },
      { status: 500 }
    );
  }
}
