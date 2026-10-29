import { auth } from "@/auth";
import Link from "next/link";
import {
  Search,
  Plus,
  Play,
  MoreVertical,
  Clock,
  MapPin,
  ArrowRight,
  Car,
  Bike,
  Zap,
  Bot,
  Send,
  Compass,
} from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import TripPreset, { ITripPreset } from "@/models/TripPreset";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoBadge } from "@/components/ui/NeoBadge";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  let presets: ITripPreset[] = [];

  try {
    if (userId) {
      await connectToDatabase();
      const rawPresets = await TripPreset.find({ userId })
        .sort({ createdAt: -1 })
        .lean();
      presets = JSON.parse(JSON.stringify(rawPresets));
    }
  } catch (error) {
    console.error("Failed to query presets from MongoDB:", error);
  }

  const hasPresets = presets.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* ========================================================================= */}
      {/* TOP SEARCH BAR */}
      {/* ========================================================================= */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#4b4731] pointer-events-none stroke-[2]" />
          <input
            type="text"
            placeholder="Search saved routes, waypoints, petrol pumps..."
            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-[#1b1c1a] rounded-xl shadow-[3px_3px_0px_#1b1c1a] font-sans text-sm md:text-base text-[#1b1c1a] placeholder-[#7d775f] focus:outline-none focus:shadow-[4px_4px_0px_#1b1c1a] transition-all"
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MAIN TWO-COLUMN LAYOUT */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ======================================================================= */}
        {/* LEFT COLUMN: PRESETS AREA (EMPTY STATE OR PRESET CARDS) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-8">
          {!hasPresets ? (
            /* =================================================================== */
            /* EMPTY STATE CARD (Matches exact design screenshot) */
            /* =================================================================== */
            <div className="bg-white border-[3px] border-[#1b1c1a] rounded-3xl neo-shadow-lg p-8 sm:p-14 text-center relative overflow-hidden">
              {/* Decorative Corner Fills */}
              <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#ffe500]/25 pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-[#d0bcff]/20 pointer-events-none" />

              {/* Mascot Container */}
              <div className="relative z-10">
                <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-2xl bg-[#ffe500] border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] flex items-center justify-center p-3 relative mb-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATMMVzhCjxdFasrBK2jovF5cgxydzi_sEkfC7iDfUF0xLVEBFaChS08bRI_PM2J7d0V6stIqwuTmqZEkXePloq43NenVk1UA-tTtQzW0rg3vjCh4Ijq3Gcbrc5ypL518hdr5wdQx8LVwJiJObmDKE-9dkZf2ISmL-TlJEzXThEmINjqkLu4_1PBMubHZpG25w6DtJ13qQbCgESSTun3usDi3VYST6yKKstMhUWK_qmmBUh4XT_FnJF"
                    alt="Barkley Trail Buddy"
                    className="w-full h-full object-contain"
                  />
                  {/* Status Pill on Bottom */}
                  <span className="absolute -bottom-3 inset-x-3 bg-[#0f766e] text-white border-2 border-[#1b1c1a] text-[10px] sm:text-xs font-headline font-black uppercase tracking-wider py-1 px-2 rounded-full shadow-[2px_2px_0px_#1b1c1a] block truncate">
                    WAITING FOR ROUTE
                  </span>
                </div>

                {/* Headings */}
                <h1 className="font-headline text-3xl sm:text-4xl font-black text-[#1b1c1a] tracking-tight mt-7 mb-3">
                  No Road Presets Yet!
                </h1>

                <p className="font-sans text-sm sm:text-base text-[#4b4731] max-w-lg mx-auto leading-relaxed mb-8">
                  Every epic journey begins with a route. Save your favorite highway
                  runs, vehicle fuel preferences, and scenic waypoints for one-tap
                  spontaneous escapes.
                </p>

                {/* Big Yellow CTA Button */}
                <Link href="/dashboard?action=create-preset">
                  <button
                    type="button"
                    className="bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] font-headline font-black text-base sm:text-lg py-3.5 px-8 rounded-xl border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] hover:shadow-[6px_6px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 neo-press-none transition-all inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-5 h-5 stroke-[3]" />
                    <span>Create Your First Preset</span>
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            /* =================================================================== */
            /* POPULATED PRESETS GRID (When presets exist) */
            /* =================================================================== */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <h2 className="font-headline text-2xl font-black text-[#1b1c1a] tracking-tight">
                    Saved Presets
                  </h2>
                  <NeoBadge variant="teal">{presets.length} READY</NeoBadge>
                </div>

                <Link href="/dashboard?action=create-preset">
                  <NeoButton
                    variant="primary"
                    size="sm"
                    icon={<Plus className="w-4 h-4 stroke-[2.5]" />}
                  >
                    New Preset
                  </NeoButton>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presets.map((preset) => (
                  <NeoCard
                    key={preset._id?.toString() || preset.name}
                    size="md"
                    className="p-5 flex flex-col justify-between hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
                  >
                    <div>
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between mb-3">
                        <NeoBadge variant="yellow" icon={<Bike className="w-3.5 h-3.5" />}>
                          {preset.vehicleLabel || preset.vehicleType}
                        </NeoBadge>
                        <span className="font-headline text-xs font-bold text-[#7d775f] bg-[#f5f3f0] px-2.5 py-1 rounded-lg border border-[#cec7aa]">
                          {preset.costEstimate}
                        </span>
                      </div>

                      {/* Route Title */}
                      <h3 className="font-headline text-lg font-black text-[#1b1c1a] mb-1">
                        {preset.name}
                      </h3>

                      {/* Origin -> Destination */}
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#006d3a] mb-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>
                          {preset.origin} → {preset.destination}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-xs text-[#4b4731] line-clamp-2 leading-relaxed mb-4">
                        {preset.description || "Custom planned waypoint route."}
                      </p>
                    </div>

                    {/* Bottom Metric & Actions */}
                    <div className="pt-3 border-t-2 border-dashed border-[#cec7aa] flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-medium text-[#7d775f]">
                        <span className="flex items-center gap-1">
                          <Compass className="w-3.5 h-3.5 text-[#249e90]" />
                          {preset.distance}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-[#726600]" />
                          {preset.duration}
                        </span>
                      </div>

                      <NeoButton
                        variant="primary"
                        size="sm"
                        icon={<Play className="w-3.5 h-3.5 fill-current" />}
                      >
                        Create Trip
                      </NeoButton>
                    </div>
                  </NeoCard>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: ROAMPUP COPILOT SIDEBAR (Matches exact screenshot) */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4">
          <div className="bg-white border-[3px] border-[#1b1c1a] rounded-3xl neo-shadow-lg p-5 flex flex-col justify-between min-h-[520px] relative">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-4 border-b-2 border-dashed border-[#cec7aa] mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ffe500] border-2 border-[#1b1c1a] shadow-[2px_2px_0px_#1b1c1a] flex items-center justify-center font-bold text-base">
                    🐾
                  </div>
                  <h2 className="font-headline text-base font-black text-[#1b1c1a] tracking-tight">
                    ROAMPUP COPILOT
                  </h2>
                </div>

                <span className="font-headline font-bold text-xs bg-[#249e90] text-white border border-[#1b1c1a] px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#1b1c1a]">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  AI READY
                </span>
              </div>

              {/* Chat Message Bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ffe500] border-2 border-[#1b1c1a] shadow-[2px_2px_0px_#1b1c1a] flex items-center justify-center text-[#1b1c1a] shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 stroke-[2.5]" />
                </div>

                <div className="bg-white border-2 border-[#1b1c1a] rounded-2xl p-4 shadow-[3px_3px_0px_#1b1c1a] flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-headline font-bold text-xs text-[#1b1c1a]">
                      RoamPup Copilot
                    </span>
                    <span className="font-sans text-[11px] text-[#7d775f]">
                      Just now
                    </span>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-[#4b4731] leading-relaxed">
                    Hey Pilot! Where are we driving or riding next? Tell me your dream
                    destination or vibe, and I&apos;ll draft the route with fuel and
                    scenic stops.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="mt-6 pt-4 border-t-2 border-dashed border-[#cec7aa]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Ask Copilot: e.g. Plan route from Portland to..."
                  className="w-full bg-white border-2 border-[#1b1c1a] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-sans placeholder-[#7d775f] text-[#1b1c1a] outline-none shadow-[2px_2px_0px_#1b1c1a] focus:bg-[#fbf9f6] transition-all"
                />

                <button
                  type="button"
                  aria-label="Send message to Copilot"
                  className="bg-[#f7cb46] hover:bg-[#ffe500] text-[#1b1c1a] border-2 border-[#1b1c1a] shadow-[2.5px_2.5px_0px_#1b1c1a] hover:shadow-[4px_4px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 p-2.5 rounded-xl cursor-pointer shrink-0 transition-all neo-press"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              <p className="font-sans text-[10px] sm:text-[11px] text-[#7d775f] text-center mt-2.5 font-medium">
                ⚡ Powered by RoamEngine • Live road telemetry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
