import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";



export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    await dbConnect(); // MongoDB se connect ho raha hai

    const { id, name, email, image } = req.body; // Google se aaya data

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        authProvider: "google",
        authProviderId: id,
        name,
        email,
        image,
        isVerified: true, // Google ke users mostly verified hote hain
      });
    }

    return NextResponse.json(
      { message: "Login successful", code: "0001" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in:", error);
    return NextResponse.json(
      { message: "Error logging in", error: error.message },
      { status: 500 }
    );
  }
}
