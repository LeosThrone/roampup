import {
  Map as MapIcon,
  Compass,
  Layers,
  Fuel,
  PawPrint,
  Zap,
  Navigation,
} from "lucide-react";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoBadge } from "@/components/ui/NeoBadge";

export default function MapExplorerPage() {
  const mapLayers = [
    { label: "Scenic Waypoints", icon: Compass, active: true },
    { label: "Fuel & Pumps", icon: Fuel, active: false },
    { label: "Pet Relief Stops", icon: PawPrint, active: false },
    { label: "EV Fast Chargers", icon: Zap, active: false },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b1c1a] tracking-tight">
            Trail & Waypoint Explorer
          </h1>
          <p className="font-sans text-sm md:text-base text-[#4b4731] mt-1">
            Scout real-time road elevation, fuel hubs, and pet-friendly waypoints.
          </p>
        </div>

        <NeoBadge variant="teal" icon={<Layers className="w-3.5 h-3.5" />}>
          OSM Engine Ready (Phase 5)
        </NeoBadge>
      </div>

      {/* Layer Filter Chips */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none">
        {mapLayers.map((layer) => {
          const Icon = layer.icon;
          return (
            <button
              key={layer.label}
              type="button"
              className={`font-headline text-xs font-bold px-3 py-1.5 rounded-full border-2 border-[#1b1c1a] shadow-[2px_2px_0px_#1b1c1a] flex items-center gap-1.5 shrink-0 transition-all ${
                layer.active
                  ? "bg-[#ffe500] text-[#1b1c1a]"
                  : "bg-white text-[#4b4731] hover:bg-[#f5f3f0]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>

      {/* Map Canvas Mock Container */}
      <NeoCard size="lg" className="p-0 overflow-hidden relative min-h-[420px] md:min-h-[500px] flex items-center justify-center bg-[#f5f3f0]">
        {/* Subtle grid pattern for map canvas */}
        <div className="absolute inset-0 bg-dot-matrix opacity-40 pointer-events-none" />

        {/* Center Canvas Card */}
        <div className="relative z-10 max-w-md w-full mx-4 p-6 bg-white border-[2.5px] border-[#1b1c1a] rounded-2xl shadow-[5px_5px_0px_#1b1c1a] text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#ffe500] border-2 border-[#1b1c1a] shadow-[3px_3px_0px_#1b1c1a] flex items-center justify-center mx-auto mb-4">
            <Navigation className="w-7 h-7 text-[#1b1c1a] stroke-[2.2]" />
          </div>

          <h2 className="font-headline text-xl font-black text-[#1b1c1a] mb-2">
            Interactive Map Engine
          </h2>

          <p className="font-sans text-xs sm:text-sm text-[#4b4731] leading-relaxed mb-4">
            Full Leaflet.js and OpenStreetMap tile streaming will be integrated in{" "}
            <strong>Phase 5</strong> with point-to-point elevation profiles, route detours,
            and offline vector caches.
          </p>

          <NeoBadge variant="yellow">
            Map Mode Preview Active
          </NeoBadge>
        </div>
      </NeoCard>
    </div>
  );
}
