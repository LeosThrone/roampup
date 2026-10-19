"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Map,
  Fuel,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreedToTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear specific field error on change
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

  // Password status calculation (weak -> 1 red bar, good -> 2 yellow bars, road-ready -> 3 green bars)
  type PasswordStatus = "weak" | "good" | "road-ready";

  const getPasswordStatus = (pwd: string): PasswordStatus => {
    if (!pwd || pwd.length < 8) return "weak";

    let varietyCount = 0;
    if (/[a-z]/.test(pwd)) varietyCount++;
    if (/[A-Z]/.test(pwd)) varietyCount++;
    if (/[0-9]/.test(pwd)) varietyCount++;
    if (/[^A-Za-z0-9]/.test(pwd)) varietyCount++;

    // Road ready: length >= 10 and at least 3 types (e.g. lower, upper, digit or symbol)
    if (pwd.length >= 10 && varietyCount >= 3) {
      return "road-ready";
    }

    // Good: length >= 8 and at least 2 types
    if (pwd.length >= 8 && varietyCount >= 2) {
      return "good";
    }

    return "weak";
  };

  const passwordStatus = getPasswordStatus(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Client-side field validation
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Full Name or Pilot Handle is required.";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if (!formData.email.trim()) {
      errors.email = "Email Address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreedToTerms) {
      errors.agreedToTerms = "You must accept the Road Safety Guidelines to proceed.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage("Please fill in all required fields marked with *");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          agreedToTerms: formData.agreedToTerms,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        throw new Error(data.error || "Failed to create account. Please try again.");
      }

      setFieldErrors({});
      setSuccessMessage(
        "Welcome to RoamPup! Your adventure account is ready. Redirecting..."
      );

      // Redirect to sign in after brief delay
      setTimeout(() => {
        router.push("/login?registered=true");
      }, 1500);
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* LEFT COLUMN: Registration Form Card (7 cols on desktop, 2nd on mobile) */}
      <section className="order-2 lg:order-1 lg:col-span-7 bg-white border-[3px] border-[#1b1c1a] rounded-xl p-6 md:p-8 neo-shadow-lg relative overflow-hidden">
        {/* Corner Stamp Accent */}
        <div className="absolute -top-3 -right-3 w-16 h-16 bg-[#92a6ef] border-2 border-[#1b1c1a] transform rotate-12 flex items-center justify-center pointer-events-none shadow-[2px_2px_0px_#1b1c1a]">
          <Compass className="w-8 h-8 text-[#1b1c1a] stroke-[2.5]" />
        </div>

        {/* Header Chip & Headlines */}
        <div className="mb-6">
          <h1 className="font-headline text-3xl md:text-4xl font-black tracking-tight text-[#1b1c1a]">
            Join RoamPup
          </h1>
          <p className="font-sans text-base text-[#4b4731] mt-1.5 leading-relaxed">
            Plan road trips, map out fuel stops, and travel with peace of mind.
          </p>
        </div>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mb-5 p-3.5 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-lg shadow-[3px_3px_0px_#ba1a1a] flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#ba1a1a] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-sm font-bold text-[#93000a]">{errorMessage}</p>
          </div>
        )}

        {/* Success Message Box */}
        {successMessage && (
          <div className="mb-5 p-3.5 bg-[#7af8a5] border-2 border-[#1b1c1a] rounded-lg shadow-[3px_3px_0px_#1b1c1a] flex items-start gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-[#006d3a] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-sm font-bold text-[#004d28]">{successMessage}</p>
          </div>
        )}

        {/* Form Elements with noValidate */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name / Pilot Handle */}
          <div>
            <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
              <span>Full Name / Pilot Handle</span>
              <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Roamer Fox / Sarah Connor"
                className={`w-full pl-11 pr-4 py-2.5 rounded-lg font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                  fieldErrors.name
                    ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                    : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-[#fbf9f6] focus:shadow-[3px_3px_0px_#1b1c1a]"
                }`}
              />
            </div>
            {fieldErrors.name && (
              <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{fieldErrors.name}</span>
              </p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
              <span>Email Address</span>
              <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="wayfarer@roampup.cc"
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

          {/* Password & Visual Strength Indicator */}
          <div>
            <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
              <span>Create Password</span>
              <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">*</span>
            </label>
            <div className="relative mb-1">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="At least 6 characters"
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

            {/* Field Error Message */}
            {fieldErrors.password && (
              <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 mb-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{fieldErrors.password}</span>
              </p>
            )}

            {/* Strength Bar: ONLY visible when user actually enters password */}
            {formData.password.length > 0 && (
              <div className="pt-1.5 transition-all duration-200">
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

          {/* Confirm Password */}
          <div>
            <label className="font-headline text-sm font-bold text-[#1b1c1a] mb-1.5 flex items-center">
              <span>Confirm Password</span>
              <span className="text-[#ba1a1a] font-black ml-1 text-base leading-none">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-[#4b4731]">
                <Lock className="w-5 h-5" />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => handleChange("confirmPassword", e.target.value)}
                placeholder="Re-enter your password"
                className={`w-full pl-11 pr-11 py-2.5 rounded-lg font-sans text-base text-[#1b1c1a] transition-all outline-none border-2 ${
                  fieldErrors.confirmPassword
                    ? "bg-[#fff5f5] border-[#ba1a1a] shadow-[3px_3px_0px_#ba1a1a]"
                    : "bg-[#f5f3f0] border-[#1b1c1a] focus:bg-[#fbf9f6] focus:shadow-[3px_3px_0px_#1b1c1a]"
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

          {/* Terms & Checklist Agreement */}
          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group select-none">
              <div className="relative flex items-center justify-center mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleChange("agreedToTerms", e.target.checked)}
                  className={`w-5 h-5 rounded border-2 ${
                    fieldErrors.agreedToTerms
                      ? "border-[#ba1a1a] bg-[#fff5f5]"
                      : "border-[#1b1c1a] bg-white"
                  } text-[#249e90] focus:ring-0 focus:ring-offset-0 checked:bg-[#249e90] checked:border-[#1b1c1a] transition-all cursor-pointer`}
                />
              </div>
              <span className="font-sans text-sm text-[#1b1c1a] font-medium leading-tight">
                I agree to the{" "}
                <span className="font-bold underline decoration-2 decoration-[#6a5f00]">
                  Road Safety Guidelines
                </span>
                , autonomous waypoint sync terms, and community stickers
                policy.{" "}
                <span className="text-[#ba1a1a] font-black text-sm">*</span>
              </span>
            </label>
            {fieldErrors.agreedToTerms && (
              <p className="text-xs font-bold text-[#ba1a1a] mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{fieldErrors.agreedToTerms}</span>
              </p>
            )}
          </div>

          {/* Primary CTA Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline text-lg md:text-xl font-bold py-3.5 px-6 rounded-lg border-[3px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_#1b1c1a] neo-press-none transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin stroke-[2.5]" />
                  <span>Preparing your gear...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                </>
              )}
            </button>
          </div>
        </form>
      </section>

      {/* SIDEBAR SHOWCASE CARD: Top banner on non-wide screens, full vertical card on desktop */}
      <aside className="order-1 lg:order-2 lg:col-span-5 w-full">
        {/* On non-wide screens (< lg): Horizontal Banner matching user screenshot */}
        <div className="lg:hidden bg-white border-[3px] border-[#1b1c1a] rounded-xl p-4 sm:p-5 neo-shadow-lg flex items-center gap-4 sm:gap-5 relative overflow-hidden">
          {/* Mascot Box */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#f7cb46] border-[2.5px] border-[#1b1c1a] flex items-center justify-center p-2 shadow-[3px_3px_0px_#1b1c1a] shrink-0 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMMVzhCjxdFasrBK2jovF5cgxydzi_sEkfC7iDfUF0xLVEBFaChS08bRI_PM2J7d0V6stIqwuTmqZEkXePloq43NenVk1UA-tTtQzW0rg3vjCh4Ijq3Gcbrc5ypL518hdr5wdQx8LVwJiJObmDKE-9dkZf2ISmL-TlJEzXThEmINjqkLu4_1PBMubHZpG25w6DtJ13qQbCgESSTun3usDi3VYST6yKKstMhUWK_qmmBUh4XT_FnJF"
              alt="RoamPup Adventure Mascot"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text Content */}
          <div className="min-w-0 flex-1">
            <span className="font-headline text-[10px] sm:text-xs bg-[#249e90] text-white border border-[#1b1c1a] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-extrabold shadow-[1.5px_1.5px_0px_#1b1c1a] inline-block mb-1">
              Ready for Adventure
            </span>
            <h2 className="font-headline text-lg sm:text-xl font-black tracking-tight text-[#1b1c1a] leading-tight">
              Meet your road trip buddy
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#4b4731] mt-0.5 leading-snug line-clamp-2 sm:line-clamp-none">
              Plan road trips, map out fuel stops, and travel with peace of mind.
            </p>
          </div>
        </div>

        {/* On desktop (lg+): Full vertical showcase card */}
        <div className="hidden lg:flex bg-white border-[3px] border-[#1b1c1a] rounded-xl p-8 neo-shadow-lg flex-col items-center text-center relative overflow-hidden">
          {/* Mascot Box */}
          <div className="w-40 h-40 rounded-2xl bg-[#f7cb46] border-[3px] border-[#1b1c1a] flex items-center justify-center p-3 mb-6 shadow-[4px_4px_0px_#1b1c1a] overflow-hidden">
            {/* Mascot image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMMVzhCjxdFasrBK2jovF5cgxydzi_sEkfC7iDfUF0xLVEBFaChS08bRI_PM2J7d0V6stIqwuTmqZEkXePloq43NenVk1UA-tTtQzW0rg3vjCh4Ijq3Gcbrc5ypL518hdr5wdQx8LVwJiJObmDKE-9dkZf2ISmL-TlJEzXThEmINjqkLu4_1PBMubHZpG25w6DtJ13qQbCgESSTun3usDi3VYST6yKKstMhUWK_qmmBUh4XT_FnJF"
              alt="RoamPup Adventure Mascot"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Status Pill Badge */}
          <span className="font-headline text-xs bg-[#249e90] text-white border-2 border-[#1b1c1a] px-3.5 py-1 rounded-full uppercase tracking-wider font-extrabold shadow-[2px_2px_0px_#1b1c1a] mb-3">
            Ready for Adventure
          </span>

          {/* Heading */}
          <h2 className="font-headline text-2xl font-black tracking-tight text-[#1b1c1a] mb-2">
            Meet your road trip buddy
          </h2>

          {/* Description */}
          <p className="font-sans text-base text-[#4b4731] max-w-sm leading-relaxed mb-6">
            RoamPup helps you keep track of routes, calculate fuel stops, and
            double-check your gear before you hit the road.
          </p>

          {/* Bottom Feature Markers */}
          <div className="w-full pt-6 border-t-2 border-dashed border-[#cec7aa] flex items-center justify-around">
            <div className="flex flex-col items-center text-center px-2">
              <Map className="w-6 h-6 text-[#1b1c1a] mb-1 stroke-[2.5]" />
              <span className="font-headline text-xs text-[#1b1c1a] font-bold uppercase tracking-wider">
                Offline Route Maps
              </span>
            </div>

            <div className="h-8 w-[2px] bg-[#cec7aa]" />

            <div className="flex flex-col items-center text-center px-2">
              <Fuel className="w-6 h-6 text-[#1b1c1a] mb-1 stroke-[2.5]" />
              <span className="font-headline text-xs text-[#1b1c1a] font-bold uppercase tracking-wider">
                Smart Fuel Reminders
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
