import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Suspense } from "react";
import DashboardClient from "./dashboard-client";

async function DashboardContent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user as { role?: string } | undefined;

  if (!session || user?.role !== "admin") {
    redirect("/login");
  }

  return <DashboardClient />;
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div>กำลังโหลด...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
