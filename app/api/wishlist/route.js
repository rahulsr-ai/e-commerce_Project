import { dbConnect } from "@/lib/db";
import Product from "@/models/ProductSchema";
import User from "@/models/UserSchema";
import WishlistSchema from "@/models/WishlistSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// just need to send userToken and id of product to this route
export async function POST(request) {
  try {
    const token = request.cookies.get("authToken")?.value; // Token leke check kar
    const { id } = await request.json();

    if (!token || !id) {
      return NextResponse.json(
        { message: "Missing user or id", success: false },
        { status: 200 }
      );
    }

    // Connect to the database
    await dbConnect();

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // console.log("decode =============================");
    // console.log(decode?.id);

    // Find the user in the database
    const userDoc = await User.findOne({ _id: decode.id });
    if (!userDoc) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 200 }
      );
    }

    const wishlist = await WishlistSchema.findOne({
      userId: decode.id,
    });

    console.log(wishlist);

    const val = wishlist?.products.includes(id);
    console.log("val", val);



    if (wishlist) {

      if (wishlist?.products.includes(id)) {
        // remove product from wishlist
        await WishlistSchema.updateOne({ $pull: { products: id } });
        return NextResponse.json(
          { message: "Product removed from wishlist", success: true, wishlist },
          { status: 200 }
        );
      } else if(!wishlist?.products.includes(id)) {
        await WishlistSchema.updateOne({ $push: { products: id } });
        return NextResponse.json(
          { message: "Product added in existing  wishlist", success: true, wishlist },
          { status: 200 }
        );
      }


    }

    console.log("now u can add to wishlist");

    // Create a new wishlist document
    const newWishlist = await WishlistSchema.create({
      userId: userDoc._id,
      products: id,
    });

    return NextResponse.json(
      { message: "Product added to wishlist", success: true, newWishlist },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return null;
  }
}
