import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import {
  User,
  Mail,
  Shield,
  Phone,
  LogOut,
  Calendar,
  Compass,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { NeoButton } from "@/components/ui/NeoButton";
import { NeoCard } from "@/components/ui/NeoCard";
import { NeoBadge } from "@/components/ui/NeoBadge";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[#1b1c1a] tracking-tight">
          Adventurer Profile
        </h1>
        <p className="font-sans text-sm md:text-base text-[#4b4731] mt-1">
          Manage your pilot credentials, emergency contacts, and road preferences.
        </p>
      </div>

      <div className="space-y-6">
        {/* User Identity Card */}
        <NeoCard size="lg" className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b-2 border-dashed border-[#cec7aa]">
            <div className="flex items-center gap-4">
              {/* Avatar Box */}
              <div className="w-16 h-16 rounded-2xl bg-[#ffe500] border-[2.5px] border-[#1b1c1a] shadow-[4px_4px_0px_#1b1c1a] flex items-center justify-center font-headline text-2xl font-black text-[#1b1c1a] shrink-0">
                {user.name ? user.name.charAt(0).toUpperCase() : "A"}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-xl sm:text-2xl font-black text-[#1b1c1a]">
                    {user.name || "Adventurer"}
                  </h2>
                  <NeoBadge variant="green">Verified Pilot</NeoBadge>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#4b4731] flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{user.email}</span>
                </p>
              </div>
            </div>

            {/* Sign Out Server Action */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <NeoButton
                type="submit"
                variant="danger"
                size="sm"
                icon={<LogOut className="w-4 h-4" />}
              >
                Sign Out
              </NeoButton>
            </form>
          </div>

          {/* Account Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6">
            <div className="p-3.5 bg-[#f5f3f0] border-2 border-[#1b1c1a] rounded-xl shadow-[2.5px_2.5px_0px_#1b1c1a]">
              <span className="font-headline text-[10px] uppercase font-bold text-[#7d775f] tracking-wide block">
                Account Status
              </span>
              <span className="font-headline text-sm font-bold text-[#006d3a] flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Active
              </span>
            </div>

            <div className="p-3.5 bg-[#f5f3f0] border-2 border-[#1b1c1a] rounded-xl shadow-[2.5px_2.5px_0px_#1b1c1a]">
              <span className="font-headline text-[10px] uppercase font-bold text-[#7d775f] tracking-wide block">
                Active Presets
              </span>
              <span className="font-headline text-sm font-bold text-[#1b1c1a] mt-0.5 block">
                3 Presets
              </span>
            </div>

            <div className="p-3.5 bg-[#f5f3f0] border-2 border-[#1b1c1a] rounded-xl shadow-[2.5px_2.5px_0px_#1b1c1a] col-span-2 sm:col-span-1">
              <span className="font-headline text-[10px] uppercase font-bold text-[#7d775f] tracking-wide block">
                Scheduled Trips
              </span>
              <span className="font-headline text-sm font-bold text-[#1b1c1a] mt-0.5 block">
                3 Trips Pending
              </span>
            </div>
          </div>
        </NeoCard>

        {/* Emergency Contact & Safety Section (SRS requirement) */}
        <NeoCard size="md" className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="font-headline text-lg font-black text-[#1b1c1a] flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#ba1a1a]" />
                <span>Emergency SOS Contacts</span>
              </h3>
              <p className="font-sans text-xs text-[#4b4731] mt-1 leading-relaxed">
                Emergency contacts receive your last verified waypoint location when you tap
                the SOS trigger in the header.
              </p>
            </div>
            <NeoBadge variant="gray">Phase 10 Safety</NeoBadge>
          </div>

          <div className="p-4 bg-[#fbf9f6] border-2 border-dashed border-[#cec7aa] rounded-xl flex items-center justify-between text-xs font-medium text-[#7d775f]">
            <span>No emergency contacts configured yet.</span>
            <span className="font-bold text-[#726600]">Configure in Phase 10 →</span>
          </div>
        </NeoCard>
      </div>
    </div>
  );
}
