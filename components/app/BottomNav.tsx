"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CalendarDays,
  CheckCircle2,
  User,
  Plus,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Bookmark;
}

const navItems: NavItem[] = [
  {
    label: "Saved Presets (0)",
    href: "/dashboard",
    icon: Bookmark,
  },
  {
    label: "Scheduled (0)",
    href: "/trips",
    icon: CalendarDays,
  },
  {
    label: "Completed",
    href: "/trips?tab=completed",
    icon: CheckCircle2,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="App Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#fbf9f6] border-t-[3px] border-[#1b1c1a] shadow-[0px_-4px_0px_#1b1c1a]"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2 sm:px-4">
        {/* Left Nav Tabs */}
        <div className="flex-1 flex items-stretch">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex-1 sm:flex-initial sm:px-5 flex items-center justify-center py-2.5 sm:py-3 gap-1.5 text-[11px] sm:text-xs font-headline font-bold tracking-tight cursor-pointer transition-colors relative ${
                  isActive
                    ? "text-[#1b1c1a] bg-[#ffe500] border-t-2 sm:border-t-0 sm:border-2 border-[#1b1c1a] sm:my-1.5 sm:rounded-lg sm:shadow-[2px_2px_0px_#1b1c1a]"
                    : "text-[#4b4731] hover:text-[#1b1c1a] hover:bg-[#f5f3f0]"
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "stroke-[2.5]" : "stroke-[2]"
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center pl-3 py-1.5">
          <Link href="/dashboard?action=create-preset">
            <button
              type="button"
              className="bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] border-2 border-[#1b1c1a] shadow-[2.5px_2.5px_0px_#1b1c1a] hover:shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 rounded-lg px-4 py-2 font-headline font-black text-xs md:text-sm flex items-center gap-1.5 transition-all neo-press cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Plan New Trip</span>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
