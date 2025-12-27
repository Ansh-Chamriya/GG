"use client";

interface ScheduleStatusBadgeProps {
  isActive: boolean;
}

export default function ScheduleStatusBadge({
  isActive,
}: ScheduleStatusBadgeProps) {
  return (
    <span className={`badge ${isActive ? "badge-success" : "badge-neutral"}`}>
      {isActive ? "Active" : "Inactive"}
    </span>
  );
}
