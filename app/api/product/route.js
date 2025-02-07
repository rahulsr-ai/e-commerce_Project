import { dbConnect } from "@/lib/db";
import ProductSchema from "@/models/ProductSchema";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";





export async function GET(req) {
  let token = req.cookies.get("authToken")?.value;
  console.log("Raw token:", token);

  return NextResponse.json({ message: "Hello", token }, { status: 200 });
}





// Supabase Client Init
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);



// ✅ **POST Route to Upload Image & Save Product**
export async function POST(req) {
  try {
    await dbConnect(); // MongoDB connect karna
    const formData = await req.json();

    console.log(formData);
    

    // 🖼️ Image File Extract karna
    const imageFile = formData.get("image");
    if (!imageFile) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // 🖼️ **Upload Image to Supabase Storage**
    const { data, error } = await supabase.storage
      .from("StoreX-Bucket") // 🗂️ Storage bucket name
      .upload(`products/${Date.now()}-${imageFile.name}`, imageFile, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
    }

    // 🌍 **Get Image URL**
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${data.path}`;

    // 📦 **Save Product to MongoDB**
    const newProduct = await ProductSchema.create({
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      stock: formData.get("stock"),
      category: formData.get("category"),
      subcategory: formData.get("subcategory"),
      isNewArrival: formData.get("isNewArrival") === "true",
      isBestSeller: formData.get("isBestSeller") === "true",
      isLimitedEdition: formData.get("isLimitedEdition") === "true",
      images: [imageUrl], // 🖼️ Image URL store in array
    });

    return NextResponse.json({ message: "Product added!", product: newProduct });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
