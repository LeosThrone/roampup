"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookMarked, CalendarDays, Map, UserCircle2 } from "lucide-react";

interface NavItem {
  label: string;
  badge?: string;
  href: string;
  icon: typeof BookMarked;
}

const navItems: NavItem[] = [
  {
    label: "Saved Presets",
    href: "/dashboard",
    icon: BookMarked,
  },
  {
    label: "Scheduled",
    badge: "(3)",
    href: "/trips",
    icon: CalendarDays,
  },
  {
    label: "Map",
    href: "/map",
    icon: Map,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserCircle2,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="App Navigation"
      className="fixed bottom-0 left-0 right-0 z-50 bg-[#fbf9f6] border-t-[3px] border-[#1b1c1a] shadow-[0px_-4px_0px_#1b1c1a]"
    >
      <div className="flex items-stretch max-w-7xl mx-auto">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center py-2.5 sm:py-3 gap-1 text-[10px] sm:text-xs font-headline font-bold tracking-wide cursor-pointer transition-colors relative ${
                isActive
                  ? "text-[#1b1c1a] bg-[#f5f3f0]"
                  : "text-[#7d775f] hover:text-[#1b1c1a]"
              }`}
            >
              {isActive && (
                <span
                  className="absolute top-0 inset-x-0 h-[3px] bg-[#1b1c1a]"
                  aria-hidden="true"
                />
              )}

              <Icon
                className={`w-5 h-5 ${
                  isActive ? "stroke-[2.5]" : "stroke-[1.8]"
                }`}
              />

              <span className="inline-flex items-center gap-1 leading-none">
                {item.label}
                {item.badge && (
                  <span className="text-[9px] px-1 py-0.2 bg-[#ffe500] text-[#1b1c1a] border border-[#1b1c1a] rounded font-headline font-black">
                    {item.badge}
                  </span>
                )}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
