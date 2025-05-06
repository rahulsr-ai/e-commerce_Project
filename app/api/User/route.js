import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { auth } from "@/auth";

export async function GET(req) {
  const token = req.cookies.get("authToken")?.value; // Get token from cookies
  const Googletoken = req.cookies.get("__Secure-authjs.session-token")?.value;

  const session = await auth();


  try {
    if (!token && !Googletoken) {
      return NextResponse.json(
        { message: "No token provided", success: false, user: [] },
        { status: 200 }
      );
    }

    await dbConnect();

    if (Googletoken) {
      const GoogleBasedUser = await User.findOne({
        email: session?.user?.email,
      });

      return NextResponse.json(
        { message: "Google User found", success: true, user: GoogleBasedUser },
        { status: 200 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the user from the database
    const user = await User.findById({ _id: decoded.id });

    if (!user) {
      return NextResponse.json(
        { message: "User not found", success: false, user: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "User Found", success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}
