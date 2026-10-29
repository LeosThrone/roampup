import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AppHeader from "@/components/app/AppHeader";
import BottomNav from "@/components/app/BottomNav";

export const instant = false;

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f6] text-[#1b1c1a] antialiased">
      <AppHeader />
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
