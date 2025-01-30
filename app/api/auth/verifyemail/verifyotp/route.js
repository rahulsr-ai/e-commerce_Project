// app/api/verify-otp/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/UserSchema"; // Your User model
import { dbConnect } from "@/lib/db";

let otpStorage = {}; // In-memory storage for OTPs (temporary)

export async function POST(request) {
  const { verifyOtp, password, name, email } = await request.json();

  // Step 1: Fetch OTP from in-memory storage
  const otpEntry = otpStorage[email];

  if (!otpEntry) {
    return NextResponse.json({ error: "OTP not found." }, { status: 400 });
  }

  // Step 2: Check if OTP has expired
  if (otpEntry.expiresAt < Date.now()) {
    return NextResponse.json({ error: "OTP has expired." }, { status: 400 });
  }

  // Step 3: Verify OTP
  if (verifyOtp !== otpEntry.otp) {
    return NextResponse.json({ error: "Invalid OTP." }, { status: 400 });
  }
   
  dbConnect();

  // Step 4: Hash the password and create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    email,
    name, // Or collect from frontend
    password: hashedPassword,
  });

  await user.save();

  // Step 5: Remove OTP from storage after successful verification
  delete otpStorage[email]; // Remove OTP from in-memory storage

  return NextResponse.json({ message: "User registered successfully." });
}
