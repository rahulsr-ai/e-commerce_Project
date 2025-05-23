import { SendForgetPasswordEmail } from "@/helpers/Forget-password";
import { dbConnect } from "@/lib/db";
import User from "@/models/UserSchema";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    await dbConnect();

    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is Invalid", success: false },
        { status: 200 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "This email is not in used", success: false },
        { status: 200 }
      );
    }

    if(user.status === "Blocked"){
      return NextResponse.json(
        { message: "This email is blocked in QuickCart", success: false },
        { status: 200 }
      );
    }

    if (user.authProvider === "google") {
      return NextResponse.json(
        { message: "You are signed in with Google. No password needed", success: false },
        { status: 200 }
      );
    }

    // Generate a secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Token expiry time (1 hour)
    const resetTokenExpiry = Date.now() + 3600000;

    // Save token & expiry in DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    // Email Content
    const resetLink = `https://quickcart-lake.vercel.app/reset-password/${resetToken}`;
    const emailContent = `
           <h2>Password Reset Request</h2>
           <p>Click the link below to reset your password:</p>
           <a href="${resetLink}" target="_blank">Reset Password</a>
           <p>If you didn't request this, please ignore this email.</p>
         `;

    // Send Email
    await SendForgetPasswordEmail(
      user.email,
      "Password Reset Request",
      emailContent
    );

    return NextResponse.json(
      { message: "Password reset link sent", success: true },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error while sending email", error);
    return NextResponse.json(
      {
        message: "Error sending email",
        message: error.message,
        success: false,
      },
      { status: 400 }
    );
  }
}
