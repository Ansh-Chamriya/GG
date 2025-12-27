"use client";

import React from "react";
import Link from "next/link";
import { ClipboardList, Plus, Filter, RefreshCw } from "lucide-react";

interface WorkOrderHeaderProps {
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function WorkOrderHeader({
  onRefresh,
  isLoading,
}: WorkOrderHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <ClipboardList
            className="w-6 h-6"
            style={{ color: "var(--primary)" }}
          />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Work Orders
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Manage and track your maintenance tasks
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="btn btn-secondary">
          <Filter className="w-4 h-4" />
          Filter
        </button>
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
        <Link href="/dashboard/work-orders/new" className="btn btn-primary">
          <Plus className="w-4 h-4" />
          New Work Order
        </Link>
      </div>
    </div>
  );
}
