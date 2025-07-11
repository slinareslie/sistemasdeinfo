"use client";

import AiInsights from "@/components/dashboard/ai-insights";
import { DashboardLayout } from "@/components/pages/dashboard-page";

export default function AiInsightsPage() {
  return (
    <DashboardLayout title="Ideas con IA">
        <div className="max-w-2xl mx-auto">
            <AiInsights />
        </div>
    </DashboardLayout>
  );
}
