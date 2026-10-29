import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import PasswordReset from "@/models/PasswordReset";
import ResetPasswordEmail from "@/components/emails/ResetPasswordEmail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error("Database connection error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return NextResponse.json(
        {
          error:
            "No adventurer account found with this email address. Please check your email or register first.",
        },
        { status: 404 }
      );
    }

    // Generate 6-digit numeric verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes validity

    // Remove any existing reset codes for this email and save new one
    await PasswordReset.deleteMany({ email: normalizedEmail });
    await PasswordReset.create({
      email: normalizedEmail,
      code,
      expiresAt,
    });

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const fromEmail =
          process.env.RESEND_FROM_EMAIL || "RoamPup <onboarding@resend.dev>";

        await resend.emails.send({
          from: fromEmail,
          to: normalizedEmail,
          subject: `${code} is your RoamPup verification code`,
          react: ResetPasswordEmail({ code, name: user.name }),
        });
      } catch (emailError) {
        console.error("Resend sending error:", emailError);
        return NextResponse.json(
          {
            error:
              "Failed to send email. Please check your Resend API configuration.",
          },
          { status: 500 }
        );
      }
    } else {
      console.log(
        `\n=======================================================\n[DEV NOTICE] RESEND_API_KEY is not set.\nPassword reset verification code for ${normalizedEmail}: [ ${code} ]\n=======================================================\n`
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Verification code sent to your registered email address.",
        devMode: !resendApiKey,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Forgot password API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
