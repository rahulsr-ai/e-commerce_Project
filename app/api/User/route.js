import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";

export async function GET(req) {
  const token = req.cookies.get("authToken")?.value; // Get token from cookies

  const Googletoken = req.cookies.get("authjs.session-token")?.value;
  console.log(Googletoken);

  try {
    if (!token && !Googletoken) {
      return NextResponse.json(
        { message: "No token provided", success: false, user: [] },
        { status: 200 }
      );
    }

    await dbConnect();

    
    if (Googletoken) {
      const googleDecoded = jwt.verify(Googletoken);
      console.log(googleDecoded);



      return NextResponse.json(
        { message: "No token provided", success: false, user: [] },
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
