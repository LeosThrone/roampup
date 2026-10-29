"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected runtime error to console for debugging
    console.error("App Route Error Boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center px-4 py-12">
      <NeoCard size="lg" className="max-w-md w-full p-6 sm:p-8 text-center">
        {/* Warning Badge / Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#ffdad6] border-[2.5px] border-[#ba1a1a] shadow-[4px_4px_0px_#ba1a1a] flex items-center justify-center mx-auto mb-5">
          <AlertTriangle className="w-8 h-8 text-[#ba1a1a] stroke-[2.5]" />
        </div>

        {/* Heading & Subtitle */}
        <h2 className="font-headline text-2xl sm:text-3xl font-black text-[#1b1c1a] tracking-tight mb-2">
          Route Off-Trail!
        </h2>
        <p className="font-sans text-sm text-[#4b4731] leading-relaxed mb-6">
          We encountered an unexpected error while loading this adventure screen.
          Your vehicle settings and saved presets remain safe.
        </p>

        {/* Error Digest (if available in dev) */}
        {error.digest && (
          <div className="mb-6 p-2 bg-[#f5f3f0] border border-[#cec7aa] rounded font-mono text-[11px] text-[#7d775f] break-all">
            Reference code: {error.digest}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <NeoButton
            variant="primary"
            onClick={() => reset()}
            icon={<RotateCcw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Try Again
          </NeoButton>

          <Link href="/dashboard" className="w-full sm:w-auto">
            <NeoButton
              variant="secondary"
              icon={<Home className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Dashboard
            </NeoButton>
          </Link>
        </div>
      </NeoCard>
    </div>
  );
}
