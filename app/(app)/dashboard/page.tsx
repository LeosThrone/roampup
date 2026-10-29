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
  ArrowUpRight,
  CheckCircle2,
  Radio,
  Car,
  Bike,
} from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoBadge } from "@/components/ui/NeoBadge";

// ==========================================
// MOCK DATA (PLACEHOLDER FOR PERSISTED DATA)
// ==========================================

interface PresetItem {
  id: string;
  name: string;
  origin: string;
  destination: string;
  distance: string;
  duration: string;
  vehicleType: "2-Wheeler" | "4-Wheeler" | "EV";
  vehicleLabel: string;
  costEstimate: string;
  description: string;
  tags: string[];
}

const MOCK_PRESETS: PresetItem[] = [
  {
    id: "preset-1",
    name: "Pacific Crest Escapade",
    origin: "Portland, OR",
    destination: "Bend, OR",
    distance: "178 mi",
    duration: "3h 45m",
    vehicleType: "2-Wheeler",
    vehicleLabel: "2-Wheeler Run",
    costEstimate: "~$42 est.",
    description:
      "Twisting mountain ridges, scenic volcanic viewpoints, and designated motorcycle-friendly rest spots with pet relief zones.",
    tags: ["2-Wheeler Run", "Fuel & Tolls Incl."],
  },
  {
    id: "preset-2",
    name: "Redwood Coastal Haul",
    origin: "Eureka, CA",
    destination: "San Francisco, CA",
    distance: "272 mi",
    duration: "5h 10m",
    vehicleType: "4-Wheeler",
    vehicleLabel: "4-Wheeler Cruiser",
    costEstimate: "~$68 est.",
    description:
      "Coastal curves with dog-friendly beaches, redwood groves, and verified dog-park waypoints along US-101.",
    tags: ["4-Wheeler Cruiser", "Fuel & Tolls Incl."],
  },
  {
    id: "preset-3",
    name: "Red Rocks & Desert Canyons",
    origin: "St. George, UT",
    destination: "Moab, UT",
    distance: "315 mi",
    duration: "5h 30m",
    vehicleType: "EV",
    vehicleLabel: "EV Fast-Charge Ready",
    costEstimate: "~$55 est.",
    description:
      "Scenic highway through sandstone canyon country with verified high-power chargers every 60 miles and water stops.",
    tags: ["EV Fast-Charge Ready", "Fuel & Tolls Incl."],
  },
];

const FILTER_CHIPS = [
  { label: "All Presets (14)", active: true },
  { label: "2-Wheeler Run", active: false },
  { label: "4-Wheeler Cruiser", active: false },
  { label: "Mountain Pass", active: false },
  { label: "EV Fast-Charge Ready", active: false },
];

const MOCK_ONGOING_TRIP = {
  id: "trip-sierra-01",
  name: "Sierra Pass Descent",
  origin: "Lake Tahoe, CA",
  destination: "Bishop, CA",
  totalDistance: "242 mi",
  currentProgressPercent: 48,
  currentStopIndex: 2,
  totalStops: 5,
  nextStopName: "Mono Lake Vista Point",
  nextStopDistance: "18 mi",
  nextStopEta: "25 min",
  stops: [
    { name: "Emerald Bay Overlook", status: "completed" },
    { name: "Mono Lake Vista Point", status: "active" },
    { name: "Mammoth Lakes Gateway", status: "upcoming" },
    { name: "Ancient Bristlecone Pines", status: "upcoming" },
  ],
};

export const instant = false;

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || "Adventurer";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8 space-y-6">
      {/* Top Banner / Welcome & Search */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="font-headline font-black text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#1b1c1a]">
              Welcome back, {userName}!
            </h1>
            <p className="font-sans text-sm text-[#4b4731] mt-1">
              Pick up where you left off or plan your next dog-friendly waypoint run.
            </p>
           </div>
         </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7d775f]" />
          <input
            type="text"
            placeholder="Search presets by name, vehicle, or waypoint..."
            className="bg-white border-2 border-[#1b1c1a] rounded-xl shadow-[3px_3px_0px_#1b1c1a] pl-10 pr-4 py-2.5 w-full font-sans text-sm text-[#1b1c1a] focus:outline-none focus:ring-2 focus:ring-[#ffe500] placeholder:text-[#7d775f]"
          />
        </div>

        {/* Route Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {FILTER_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              className={`shrink-0 font-headline font-bold text-xs px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                chip.active
                  ? "bg-[#ffe500] text-[#1b1c1a] border-2 border-[#1b1c1a] shadow-[2px_2px_0px_#1b1c1a]"
                  : "bg-white hover:bg-[#f5f3f0] text-[#4b4731] border-2 border-[#cec7aa]"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Responsive Two Columns on desktop, single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Saved Presets */}
        <div className="lg:col-span-8 order-2 lg:order-1 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline font-black text-xl text-[#1b1c1a]">
                Saved Presets
              </h2>
              <NeoBadge variant="gray">14 total</NeoBadge>
            </div>
            <span className="text-xs font-sans text-[#7d775f]">
              Auto-synced with vehicle profiles
            </span>
          </div>

          {/* Presets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_PRESETS.map((preset) => (
              <NeoCard
                key={preset.id}
                size="md"
                className="p-4 flex flex-col justify-between hover:shadow-[6px_6px_0px_#1b1c1a] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
              >
                <div className="space-y-3">
                  {/* Card Map Graphic Placeholder */}
                  <div className="h-28 w-full bg-[#f5f3f0] rounded-xl border-2 border-[#1b1c1a] relative overflow-hidden p-3 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {preset.vehicleType === "2-Wheeler" ? (
                          <Bike className="w-4 h-4 text-[#1b1c1a]" />
                        ) : (
                          <Car className="w-4 h-4 text-[#1b1c1a]" />
                        )}
                        <NeoBadge variant="yellow" className="text-[10px]">
                          {preset.vehicleLabel}
                        </NeoBadge>
                      </div>
                      <NeoBadge variant="gray" className="text-[10px]">
                        {preset.costEstimate}
                      </NeoBadge>
                    </div>

                    {/* Div-based route illustration */}
                    <div className="relative flex items-center justify-between px-4 py-2">
                      <div className="flex flex-col items-center z-10">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#7af8a5] border-2 border-[#1b1c1a]" />
                        <span className="text-[9px] font-headline font-bold text-[#1b1c1a] mt-0.5">
                          Origin
                        </span>
                      </div>
                      <div className="flex-1 mx-2 border-t-2 border-dashed border-[#1b1c1a] relative">
                        <span className="absolute left-1/2 -top-1.5 -translate-x-1/2 w-2 h-2 rounded-full bg-[#ffe500] border border-[#1b1c1a]" />
                      </div>
                      <div className="flex flex-col items-center z-10">
                        <span className="w-3.5 h-3.5 rounded-full bg-[#ffdad6] border-2 border-[#ba1a1a]" />
                        <span className="text-[9px] font-headline font-bold text-[#ba1a1a] mt-0.5">
                          Dest
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <NeoBadge variant="teal" className="text-[9px] py-0 px-2">
                        Fuel & Tolls Incl.
                      </NeoBadge>
                    </div>
                  </div>

                  {/* Preset Title & Route Description */}
                  <div>
                    <h3 className="font-headline font-black text-lg text-[#1b1c1a] leading-snug">
                      {preset.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-headline font-bold text-[#4b4731] mt-1">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#006d3a]" />
                        {preset.origin}
                      </span>
                      <ArrowRight className="w-3 h-3 text-[#7d775f]" />
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                        {preset.destination}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-[#4b4731] mt-2 line-clamp-2">
                      {preset.description}
                    </p>
                  </div>

                  {/* Distance & Duration Row */}
                  <div className="flex items-center justify-between text-xs font-headline font-bold text-[#1b1c1a] bg-[#efeeeb] px-3 py-1.5 rounded-lg border border-[#1b1c1a]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1b1c1a]" />
                      {preset.distance}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#1b1c1a]" />
                      {preset.duration}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2 pt-4 mt-3 border-t-2 border-[#1b1c1a]/10">
                  <NeoButton
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    icon={<Play className="w-3.5 h-3.5" />}
                  >
                    Create Trip
                  </NeoButton>
                  <NeoButton
                    variant="secondary"
                    size="sm"
                    aria-label="Preset options"
                    className="px-2.5"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </NeoButton>
                </div>
              </NeoCard>
            ))}

            {/* Create New Preset CTA Card */}
            <Link href="/trips/new" className="block">
            <div className="border-[2.5px] border-dashed border-[#cec7aa] hover:border-[#1b1c1a] hover:bg-white rounded-2xl bg-[#fbf9f6] transition-all cursor-pointer p-6 flex flex-col items-center justify-center text-center min-h-[340px] group neo-shadow-sm hover:neo-shadow">
              <div className="w-14 h-14 rounded-full bg-[#ffe500] border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] flex items-center justify-center mb-3 group-hover:scale-105 group-hover:shadow-[4px_4px_0px_#1b1c1a] transition-all">
                <Plus className="w-7 h-7 text-[#1b1c1a] stroke-[2.5]" />
              </div>
              <h3 className="font-headline font-black text-lg text-[#1b1c1a]">
                Create New Preset
              </h3>
              <p className="font-sans text-xs text-[#7d775f] max-w-xs mt-1.5">
                Save a recurring road trip template with preferred waypoint intervals, vehicle profiles, and dog rest stops.
              </p>
            </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Ongoing Trip (Desktop Sticky, Mobile First) */}
        <div className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-20 space-y-4">
          <NeoCard size="lg" className="overflow-hidden">
            {/* Ongoing Trip Top Strip */}
            <div className="bg-[#ffe500] border-b-2 border-[#1b1c1a] px-4 py-2.5 flex items-center justify-between">
              <span className="font-headline font-black text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#1b1c1a]">
                <Radio className="w-3.5 h-3.5 text-[#006d3a] animate-pulse" />
                ONGOING TRIP • ACTIVE
              </span>
              <NeoBadge variant="gray" className="text-[10px]">
                Stop {MOCK_ONGOING_TRIP.currentStopIndex} of{" "}
                {MOCK_ONGOING_TRIP.totalStops}
              </NeoBadge>
            </div>

            <div className="p-4 sm:p-5 space-y-4">
              {/* Trip Header */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-headline font-black text-xl text-[#1b1c1a]">
                    {MOCK_ONGOING_TRIP.name}
                  </h3>
                  <NeoBadge variant="green" className="text-[10px]">
                    4-Wheeler
                  </NeoBadge>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-headline font-semibold text-[#4b4731] mt-1">
                  <span>{MOCK_ONGOING_TRIP.origin}</span>
                  <ArrowRight className="w-3 h-3 text-[#7d775f]" />
                  <span>{MOCK_ONGOING_TRIP.destination}</span>
                  <span className="text-[#7d775f]">
                    ({MOCK_ONGOING_TRIP.totalDistance})
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-headline font-bold text-[#4b4731]">
                  <span>Trip Progress</span>
                  <span>{MOCK_ONGOING_TRIP.currentProgressPercent}%</span>
                </div>
                <div className="h-3 w-full bg-[#efeeeb] border-2 border-[#1b1c1a] rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-[#7af8a5] rounded-full border-r border-[#1b1c1a] transition-all"
                    style={{
                      width: `${MOCK_ONGOING_TRIP.currentProgressPercent}%`,
                    }}
                  />
                </div>
              </div>

              {/* Next Waypoint Callout */}
              <div className="bg-[#f5f3f0] border-2 border-[#1b1c1a] rounded-xl p-3 space-y-1 shadow-[2px_2px_0px_#1b1c1a]">
                <div className="text-[10px] font-headline font-black uppercase tracking-wider text-[#7d775f]">
                  Next Waypoint
                </div>
                <div className="font-headline font-bold text-sm text-[#1b1c1a] flex items-center justify-between">
                  <span>{MOCK_ONGOING_TRIP.nextStopName}</span>
                  <span className="text-xs bg-white border border-[#1b1c1a] px-2 py-0.5 rounded font-sans font-medium text-[#1b1c1a]">
                    {MOCK_ONGOING_TRIP.nextStopDistance} • {MOCK_ONGOING_TRIP.nextStopEta}
                  </span>
                </div>
              </div>

              {/* Mini Map Placeholder */}
              <div className="h-28 w-full bg-[#fbf9f6] border-2 border-[#1b1c1a] rounded-xl relative p-3 flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] font-headline font-bold bg-white border border-[#1b1c1a] px-1.5 py-0.5 rounded">
                    Sierra Route Profile
                  </span>
                  <span className="text-[10px] font-headline font-bold text-[#006d3a] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006d3a]" />
                    GPS Signal Locked
                  </span>
                </div>

                <div className="relative z-10 flex items-center justify-between px-4">
                  <div className="w-3 h-3 rounded-full bg-[#7af8a5] border-2 border-[#1b1c1a]" />
                  <div className="flex-1 mx-2 border-t-2 border-dashed border-[#1b1c1a] relative">
                    <span className="absolute -top-1.5 left-1/3 w-3 h-3 rounded-full bg-[#ffe500] border-2 border-[#1b1c1a] animate-ping" />
                    <span className="absolute -top-1.5 left-1/3 w-3 h-3 rounded-full bg-[#ffe500] border-2 border-[#1b1c1a]" />
                  </div>
                  <div className="w-3 h-3 rounded-full bg-[#ffdad6] border-2 border-[#ba1a1a]" />
                </div>

                <div className="relative z-10 flex justify-between text-[10px] font-sans text-[#4b4731]">
                  <span>Lake Tahoe</span>
                  <span>Bishop Pass</span>
                </div>
              </div>

              {/* Waypoint Itinerary Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-headline font-bold text-[#1b1c1a] flex items-center justify-between">
                  <span>Itinerary Stops</span>
                  <span className="text-[11px] text-[#7d775f]">4 listed</span>
                </div>
                <div className="space-y-1.5">
                  {MOCK_ONGOING_TRIP.stops.map((stop, sIdx) => {
                    const isCompleted = stop.status === "completed";
                    const isActive = stop.status === "active";

                    return (
                      <div
                        key={sIdx}
                        className={`flex items-center gap-2 p-2 rounded-lg text-xs font-sans transition-all border ${
                          isActive
                            ? "bg-[#ffe500]/25 border-[#1b1c1a] font-semibold text-[#1b1c1a]"
                            : isCompleted
                            ? "bg-[#f5f3f0] border-transparent text-[#7d775f] line-through"
                            : "bg-white border-[#cec7aa] text-[#4b4731]"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#006d3a] shrink-0" />
                        ) : isActive ? (
                          <Radio className="w-3.5 h-3.5 text-[#e91e8c] shrink-0 animate-pulse" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border border-[#7d775f] shrink-0 inline-block" />
                        )}
                        <span className="truncate">{stop.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Full Trip Screen CTA */}
              <Link href={`/trips/${MOCK_ONGOING_TRIP.id}`} className="block">
                <NeoButton
                  variant="primary"
                  size="md"
                  className="w-full"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Open Full Trip Screen
                </NeoButton>
              </Link>
            </div>
          </NeoCard>
        </div>
      </div>
    </div>
  );
}
