"use client";

import { DashboardLayout } from "@/components/pages/dashboard-page";
import Reports from "@/components/dashboard/reports";

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reportes">
      <Reports />
    </DashboardLayout>
  );
}
