"use client";

import Link from "next/link";
import { Calendar, Plus } from "lucide-react";
import { EmptyState } from "@/app/components/dashboard/shared";

export default function ScheduleEmpty() {
  return (
    <div className="card p-8">
      <EmptyState
        icon={<Calendar className="w-8 h-8" />}
        title="No maintenance schedules yet"
        description="Create your first preventive or predictive maintenance schedule to keep your equipment running smoothly."
        action={
          <Link href="/dashboard/schedules/new" className="btn btn-primary">
            <Plus className="w-4 h-4" />
            Create Schedule
          </Link>
        }
      />
    </div>
  );
}
