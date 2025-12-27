"use client";

import React from "react";
import { DashboardLayout } from "@/app/components/dashboard/shared";
import { WorkOrderHeader } from "./components/WorkOrderHeader";
import { WorkOrderKanban } from "./components/WorkOrderKanban";

export default function WorkOrdersPage() {
  return (
    <DashboardLayout title="Work Orders" notificationCount={0}>
      <div className="flex flex-col h-[calc(100vh-160px)]">
        <WorkOrderHeader />
        <div className="flex-1 overflow-hidden">
          <WorkOrderKanban />
        </div>
      </div>
    </DashboardLayout>
  );
}
