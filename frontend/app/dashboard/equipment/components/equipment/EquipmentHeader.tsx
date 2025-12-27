"use client";

import Link from "next/link";
import { Settings, Plus, RefreshCw } from "lucide-react";

interface EquipmentHeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function EquipmentHeader({
  onRefresh,
  isLoading,
}: EquipmentHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <Settings className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Equipment
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Manage and track all your assets
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
        <Link href="/dashboard/equipment/new" className="btn btn-primary">
          <Plus className="w-4 h-4" />
          Add Equipment
        </Link>
      </div>
    </div>
  );
}
