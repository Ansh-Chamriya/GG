"use client";

import React from "react";
import { DashboardLayout, EmptyState } from "@/app/components/dashboard/shared";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <DashboardLayout title="Reports" notificationCount={0}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <BarChart3 className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Reports & Analytics
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Generate and view maintenance reports
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {[
          {
            title: "Equipment Health Report",
            description: "Overview of equipment status and health scores",
          },
          {
            title: "Work Order Summary",
            description: "Monthly work order statistics and trends",
          },
          {
            title: "Maintenance Costs",
            description: "Cost analysis by equipment and type",
          },
          {
            title: "Technician Performance",
            description: "Team productivity and completion rates",
          },
          {
            title: "Downtime Analysis",
            description: "Equipment downtime tracking and causes",
          },
          {
            title: "Parts Usage Report",
            description: "Inventory usage and reorder recommendations",
          },
        ].map((report, index) => (
          <div
            key={report.title}
            className="card p-6 cursor-pointer hover:shadow-md transition-all animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              {report.title}
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--foreground-muted)" }}
            >
              {report.description}
            </p>
            <button className="btn btn-secondary text-sm w-full">
              Generate Report
            </button>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
