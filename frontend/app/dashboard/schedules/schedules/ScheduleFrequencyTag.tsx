"use client";

import { Clock } from "lucide-react";

interface ScheduleFrequencyTagProps {
  type: string;
  value: number;
}

export default function ScheduleFrequencyTag({
  type,
  value,
}: ScheduleFrequencyTagProps) {
  const formatFrequency = () => {
    const plural = value > 1 ? "s" : "";

    switch (type) {
      case "daily":
        return value === 1 ? "Daily" : `Every ${value} day${plural}`;
      case "weekly":
        return value === 1 ? "Weekly" : `Every ${value} week${plural}`;
      case "monthly":
        return value === 1 ? "Monthly" : `Every ${value} month${plural}`;
      case "yearly":
        return value === 1 ? "Yearly" : `Every ${value} year${plural}`;
      default:
        return `Every ${value} ${type}${plural}`;
    }
  };

  return (
    <div
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
      style={{
        background: "var(--background-secondary)",
        color: "var(--foreground)",
      }}
    >
      <Clock className="w-3 h-3" style={{ color: "var(--primary)" }} />
      {formatFrequency()}
    </div>
  );
}
