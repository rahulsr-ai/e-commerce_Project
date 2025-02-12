// import { supabase } from "@/lib/SupaBaseClient";


// export const uploadImageToSupabase = async (file) => {
//   if (!file) return null;

//   const fileName = `${Date.now()}-${file.name.replace(/\s/g, "-")}`; // Unique file name
//   const { data, error } = await supabase.storage
//   .from("StoreX-Bucket") // ✅ Bucket name yahi hona chahiye
//   .upload(fileName, file, {
//     cacheControl: "3600",
//     upsert: false,
//   });


//   if (error) {
//     console.error("Image Upload Error:", error);
//     return null;
//   }

//     // Get the public URL of uploaded image
//     const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/products/${fileName}`;
//     return imageUrl;

// };
