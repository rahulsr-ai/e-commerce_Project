//@ts-nocheck

import connectToDatabase from "@/lib/db";
import UserSchema from "@/models/UserSchema";
import bcrypt from "bcryptjs";

// POST request - Create a new user
export async function POST(req, res) {
  const { name, email, password } = req.body;

  try {
    // Ensure MongoDB is connected
    await connectToDatabase();

    // Check if the user already exists by email
    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the hashed password
    const newUser = new UserSchema({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    return res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
}


