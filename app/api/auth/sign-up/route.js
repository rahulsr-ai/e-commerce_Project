import { dbConnect } from "@/lib/db";
import user from "@/models/UserSchema";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

// POST request - Create a new user
export async function POST(req) {
  await dbConnect();
  try {
    const { name, email, password } = await req.json();
    // Ensure MongoDB is connected

    // Check if the user already exists by email
    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new user({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully", user: newUser },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
