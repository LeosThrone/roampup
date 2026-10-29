"use client";

import Link from "next/link";
import { PawPrint, Bell, Siren } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="bg-[#fbf9f6] sticky top-0 z-50 border-b-[3px] border-[#1b1c1a] shadow-[0px_4px_0px_#1b1c1a]">
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-3 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#ffe500] border-[3px] border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] rounded flex items-center justify-center group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_#1b1c1a] transition-all">
            <PawPrint className="w-6 h-6 text-[#1b1c1a] stroke-[2.5]" />
          </div>
          <span className="font-headline text-2xl md:text-3xl font-black tracking-tight text-[#1b1c1a]">
            RoamPup
          </span>
        </Link>

        {/* Right Actions: Notifications & SOS */}
        <div className="flex items-center gap-3">
          {/* Notifications Button */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative bg-white border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] rounded-lg p-2 hover:shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer neo-press"
          >
            <Bell className="w-5 h-5 text-[#1b1c1a] stroke-[2.2]" />
            <span
              className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full border border-[#1b1c1a]"
              aria-hidden="true"
            />
          </button>

          {/* SOS Button */}
          <button
            type="button"
            aria-label="Emergency SOS"
            className="bg-[#e91e8c] hover:bg-[#c2185b] text-white border-[2.5px] border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] hover:shadow-[5px_5px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 rounded-lg px-3 py-2 font-headline font-black text-sm flex items-center gap-1.5 transition-all neo-press cursor-pointer"
          >
            <Siren className="w-4 h-4 shrink-0" />
            <span className="leading-none">SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
