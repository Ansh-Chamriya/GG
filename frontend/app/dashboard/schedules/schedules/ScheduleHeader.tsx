"use client";

import Link from "next/link";
import { Plus, Calendar, RefreshCw } from "lucide-react";

interface ScheduleHeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export default function ScheduleHeader({
  onRefresh,
  isLoading,
}: ScheduleHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <Calendar className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Maintenance Schedules
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Manage preventive and predictive maintenance strategies
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        )}
        <Link href="/dashboard/schedules/new" className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Create Schedule
        </Link>
      </div>
    </div>
  );
}
