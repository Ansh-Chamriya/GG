"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  PriorityBadge,
  Avatar,
  EmptyState,
} from "@/app/components/dashboard/shared";
import { workorderService } from "@/app/lib/api/services";
import { WorkOrder, User, WorkOrderStatus } from "@/app/lib/api/config";
import {
  Kanban as KanbanIcon,
  RefreshCw,
  Plus,
  AlertCircle,
  Clock,
  Wrench,
  User as UserIcon,
} from "lucide-react";

type KanbanColumn = "pending" | "in_progress" | "completed" | "cancelled";

interface KanbanCard {
  id: string;
  work_order_number: string;
  title: string;
  priority: string;
  status: string;
  equipment?: { name: string };
  assigned_user?: User;
  due_date?: string;
}

function useWorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await workorderService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : (response.data as unknown as { items: WorkOrder[] }).items || [];
        setWorkOrders(items);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch work orders"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkOrders();
  }, [fetchWorkOrders]);

  return { workOrders, isLoading, error, refetch: fetchWorkOrders };
}

export default function KanbanPage() {
  const { workOrders, isLoading, error, refetch } = useWorkOrders();

  const columns: { id: KanbanColumn; label: string; color: string }[] = [
    { id: "pending", label: "Pending", color: "var(--primary)" },
    { id: "in_progress", label: "In Progress", color: "var(--warning)" },
    { id: "completed", label: "Completed", color: "var(--success)" },
    { id: "cancelled", label: "Cancelled", color: "var(--foreground-muted)" },
  ];

  const getWorkOrdersByStatus = (status: KanbanColumn): KanbanCard[] => {
    return workOrders
      .filter((wo) => {
        if (status === "pending") return wo.status === "pending";
        if (status === "in_progress") return wo.status === "in_progress";
        if (status === "completed") return wo.status === "completed";
        if (status === "cancelled")
          return wo.status === "cancelled" || wo.status === "on_hold";
        return false;
      })
      .map((wo) => ({
        id: wo.id,
        work_order_number: wo.work_order_number,
        title: wo.title,
        priority: wo.priority,
        status: wo.status,
        equipment: wo.equipment,
        assigned_user: wo.assigned_user,
        due_date: wo.due_date,
      }));
  };

  const getPriorityFromString = (
    priority: string
  ): "low" | "medium" | "high" | "critical" => {
    if (priority === "critical") return "critical";
    if (priority === "high") return "high";
    if (priority === "medium") return "medium";
    return "low";
  };

  if (error) {
    return (
      <DashboardLayout title="Kanban Board" notificationCount={0}>
        <div className="card p-8">
          <EmptyState
            icon={
              <AlertCircle
                className="w-8 h-8"
                style={{ color: "var(--danger)" }}
              />
            }
            title="Failed to load work orders"
            description={error}
            action={
              <button onClick={refetch} className="btn btn-primary text-sm">
                <RefreshCw className="w-4 h-4" /> Retry
              </button>
            }
          />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Kanban Board" notificationCount={0}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary-100)" }}
          >
            <KanbanIcon
              className="w-6 h-6"
              style={{ color: "var(--primary)" }}
            />
          </div>
          <div>
            <h2
              className="text-xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Work Orders Kanban
            </h2>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              Drag and drop to update status
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={refetch}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <button className="btn btn-primary">
            <Plus className="w-4 h-4" />
            New Work Order
          </button>
        </div>
      </div>

      {/* Kanban Board */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="space-y-3">
              <div className="skeleton-card h-10 rounded-lg" />
              <div className="skeleton-card h-32 rounded-xl" />
              <div className="skeleton-card h-32 rounded-xl" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((column) => {
            const cards = getWorkOrdersByStatus(column.id);
            return (
              <div key={column.id} className="space-y-3">
                {/* Column Header */}
                <div
                  className="flex items-center justify-between p-3 rounded-lg"
                  style={{ background: "var(--background-secondary)" }}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ background: column.color }}
                    />
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {column.label}
                    </span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: "var(--background)",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    {cards.length}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-3 min-h-[400px]">
                  {cards.length === 0 ? (
                    <div
                      className="p-4 rounded-xl text-center"
                      style={{
                        border: "2px dashed var(--border)",
                        background: "var(--background-secondary)",
                      }}
                    >
                      <p
                        className="text-sm"
                        style={{ color: "var(--foreground-muted)" }}
                      >
                        No work orders
                      </p>
                    </div>
                  ) : (
                    cards.map((card, index) => (
                      <div
                        key={card.id}
                        className="card p-4 cursor-pointer hover:shadow-md transition-all animate-fade-in"
                        style={{ animationDelay: `${index * 0.05}s` }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span
                            className="text-xs font-mono"
                            style={{ color: "var(--foreground-muted)" }}
                          >
                            {card.work_order_number}
                          </span>
                          <PriorityBadge
                            priority={getPriorityFromString(card.priority)}
                          />
                        </div>

                        <h4
                          className="font-medium text-sm mb-2 line-clamp-2"
                          style={{ color: "var(--foreground)" }}
                        >
                          {card.title}
                        </h4>

                        {card.equipment && (
                          <div className="flex items-center gap-1.5 mb-3">
                            <Wrench
                              className="w-3.5 h-3.5"
                              style={{ color: "var(--foreground-muted)" }}
                            />
                            <span
                              className="text-xs"
                              style={{ color: "var(--foreground-muted)" }}
                            >
                              {card.equipment.name}
                            </span>
                          </div>
                        )}

                        <div
                          className="flex items-center justify-between pt-2 border-t"
                          style={{ borderColor: "var(--border)" }}
                        >
                          {card.assigned_user ? (
                            <Avatar
                              name={`${card.assigned_user.first_name} ${card.assigned_user.last_name}`}
                              size="sm"
                            />
                          ) : (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{
                                background: "var(--background-secondary)",
                              }}
                            >
                              <UserIcon
                                className="w-3 h-3"
                                style={{ color: "var(--foreground-muted)" }}
                              />
                            </div>
                          )}
                          {card.due_date && (
                            <div className="flex items-center gap-1">
                              <Clock
                                className="w-3 h-3"
                                style={{ color: "var(--foreground-muted)" }}
                              />
                              <span
                                className="text-xs"
                                style={{ color: "var(--foreground-muted)" }}
                              >
                                {new Date(card.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}
