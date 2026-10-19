"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PawPrint, LogIn, UserPlus } from "lucide-react";

interface HeaderProps {
  actionText?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function Header({
  actionText,
  actionLabel,
  actionHref,
}: HeaderProps) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";

  const resolvedActionText =
    actionText ?? (isLoginPage ? "New adventurer?" : "Already an adventurer?");
  const resolvedActionLabel =
    actionLabel ?? (isLoginPage ? "Sign Up" : "Sign In");
  const resolvedActionHref =
    actionHref ?? (isLoginPage ? "/register" : "/login");
  const ActionIcon = isLoginPage ? UserPlus : LogIn;

  return (
    <header className="bg-[#fbf9f6] sticky top-0 z-50 border-b-[3px] border-[#1b1c1a] shadow-[0px_4px_0px_#1b1c1a]">
      <div className="flex justify-between items-center w-full px-6 py-3.5 max-w-7xl mx-auto">
        {/* Brand Logo / Stamp */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#ffe500] border-[3px] border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] rounded flex items-center justify-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#1b1c1a] transition-all">
            <PawPrint className="w-6 h-6 text-[#1b1c1a] stroke-[2.5]" />
          </div>
          <span className="font-headline text-2xl md:text-3xl font-black tracking-tight text-[#1b1c1a]">
            RoamPup
          </span>
        </Link>

        {/* Right Action Switcher */}
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block font-sans text-sm text-[#4b4731] font-medium">
            {resolvedActionText}
          </span>
          <Link
            href={resolvedActionHref}
            className="font-headline text-sm font-bold bg-white text-[#1b1c1a] px-4 py-2 border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_#1b1c1a] neo-press rounded-lg flex items-center gap-1.5 transition-all"
          >
            <ActionIcon className="w-4 h-4 stroke-[2.5]" />
            {resolvedActionLabel}
          </Link>
        </div>
      </div>
    </header>
  );
}
