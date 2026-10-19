import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, confirmPassword, agreedToTerms } = body;

    const fieldErrors: Record<string, string> = {};

    // Validate name
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      fieldErrors.name = "Full Name or Pilot Handle must be at least 2 characters.";
    }

    // Validate email
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      fieldErrors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!password || typeof password !== "string" || password.length < 6) {
      fieldErrors.password = "Password must be at least 6 characters long.";
    } else if (password !== confirmPassword) {
      fieldErrors.confirmPassword = "Passwords do not match.";
    }

    // Validate terms agreement
    if (!agreedToTerms) {
      fieldErrors.agreedToTerms = "You must agree to the Road Safety Guidelines to proceed.";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          error: "Please correct the highlighted fields.",
          fieldErrors,
        },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    try {
      await connectToDatabase();
    } catch (dbError: unknown) {
      console.error("MongoDB connection error during registration:", dbError);
      return NextResponse.json(
        {
          error:
            "Database connection failed. Please ensure MONGODB_URI is properly configured in your .env.local file.",
        },
        { status: 503 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return NextResponse.json(
        {
          error: "An adventurer with this email address already exists. Try signing in instead.",
          fieldErrors: {
            email: "This email address is already registered.",
          },
        },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Welcome aboard! Account created successfully.",
        user: {
          id: newUser._id.toString(),
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong during registration. Please try again later." },
      { status: 500 }
    );
  }
}
