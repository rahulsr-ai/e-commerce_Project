import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/NodeMailer";
import { dbConnect } from "@/lib/db";
import TemporaryUser from "@/models/TemporaryScema";


export async function POST(req) {
  try {
    const { email } = await req.json();

    await dbConnect();

    // Find the user in the TemporaryUser collection
    const existingUser = await TemporaryUser.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const { verificationCode, codeGeneratedAt } = existingUser;

    // Check if the verification code is expired (10 minutes)
    const isExpired =
      new Date() - new Date(codeGeneratedAt) > 10 * 60 * 1000;

    let newVerificationCode = verificationCode; // Default to the old code

    if (isExpired) {
      // Generate a new verification code
      newVerificationCode = Math.floor(100000 + Math.random() * 900000);

      // Update verification code and reset timestamp
      await TemporaryUser.updateOne(
        { email },
        { $set: { verificationCode: newVerificationCode, codeGeneratedAt: Date.now() } }
      );
    }

    // Email content
    const subject = "Your Email Verification Code for StoreX";
    const htmlContent = `
      <p>Hello,</p>
      <p>Your verification code is:</p>
      <h2>${newVerificationCode}</h2>
      <p>This code is valid for 10 minutes.</p>
    `;

    // Resend the email (either new or existing code)
    await sendEmail(email, subject, htmlContent);

    return NextResponse.json({
      success: true,
      message: isExpired
        ? "Your previous code expired. A new verification code has been sent."
        : "Your verification code is still valid. We've resent it to your email.",
      code: newVerificationCode,
    });
  } catch (error) {
    console.error("Error resending verification code:", error);
    return NextResponse.json(
      { success: false, message: "Failed to resend verification code" },
      { status: 500 }
    );
  }
}
