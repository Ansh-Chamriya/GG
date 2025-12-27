"use client";

import React, { useMemo } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { WorkOrder, WorkOrderStatus } from "../types/workorder.types";
import { STATUS_CONFIG } from "../utils/statusConfig";
import { WorkOrderCard } from "./WorkOrderCard";

interface KanbanColumnProps {
  status: WorkOrderStatus;
  workOrders: WorkOrder[];
  onWorkOrderClick?: (workOrder: WorkOrder) => void;
}

export function KanbanColumn({
  status,
  workOrders,
  onWorkOrderClick,
}: KanbanColumnProps) {
  const config = STATUS_CONFIG[status];
  const { setNodeRef } = useDroppable({
    id: status,
  });

  const workOrderIds = useMemo(() => workOrders.map((w) => w.id), [workOrders]);

  // Get color from status config
  const getStatusColor = (status: WorkOrderStatus) => {
    switch (status) {
      case "pending":
        return "var(--primary)";
      case "in_progress":
        return "var(--warning)";
      case "completed":
        return "var(--success)";
      case "on_hold":
        return "var(--info)";
      case "cancelled":
        return "var(--foreground-muted)";
      default:
        return "var(--foreground-muted)";
    }
  };

  const statusColor = getStatusColor(status);

  return (
    <div
      className="flex h-full w-full flex-col rounded-2xl p-3"
      style={{ background: "var(--background-secondary)" }}
    >
      {/* Column Header */}
      <div
        className="mb-4 flex items-center justify-between p-3 rounded-xl"
        style={{ background: "var(--background)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: statusColor }}
          />
          <span
            className="font-medium text-sm"
            style={{ color: "var(--foreground)" }}
          >
            {config.label}
          </span>
        </div>
        <span
          className="px-2.5 py-1 rounded-lg text-xs font-semibold"
          style={{
            background: "var(--background-secondary)",
            color: "var(--foreground-muted)",
          }}
        >
          {workOrders.length}
        </span>
      </div>

      {/* Cards container */}
      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl p-2"
        style={{ background: "var(--background-tertiary)" }}
      >
        <SortableContext
          items={workOrderIds}
          strategy={verticalListSortingStrategy}
        >
          {workOrders.map((wo, index) => (
            <div
              key={wo.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <WorkOrderCard
                workOrder={wo}
                onClick={
                  onWorkOrderClick ? () => onWorkOrderClick(wo) : undefined
                }
              />
            </div>
          ))}
        </SortableContext>

        {workOrders.length === 0 && (
          <div
            className="flex h-32 flex-col items-center justify-center rounded-xl"
            style={{
              border: "2px dashed var(--border)",
              background: "var(--background-secondary)",
            }}
          >
            <span
              className="text-sm"
              style={{ color: "var(--foreground-muted)" }}
            >
              No work orders
            </span>
            <span
              className="text-xs mt-1"
              style={{ color: "var(--foreground-muted)", opacity: 0.6 }}
            >
              Drop items here
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
