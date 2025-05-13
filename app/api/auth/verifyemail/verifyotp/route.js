import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";
import User from "@/models/UserSchema";
import TemporaryUser from "@/models/TemporaryScema";
import { AdminsEmails } from "@/app/data/AdminsEmails";

export async function POST(request) {
   await dbConnect()
  try {
    // Step 1: Parse incoming request data
    const { verifyOtp, password, name, email } = await request.json();

     if(!verifyOtp || !password || !name || !email) {
      return NextResponse.json(
        { message: "Missing required fields", success: false },
        { status: 200 }
      );
    }


   ; // Connect to the database

    // Step 2: Check if the user has an entry in the TemporaryUser collection
    const existingTempUser = await TemporaryUser.findOne({ email });

    // If no temporary user exists, return error
    if (!existingTempUser) {
      return NextResponse.json(
        { message: "Verification code not found for this email.", success: false},
        { status: 200 }
      );
    }

    if(existingTempUser.email !== email){
      return NextResponse.json(
        { message: "Please enter the correct email address.", success: false},
        { status: 200 }
      );
    }

    

    // Step 4: Check if the user already exists in the User collection
    const existingUser = await User.findOne({ email });



    if (existingUser) {
      return NextResponse.json(
        { message: "this email is already in use" , success: false},
        { status: 200 }
      );
    }


    // Step 3: Check if the OTP is correct and the code has not expired
    const currentTime = Date.now();
    const codeExpiryTime = 3 * 60 * 1000; // 3 minutes in milliseconds
    const timeDifference = currentTime - existingTempUser.codeGeneratedAt;

    if (existingTempUser?.verificationCode !== verifyOtp) {
      return NextResponse.json(
        { message: "Invalid verification code." , success: false},
        { status: 200 }
      );
    }

    if (timeDifference > codeExpiryTime) {
      return NextResponse.json(
        { message: "Verification code has expired." , success: false},
        { status: 200 }
      );
    }

    

    // Step 5: Hash the password for security
    const hashedPassword = await bcrypt.hash(password, 10);

    const CheckUserEmailForAdmin = AdminsEmails.includes(email.toLowerCase());
 

    if (CheckUserEmailForAdmin) {
      // Step 6: Create the new user which role is be admin
      const newAdmin = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: true, // Since the OTP is verified
        role: "admin",
      });
    } else {
      // Step 6: Create the new user which role is be user
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        isVerified: true, // Since the OTP is verified
      });
    }

    const TemporaryUserDelete = await TemporaryUser.deleteOne({ email }); // Delete the temporary user
   

    return NextResponse.json(

      { message: "User registered successfully." , success: true},
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}