import { NextResponse } from "next/server";
import User from "@/models/UserSchema";
import { dbConnect } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { token, confirmPassword } = await req.json();

  if (!token || !confirmPassword) {
    return res
      .status(400)
      .json({ message: "Token and new confirmPassword required" });
  }

  await dbConnect();

  // Token ke basis pe user dhundo
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user)
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });

  // Password hash karo
  const hashedPassword = await bcrypt.hash(confirmPassword, 10);

  // Password update karo
  user.password = hashedPassword;
  user.resetPasswordToken = undefined; // Token ko remove karna zaroori hai
  user.resetPasswordExpires = undefined;

  await user.save();

  return NextResponse.json(
    { message: "Password updated successfully" },
    { status: 200 }
  );
}
