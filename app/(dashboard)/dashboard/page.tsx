"use client";

import { useQuery } from "convex/react";
import { DashboardHeader } from "./_components/dashboard-header";
import { api } from "@/convex/_generated/api";
import RecentPlans from "@/components/recent-plans";
import { QuickActions } from "./_components/quick-actions";
import UsageCard from "@/components/Card/usage";

export default function DashboardPage() {
  const user = useQuery(api.users.getCurrentUser);
  const isLoading = user === undefined;
  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader
        user={user ? { ...user, clerkId: user._id } : null}
        isLoading={isLoading}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActions />
        <UsageCard />
      </div>

      <div className="mt-6">
        <RecentPlans />
      </div>
    </div>
  );
}
