import { dbConnect } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import WishlistSchema from "@/models/WishlistSchema";



export async function GET(req) {
try {
      const token = req.cookies.get("authToken")?.value; // Token leke check kar


    if (!token) {
      return NextResponse.json(
        { message: "Missing user or id", success: false, wishlist: [] },
        { status: 200 }
      );
    }
  
    await dbConnect();
  
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode?.id);
  
    const wishlist = await WishlistSchema.findOne({ userId: decode?.id });
  
    if (!wishlist) {
      return NextResponse.json(
        { message: "Wishlist not found", success: false, wishlist: [] },
        { status: 200 }
      );
    }
  
    return NextResponse.json(
      { message: "Wishlist found", success: true, wishlist },
      { status: 200 }
    );
} catch (error) {
    console.log("error :", error);
    return NextResponse.json(
      { message: "Error fetching wishlist", success: false, wishlist: [] },
      { status: 500 }
    );
    
}
}
