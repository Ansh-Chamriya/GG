"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { WorkOrder } from "../types/workorder.types";
import { Clock, User } from "lucide-react";
import { PriorityBadge, Avatar } from "@/app/components/dashboard/shared";

interface WorkOrderCardProps {
  workOrder: WorkOrder;
  isOverlay?: boolean;
  onClick?: () => void;
}

export function WorkOrderCard({
  workOrder,
  isOverlay,
  onClick,
}: WorkOrderCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: workOrder.id,
    data: {
      type: "WorkOrder",
      workOrder,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="h-[140px] w-full rounded-xl opacity-40"
        {...({
          style: {
            ...style,
            border: "2px dashed var(--border)",
            background: "var(--background-secondary)",
          },
        } as React.HTMLAttributes<HTMLDivElement>)}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group relative flex cursor-grab flex-col gap-3 touch-none"
      onClick={onClick}
    >
      <WorkOrderCardInner workOrder={workOrder} />
    </div>
  );
}

export function WorkOrderCardInner({ workOrder }: { workOrder: WorkOrder }) {
  const getPriority = (
    priority: string
  ): "low" | "medium" | "high" | "critical" => {
    if (priority === "critical") return "critical";
    if (priority === "high") return "high";
    if (priority === "medium") return "medium";
    return "low";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="card p-4 hover:shadow-lg transition-all cursor-pointer"
      style={{ borderColor: "transparent" }}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <PriorityBadge priority={getPriority(workOrder.priority)} />
        <span
          className="text-xs font-mono"
          style={{ color: "var(--foreground-muted)" }}
        >
          {workOrder.id.slice(0, 8)}
        </span>
      </div>

      <div className="mb-3">
        <h4
          className="font-medium text-sm line-clamp-1"
          style={{ color: "var(--foreground)" }}
        >
          {workOrder.title}
        </h4>
        {workOrder.description && (
          <p
            className="mt-1 line-clamp-2 text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            {workOrder.description}
          </p>
        )}
      </div>

      <div
        className="flex items-center justify-between pt-3 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          {workOrder.assignee ? (
            <Avatar name={workOrder.assignee.name} size="sm" />
          ) : (
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                border: "1.5px dashed var(--border)",
                background: "var(--background-secondary)",
              }}
            >
              <User
                className="w-3 h-3"
                style={{ color: "var(--foreground-muted)" }}
              />
            </div>
          )}
          {workOrder.assignee && (
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              {workOrder.assignee.name.split(" ")[0]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Clock
            className="w-3 h-3"
            style={{ color: "var(--foreground-muted)" }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            {formatDate(workOrder.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
