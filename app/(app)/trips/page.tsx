import Link from "next/link";
import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
  Plus,
  Car,
  Compass,
} from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoBadge } from "@/components/ui/NeoBadge";

export default function ScheduledTripsPage() {
  const scheduledTrips = [
    {
      id: "trip-1",
      title: "Sierra Pass Descent",
      date: "Tomorrow, Oct 30 • 06:30 AM",
      origin: "Base Camp Lake Trail",
      destination: "Canyon Lookout Vista",
      stops: "5 waypoints",
      vehicle: "Ducati Scrambler 800",
      status: "Ready for Departure",
      statusVariant: "green" as const,
    },
    {
      id: "trip-2",
      title: "Redwood Coastal Haul",
      date: "Saturday, Nov 1 • 08:00 AM",
      origin: "Eureka, CA",
      destination: "San Francisco, CA",
      stops: "7 waypoints",
      vehicle: "Subaru Outback AWD",
      status: "Checklist Incomplete",
      statusVariant: "yellow" as const,
    },
    {
      id: "trip-3",
      title: "Highland Monsoon Blast",
      date: "Friday, Nov 7 • 07:15 AM",
      origin: "Munnar Foothills",
      destination: "Cloud Peak Pass",
      stops: "4 waypoints",
      vehicle: "Royal Enfield Himalayan",
      status: "Route Verified",
      statusVariant: "teal" as const,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b1c1a] tracking-tight">
            Scheduled Trips
          </h1>
          <p className="font-sans text-sm md:text-base text-[#4b4731] mt-1">
            Track upcoming departures, waypoint timetables, and vehicle prep.
          </p>
        </div>

        <Link href="/dashboard">
          <NeoButton variant="primary" icon={<Plus className="w-4 h-4 stroke-[2.5]" />}>
            Plan New Trip
          </NeoButton>
        </Link>
      </div>

      {/* Trips List */}
      <div className="space-y-4">
        {scheduledTrips.map((trip) => (
          <NeoCard key={trip.id} size="md" className="p-5 sm:p-6 transition-all hover:-translate-x-0.5 hover:-translate-y-0.5">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Trip Info */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <NeoBadge variant={trip.statusVariant}>
                    {trip.status}
                  </NeoBadge>
                  <span className="font-headline text-xs font-bold text-[#7d775f] flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>{trip.date}</span>
                  </span>
                </div>

                <h2 className="font-headline text-xl font-black text-[#1b1c1a] tracking-tight">
                  {trip.title}
                </h2>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#4b4731]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#006d3a]" />
                    <span>{trip.origin} → {trip.destination}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Compass className="w-3.5 h-3.5 text-[#249e90]" />
                    <span>{trip.stops}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-[#726600]" />
                    <span>{trip.vehicle}</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-2 shrink-0">
                <Link href="/dashboard">
                  <NeoButton variant="secondary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                    View Itinerary
                  </NeoButton>
                </Link>
              </div>
            </div>
          </NeoCard>
        ))}
      </div>
    </div>
  );
}
