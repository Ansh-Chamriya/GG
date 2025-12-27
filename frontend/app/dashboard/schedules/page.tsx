"use client";

import {
  DashboardLayout,
  SkeletonTable,
} from "@/app/components/dashboard/shared";
import { useSchedules } from "./hooks/useSchedules";
import ScheduleHeader from "@/app/dashboard/schedules/schedules/ScheduleHeader";
import ScheduleTable from "@/app/dashboard/schedules/schedules/ScheduleTable";
import ScheduleEmpty from "@/app/dashboard/schedules/schedules/ScheduleEmpty";

export default function SchedulesPage() {
  const { schedules, isLoading, error, generateWorkOrder, refresh } =
    useSchedules();

  if (error) {
    throw new Error(error);
  }

  return (
    <DashboardLayout title="Schedules" notificationCount={0}>
      <div className="space-y-6">
        <ScheduleHeader onRefresh={refresh} isLoading={isLoading} />

        {isLoading ? (
          <SkeletonTable rows={5} />
        ) : schedules.length === 0 ? (
          <ScheduleEmpty />
        ) : (
          <ScheduleTable
            schedules={schedules}
            onGenerateWorkOrder={generateWorkOrder}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
