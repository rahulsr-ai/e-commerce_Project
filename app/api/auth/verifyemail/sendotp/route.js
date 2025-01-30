import { NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/lib/Resend"; // Send email using Resend

let otpStorage = {}; // In-memory storage for OTPs (temporary)

export async function POST(request) {
  const { name, email } = await request.json();

  // Step 1: Rate-limiting check (optional)
//   const lastRequest = otpStorage[email];
//   if (lastRequest && Date.now() - lastRequest.timestamp < 5 * 60 * 1000) {
//     return NextResponse.json(
//       { error: "Too many requests. Please try again after 5 minutes." },
//       { status: 429 }
//     );
//   }

  // Step 2: Generate OTP (6 digit)
  const otp = crypto.randomInt(100000, 999999);

  // Step 3: Store OTP and expiration time (10 minutes expiry)
  otpStorage[email] = {
    otp,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    timestamp: Date.now(), // Track when OTP was generated
  };

  // Step 4: Send OTP via email using Resend
  try {
    await sendEmail(name, email, otp); // Send OTP

    return NextResponse.json({ message: "OTP sent successfully." });
  } catch (error) {
    console.error('Error while sending OTP:', error);
    return NextResponse.json({ error: "Failed to send OTP." }, { status: 500 });
  }
}
