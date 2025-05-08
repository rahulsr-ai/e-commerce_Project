import { NextResponse } from "next/server";
import { sendEmail } from "@/helpers/NodeMailer";
import { dbConnect } from "@/lib/db";
import TemporaryUser from "@/models/TemporaryScema";
import User from "@/models/UserSchema";

export async function POST(req) {
  try {
    const { email, name } = await req.json();
    const verificationCode = Math.floor(100000 + Math.random() * 900000); // 6-digit code
    

    // Convert email to lowercase for searching
    const normalizedEmail = email.trim().toLowerCase(); 

    // Email content
    const subject = "Verify Your Email for QuickCart";
    const htmlContent = `
      <p>Hello ${name},</p>
      <p>Your verification code is:</p>
      <h2>${verificationCode}</h2>
      <p>This code is valid for 3 minutes.</p>
    `;

    await dbConnect();

    // Check if user already exists (case-insensitive check)
    const isUserInUserCollection = await User.findOne({ email: normalizedEmail });
    const existingUser = await TemporaryUser.findOne({ email: normalizedEmail });

    if (isUserInUserCollection) {
      return NextResponse.json(
        {
          success: false,
          message: "email is already in use",
        },
        { status: 200 }
      );
    }

    if (existingUser?.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "email is already verified",
        },
        { status: 200 }
      );
    }

    if (existingUser) {
      // Check if the previous code is still valid
      const codeExpiryTime = 3 * 60 * 1000; // 3 minutes in milliseconds
      const currentTime = Date.now();
      const timeDifference = currentTime - existingUser.codeGeneratedAt;

      if (timeDifference < codeExpiryTime) {
        return NextResponse.json(
          {
            success: false,
            message: "Previous code is still valid",
          },
          { status: 200 }
        );
      } else {
        // Update the existing user's verification code and set the isVerified flag to false
        await TemporaryUser.updateOne(
          { email: normalizedEmail }, 
          {
            $set: {
              verificationCode,
              isVerified: false,
              codeGeneratedAt: Date.now(),
            },
          }
        );

        await sendEmail(email, subject, htmlContent);
        return NextResponse.json(
          {
            success: true,
            code: verificationCode,
            message: "Verification code sent successfully",
          },
          { status: 200 }
        );
      }
    }

    // Send the email if the user is not in the database nor in the temporary database
    await sendEmail(email, subject, htmlContent);

    // Save to temporary collection (store the original email format)
    const newUser = new TemporaryUser({
      name,
      email, // Store as user entered
      verificationCode,
      isVerified: false,
      codeGeneratedAt: Date.now(),
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "Verification code sent successfully",
    });

  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email" },
      { status: 500 }
    );
  }
}
