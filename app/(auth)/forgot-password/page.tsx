"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  CheckSquare,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RotateCcw,
} from "lucide-react";

type Step = "request" | "verify" | "success";
type PasswordStatus = "weak" | "good" | "road-ready";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [step, setStep] = useState<Step>("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [devNotice, setDevNotice] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Password status calculation (weak -> 1 red, good -> 2 yellow, road-ready -> 3 green)
  const getPasswordStatus = (pwd: string): PasswordStatus => {
    if (!pwd || pwd.length < 8) return "weak";

    let varietyCount = 0;
    if (/[a-z]/.test(pwd)) varietyCount++;
    if (/[A-Z]/.test(pwd)) varietyCount++;
    if (/[0-9]/.test(pwd)) varietyCount++;
    if (/[^A-Za-z0-9]/.test(pwd)) varietyCount++;

    if (pwd.length >= 10 && varietyCount >= 3) {
      return "road-ready";
    }

    if (pwd.length >= 8 && varietyCount >= 2) {
      return "good";
    }

    return "weak";
  };

  const passwordStatus = getPasswordStatus(newPassword);

  // Clear specific field error
  const handleFieldChange = (field: string, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "code") setCode(value);
    if (field === "newPassword") setNewPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1: Request Reset Code
  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!email.trim()) {
      setFieldErrors({ email: "Email address is required." });
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setFieldErrors({ email: "Please enter a valid email address." });
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      if (data.devMode) {
        setDevNotice(true);
      }

      setStep("verify");
      setInfoMessage(
        "A 6-digit verification code has been dispatched to your email address."
      );
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Resend code from Step 2
  const handleResendCode = async () => {
    setErrorMessage(null);
    setIsResending(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend verification code.");
      }

      if (data.devMode) {
        setDevNotice(true);
      }

      setInfoMessage("A fresh verification code has been sent!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Failed to resend code. Please try again.");
      }
    } finally {
      setIsResending(false);
    }
  };

  // Step 2: Verify Code and Reset Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const errors: Record<string, string> = {};

    if (!code.trim()) {
      errors.code = "6-digit verification code is required.";
    } else if (code.trim().length !== 6) {
      errors.code = "Verification code must be exactly 6 digits.";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters long.";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          code: code.trim(),
          newPassword,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to reset password.");
      }

      setStep("success");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-220px)] py-6 md:py-12">
      {/* ========================================================================= */}
      {/* STEP 1: REQUEST RESET CODE (Matches design mock) */}
      {/* ========================================================================= */}
      {step === "request" && (
        <div className="w-full max-w-lg bg-white border-[3px] border-[#1b1c1a] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#1b1c1a] relative transition-all">
          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-headline text-3xl sm:text-4xl font-black text-[#1b1c1a] tracking-tight">
              Forgot Password?
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#4b4731] mt-3 leading-relaxed max-w-md mx-auto">
              Enter your registered email address below and we&apos;ll send you a
              verification code to reset your account password.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-lg shadow-[3px_3px_0px_#ba1a1a] flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="text-sm font-bold text-[#93000a]">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleRequestCode} noValidate className="space-y-5">
            <div>
              {/* Field Label */}
              <label className="flex items-center gap-1.5 font-headline text-sm font-bold text-[#1b1c1a] mb-2">
                <span className="font-bold text-[#1b1c1a]">@</span>
                <span>Registered Email Address</span>
              </label>

              {/* Input with envelope icon */}
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleFieldChange("email", e.target.value)}
                  placeholder="e.g. wanderer@roampup.io"
                  className={`w-full pl-4 pr-11 py-3 rounded-xl font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                    fieldErrors.email
                      ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                      : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-white focus:shadow-[3px_3px_0px_#1b1c1a]"
                  }`}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#1b1c1a]">
                  <Mail className="w-5 h-5 stroke-[2]" />
                </div>
              </div>

              {/* Field Error */}
              {fieldErrors.email && (
                <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{fieldErrors.email}</span>
                </p>
              )}

              {/* Green Verification Note matching mock */}
              <div className="flex items-center gap-2 mt-2.5 text-xs font-semibold text-[#006d3a]">
                <CheckSquare className="w-4 h-4 text-[#006d3a] stroke-[2.5] shrink-0" />
                <span>A verification code will be sent to this email address.</span>
              </div>
            </div>

            {/* Send Reset Code Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline text-base sm:text-lg font-bold py-3.5 px-6 rounded-xl border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] neo-press-none transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin stroke-[2.5]" />
                    <span>Sending Reset Code...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Code</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Need help? Contact support */}
          <div className="text-center mt-7">
            <p className="font-sans text-xs sm:text-sm text-[#4b4731]">
              Need help? Contact{" "}
              <a
                href="mailto:support@roampup.io"
                className="font-bold text-[#1b1c1a] underline hover:text-[#726600]"
              >
                support@roampup.io
              </a>
            </p>
            <div className="mt-3">
              <Link
                href="/login"
                className="font-headline text-xs font-bold text-[#726600] hover:underline inline-flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 2: VERIFY CODE & SET NEW PASSWORD */}
      {/* ========================================================================= */}
      {step === "verify" && (
        <div className="w-full max-w-lg bg-white border-[3px] border-[#1b1c1a] rounded-3xl p-6 sm:p-10 shadow-[8px_8px_0px_#1b1c1a] relative transition-all">
          {/* Back button */}
          <button
            type="button"
            onClick={() => {
              setStep("request");
              setErrorMessage(null);
            }}
            className="font-headline text-xs font-bold text-[#4b4731] hover:text-[#1b1c1a] inline-flex items-center gap-1 mb-4 hover:underline cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Change email</span>
          </button>

          {/* Heading */}
          <div className="text-center mb-6">
            <h1 className="font-headline text-3xl sm:text-4xl font-black text-[#1b1c1a] tracking-tight">
              Enter Reset Code
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#4b4731] mt-2 leading-relaxed">
              We&apos;ve dispatched a 6-digit verification code to:
              <br />
              <strong className="text-[#1b1c1a] font-bold">{email}</strong>
            </p>
          </div>

          {/* Dev Mode Banner (Resend Key not configured) */}
          {devNotice && (
            <div className="mb-5 p-3.5 bg-[#ffe500]/30 border-2 border-[#1b1c1a] rounded-lg shadow-[3px_3px_0px_#1b1c1a] flex items-start gap-2.5">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-xs font-bold text-[#1b1c1a] uppercase tracking-wide">
                  Development Mode
                </p>
                <p className="text-xs text-[#4b4731] mt-0.5">
                  RESEND_API_KEY is not configured. Check your server terminal
                  console to view the generated 6-digit code!
                </p>
              </div>
            </div>
          )}

          {/* Info Banner */}
          {infoMessage && (
            <div className="mb-5 p-3.5 bg-[#7af8a5] border-2 border-[#1b1c1a] rounded-lg shadow-[3px_3px_0px_#1b1c1a] flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-[#006d3a] shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="text-sm font-bold text-[#004d28]">{infoMessage}</p>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-lg shadow-[3px_3px_0px_#ba1a1a] flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5 stroke-[2.5]" />
              <p className="text-sm font-bold text-[#93000a]">{errorMessage}</p>
            </div>
          )}

          {/* Verification & Reset Form */}
          <form onSubmit={handleResetPassword} noValidate className="space-y-5">
            {/* 6-Digit Code */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-headline text-sm font-bold text-[#1b1c1a] flex items-center gap-1">
                  <span>6-Digit Verification Code</span>
                  <span className="text-[#ba1a1a] font-black">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="font-headline text-xs font-bold text-[#726600] hover:underline flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <RotateCcw
                    className={`w-3.5 h-3.5 ${isResending ? "animate-spin" : ""}`}
                  />
                  <span>{isResending ? "Resending..." : "Resend code"}</span>
                </button>
              </div>

              <input
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) =>
                  handleFieldChange("code", e.target.value.replace(/\D/g, ""))
                }
                placeholder="123456"
                className={`w-full py-3 px-4 rounded-xl font-mono text-center text-2xl font-bold tracking-[0.5em] text-[#1b1c1a] transition-all outline-none border-2 ${
                  fieldErrors.code
                    ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                    : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-white focus:shadow-[3px_3px_0px_#1b1c1a]"
                }`}
              />

              {fieldErrors.code && (
                <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{fieldErrors.code}</span>
                </p>
              )}
            </div>

            {/* New Password */}
            <div>
              <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
                <span>New Password</span>
                <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">
                  *
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                  <Lock className="w-5 h-5 stroke-[2]" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => handleFieldChange("newPassword", e.target.value)}
                  placeholder="Enter a strong new password"
                  className={`w-full pl-11 pr-11 py-2.5 rounded-xl font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                    fieldErrors.newPassword
                      ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                      : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-white focus:shadow-[3px_3px_0px_#1b1c1a]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#4b4731] hover:text-[#1b1c1a] cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {fieldErrors.newPassword && (
                <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{fieldErrors.newPassword}</span>
                </p>
              )}

              {/* Password Strength Meter: ONLY visible when user enters password */}
              {newPassword.length > 0 && (
                <div className="pt-2 transition-all duration-200">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Segment 1: Red on weak, Yellow on good, Green on road-ready */}
                    <div
                      className={`h-2 rounded border border-[#1b1c1a] transition-colors duration-200 ${
                        passwordStatus === "weak"
                          ? "bg-[#ba1a1a]"
                          : passwordStatus === "good"
                          ? "bg-[#ffe500]"
                          : "bg-[#249e90]"
                      }`}
                    />
                    {/* Segment 2: Empty on weak, Yellow on good, Green on road-ready */}
                    <div
                      className={`h-2 rounded border border-[#1b1c1a] transition-colors duration-200 ${
                        passwordStatus === "good"
                          ? "bg-[#ffe500]"
                          : passwordStatus === "road-ready"
                          ? "bg-[#249e90]"
                          : "bg-[#efeeeb]"
                      }`}
                    />
                    {/* Segment 3: Empty on weak/good, Green on road-ready */}
                    <div
                      className={`h-2 rounded border border-[#1b1c1a] transition-colors duration-200 ${
                        passwordStatus === "road-ready"
                          ? "bg-[#249e90]"
                          : "bg-[#efeeeb]"
                      }`}
                    />
                  </div>
                  <div className="flex justify-between text-[11px] font-headline font-bold text-[#4b4731] mt-1.5">
                    <span
                      className={
                        passwordStatus === "weak"
                          ? "text-[#ba1a1a] font-black"
                          : "opacity-40"
                      }
                    >
                      Weak
                    </span>
                    <span
                      className={
                        passwordStatus === "good"
                          ? "text-[#726600] font-black"
                          : "opacity-40"
                      }
                    >
                      Good
                    </span>
                    <span
                      className={
                        passwordStatus === "road-ready"
                          ? "text-[#006d3a] font-black"
                          : "opacity-40"
                      }
                    >
                      Road Ready ⚡
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
                <span>Confirm New Password</span>
                <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">
                  *
                </span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                  <Lock className="w-5 h-5 stroke-[2]" />
                </span>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) =>
                    handleFieldChange("confirmPassword", e.target.value)
                  }
                  placeholder="Re-enter your new password"
                  className={`w-full pl-11 pr-11 py-2.5 rounded-xl font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                    fieldErrors.confirmPassword
                      ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                      : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-white focus:shadow-[3px_3px_0px_#1b1c1a]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#4b4731] hover:text-[#1b1c1a] cursor-pointer"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {fieldErrors.confirmPassword && (
                <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{fieldErrors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Submit Reset Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline text-base sm:text-lg font-bold py-3.5 px-6 rounded-xl border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] neo-press-none transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin stroke-[2.5]" />
                    <span>Resetting Password...</span>
                  </>
                ) : (
                  <>
                    <span>Reset Password</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer Back Link */}
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="font-headline text-xs font-bold text-[#726600] hover:underline inline-flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Sign In</span>
            </Link>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STEP 3: SUCCESS STATE */}
      {/* ========================================================================= */}
      {step === "success" && (
        <div className="w-full max-w-lg bg-white border-[3px] border-[#1b1c1a] rounded-3xl p-8 sm:p-10 shadow-[8px_8px_0px_#1b1c1a] text-center relative transition-all">
          <div className="w-16 h-16 rounded-2xl bg-[#7af8a5] border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-9 h-9 text-[#006d3a] stroke-[2.5]" />
          </div>

          <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#1b1c1a] mb-3">
            Password Reset Complete!
          </h2>

          <p className="font-sans text-sm sm:text-base text-[#4b4731] leading-relaxed mb-8">
            Your RoamPup password has been updated successfully. You can now sign
            in with your new password to resume planning your route adventures.
          </p>

          <button
            type="button"
            onClick={() => router.push("/login?reset=true")}
            className="w-full bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline text-base sm:text-lg font-bold py-3.5 px-6 rounded-xl border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] neo-press-none transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Proceed to Sign In</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
          </button>
        </div>
      )}
    </div>
  );
}
