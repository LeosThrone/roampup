"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import {
  Key,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const reset = searchParams.get("reset");
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: true,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn("credentials", {
        email: formData.email.trim(),
        password: formData.password,
        redirect: false,
      });

      if (!res || res.error) {
        setErrorMessage("Invalid email or password. Please check and try again.");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setErrorMessage(null);
      await signIn("google", { callbackUrl });
    } catch (error) {
      console.error("Google sign in error:", error);
      setErrorMessage("Failed to connect with Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Sign In Form Card (7 cols on desktop, 2nd on mobile) */}
      <section className="order-2 lg:order-1 lg:col-span-7 bg-white border-[3px] border-[#1b1c1a] rounded-2xl p-6 md:p-8 neo-shadow-lg relative overflow-hidden">
        {/* Header Chip & Headlines */}
        <div className="mb-6">
          <h1 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-[#1b1c1a]">
            Welcome Back
          </h1>
          <p className="font-sans text-sm md:text-base text-[#4b4731] mt-1.5 leading-relaxed">
            Sign in to access your saved routes, trip navigation, and road notes.
          </p>
        </div>

        {/* Account Created Success Notice */}
        {registered === "true" && (
          <div className="mb-5 p-3.5 bg-[#7af8a5] border-2 border-[#1b1c1a] rounded-lg shadow-[3px_3px_0px_#1b1c1a] flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#006d3a] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-sm font-bold text-[#004d28]">
              Your account has been created! Please sign in below.
            </p>
          </div>
        )}

        {/* Password Reset Success Notice */}
        {reset === "true" && (
          <div className="mb-5 p-3.5 bg-[#7af8a5] border-2 border-[#1b1c1a] rounded-lg shadow-[3px_3px_0px_#1b1c1a] flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#006d3a] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-sm font-bold text-[#004d28]">
              Your password has been reset successfully! Please sign in below.
            </p>
          </div>
        )}

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-lg shadow-[3px_3px_0px_#ba1a1a] flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-sm font-bold text-[#93000a]">{errorMessage}</p>
          </div>
        )}

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Email Address */}
          <div>
            <label className="block font-headline text-sm font-bold text-[#1b1c1a] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731] font-bold text-base">
                @
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="rider@poptrip.io"
                className={`w-full pl-11 pr-4 py-2.5 rounded-lg font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                  fieldErrors.email
                    ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                    : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-[#fbf9f6] focus:shadow-[3px_3px_0px_#1b1c1a]"
                }`}
              />
            </div>
            {fieldErrors.email && (
              <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{fieldErrors.email}</span>
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-headline text-sm font-bold text-[#1b1c1a]">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="font-headline text-xs font-bold text-[#726600] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                <Key className="w-5 h-5 stroke-[2.2]" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="••••••••••••••••••••"
                className={`w-full pl-11 pr-11 py-2.5 rounded-lg font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                  fieldErrors.password
                    ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                    : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-[#fbf9f6] focus:shadow-[3px_3px_0px_#1b1c1a]"
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
            {fieldErrors.password && (
              <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{fieldErrors.password}</span>
              </p>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="pt-1">
            <label className="flex items-center gap-3 cursor-pointer group select-none">
              <input
                type="checkbox"
                checked={formData.rememberMe}
                onChange={(e) => handleChange("rememberMe", e.target.checked)}
                className="w-5 h-5 rounded border-2 border-[#1b1c1a] bg-white text-[#249e90] focus:ring-0 focus:ring-offset-0 checked:bg-[#249e90] checked:border-[#1b1c1a] transition-all cursor-pointer"
              />
              <span className="font-sans text-sm text-[#1b1c1a] font-medium">
                Keep me logged in for 30 days
              </span>
            </label>
          </div>

          {/* Sign In Primary CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline text-lg md:text-xl font-bold py-3.5 px-6 rounded-lg border-[3px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] neo-press-none transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin stroke-[2.5]" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </>
              )}
            </button>
          </div>

          {/* Divider: OR CONTINUE WITH */}
          <div className="relative flex items-center justify-center my-4 pt-1">
            <div className="w-full border-t-2 border-dashed border-[#cec7aa]" />
            <span className="absolute bg-white px-3 font-headline text-[11px] font-bold text-[#7d775f] tracking-wider uppercase">
              Or continue with
            </span>
          </div>

          {/* Continue with Google Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isLoading}
            className="w-full bg-white hover:bg-[#fbf9f6] text-[#1b1c1a] font-headline text-base font-bold py-3 px-4 rounded-lg border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1b1c1a] neo-press transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#1b1c1a]" />
                <span>Connecting to Google...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </form>
      </section>

      {/* RIGHT COLUMN: Yellow Showcase Card with Inner White Pup Card */}
      <aside className="order-1 lg:order-2 lg:col-span-5 w-full">
        {/* On non-wide screens (< lg): Horizontal Banner */}
        <div className="lg:hidden bg-[#fac638] border-[3px] border-[#1b1c1a] rounded-2xl p-4 sm:p-5 neo-shadow-lg flex items-center gap-4 sm:gap-5 relative overflow-hidden">
          {/* Decorative Corner Circle */}
          <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-[#f39842] opacity-60 pointer-events-none" />

          {/* Mascot Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white border-[2.5px] border-[#1b1c1a] flex items-center justify-center p-2 shadow-[3px_3px_0px_#1b1c1a] shrink-0 overflow-hidden relative z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMMVzhCjxdFasrBK2jovF5cgxydzi_sEkfC7iDfUF0xLVEBFaChS08bRI_PM2J7d0V6stIqwuTmqZEkXePloq43NenVk1UA-tTtQzW0rg3vjCh4Ijq3Gcbrc5ypL518hdr5wdQx8LVwJiJObmDKE-9dkZf2ISmL-TlJEzXThEmINjqkLu4_1PBMubHZpG25w6DtJ13qQbCgESSTun3usDi3VYST6yKKstMhUWK_qmmBUh4XT_FnJF"
              alt="RoamPup Trail Buddy"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="min-w-0 flex-1 relative z-10">
            <span className="font-headline text-[10px] sm:text-xs bg-[#249e90] text-white border border-[#1b1c1a] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-black shadow-[1.5px_1.5px_0px_#1b1c1a] inline-block mb-1">
              Your Trail Buddy
            </span>
            <h2 className="font-headline text-lg sm:text-xl font-black tracking-tight text-[#1b1c1a] leading-tight">
              Welcome back!
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4b4731] mt-0.5 leading-snug">
              Ready for your next journey across the map?
            </p>
          </div>
        </div>

        {/* On desktop (lg+): Full Yellow Showcase Card with Floating White Card */}
        <div className="hidden lg:flex bg-[#fac638] border-[3px] border-[#1b1c1a] rounded-2xl p-8 sm:p-10 neo-shadow-lg items-center justify-center relative overflow-hidden min-h-[460px]">
          {/* Playful Orange Corner Shapes */}
          <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-[#f39842] opacity-60 pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#f39842] opacity-60 pointer-events-none" />

          {/* Inner White Neobrutalist Card */}
          <div className="bg-white border-[2.5px] border-[#1b1c1a] rounded-2xl p-6 sm:p-8 shadow-[5px_5px_0px_#1b1c1a] flex flex-col items-center text-center max-w-sm w-full relative z-10">
            {/* Mascot Container */}
            <div className="w-28 h-28 rounded-2xl bg-white border-2 border-[#1b1c1a] shadow-[2.5px_2.5px_0px_#1b1c1a] flex items-center justify-center p-2 mb-4 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMMVzhCjxdFasrBK2jovF5cgxydzi_sEkfC7iDfUF0xLVEBFaChS08bRI_PM2J7d0V6stIqwuTmqZEkXePloq43NenVk1UA-tTtQzW0rg3vjCh4Ijq3Gcbrc5ypL518hdr5wdQx8LVwJiJObmDKE-9dkZf2ISmL-TlJEzXThEmINjqkLu4_1PBMubHZpG25w6DtJ13qQbCgESSTun3usDi3VYST6yKKstMhUWK_qmmBUh4XT_FnJF"
                alt="RoamPup Trail Buddy"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Pill Badge */}
            <span className="font-headline text-xs bg-[#249e90] text-white border border-[#1b1c1a] px-3.5 py-1 rounded-full uppercase tracking-wider font-black shadow-[1.5px_1.5px_0px_#1b1c1a] mb-3">
              Your Trail Buddy
            </span>

            {/* Heading */}
            <h2 className="font-headline text-2xl font-black tracking-tight text-[#1b1c1a] mb-2">
              Welcome back!
            </h2>

            {/* Description */}
            <p className="font-sans text-sm text-[#4b4731] leading-relaxed">
              Ready for your next journey across the map?
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#1b1c1a]" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
