import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, code, newPassword, confirmPassword } = body;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!code || typeof code !== "string" || code.trim().length !== 6) {
      return NextResponse.json(
        { error: "Please enter the 6-digit verification code." },
        { status: 400 }
      );
    }

    if (!newPassword || typeof newPassword !== "string" || newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verify code in PasswordReset collection
    const resetRecord = await PasswordReset.findOne({
      email: normalizedEmail,
      code: code.trim(),
    });

    if (!resetRecord) {
      return NextResponse.json(
        { error: "Invalid or expired verification code." },
        { status: 400 }
      );
    }

    if (new Date() > resetRecord.expiresAt) {
      await PasswordReset.deleteOne({ _id: resetRecord._id });
      return NextResponse.json(
        { error: "This verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update user's password
    const userUpdate = await User.updateOne(
      { email: normalizedEmail },
      { $set: { password: hashedPassword } }
    );

    if (userUpdate.matchedCount === 0) {
      return NextResponse.json(
        { error: "User account not found." },
        { status: 404 }
      );
    }

    // Delete used reset code
    await PasswordReset.deleteMany({ email: normalizedEmail });

    return NextResponse.json(
      {
        success: true,
        message: "Your password has been reset successfully! You can now sign in.",
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Reset password API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
