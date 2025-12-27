"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  PriorityBadge,
  Avatar,
  EmptyState,
} from "@/app/components/dashboard/shared";
import { workorderService, authService } from "@/app/lib/api/services";
import { WorkOrder, User } from "@/app/lib/api/config";
import {
  ClipboardList,
  Clock,
  ChevronLeft,
  ChevronRight,
  Wrench,
  Play,
  CheckCircle2,
  XCircle,
  Camera,
  MessageSquare,
  Phone,
  RefreshCw,
  MapPin,
  AlertCircle,
  Calendar,
} from "lucide-react";

// ============ TYPES ============
type TaskStatus = "pending" | "in_progress" | "completed";

// ============ HOOKS ============
function useMyWorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user
      const userResponse = await authService.getMe();
      if (userResponse.success && userResponse.data) {
        setCurrentUser(userResponse.data);
      }

      // Get work orders
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
    fetchData();
  }, [fetchData]);

  // Filter to show only assigned work orders (or all if no user filter available)
  const myWorkOrders = workOrders;

  return {
    workOrders: myWorkOrders,
    currentUser,
    isLoading,
    error,
    refetch: fetchData,
  };
}

// ============ COMPONENTS ============
function TaskCard({
  task,
  isActive,
  onSelect,
}: {
  task: WorkOrder;
  isActive: boolean;
  onSelect: () => void;
}) {
  const getPriorityFromString = (
    priority: string
  ): "low" | "medium" | "high" | "critical" => {
    if (priority === "critical") return "critical";
    if (priority === "high") return "high";
    if (priority === "medium") return "medium";
    return "low";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in_progress":
        return "var(--warning)";
      case "completed":
        return "var(--success)";
      default:
        return "var(--primary)";
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl cursor-pointer transition-all ${
        isActive ? "ring-2" : "hover:shadow-md"
      }`}
      style={{
        background: "var(--background)",
        border: "1px solid var(--border)",
        boxShadow: isActive ? `0 0 0 2px var(--primary)` : undefined,
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: getStatusColor(task.status) }}
          />
          <span
            className="text-xs font-mono"
            style={{ color: "var(--foreground-muted)" }}
          >
            {task.work_order_number}
          </span>
        </div>
        <PriorityBadge priority={getPriorityFromString(task.priority)} />
      </div>

      <h4
        className="font-medium text-sm mb-2 line-clamp-2"
        style={{ color: "var(--foreground)" }}
      >
        {task.title}
      </h4>

      {task.equipment && (
        <div className="flex items-center gap-1.5 mb-2">
          <Wrench
            className="w-3.5 h-3.5"
            style={{ color: "var(--foreground-muted)" }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            {task.equipment.name}
          </span>
        </div>
      )}

      {task.due_date && (
        <div className="flex items-center gap-1.5">
          <Clock
            className="w-3.5 h-3.5"
            style={{ color: "var(--foreground-muted)" }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--foreground-muted)" }}
          >
            Due: {new Date(task.due_date).toLocaleDateString()}
          </span>
        </div>
      )}
    </div>
  );
}

function TaskDetail({
  task,
  onStart,
  onComplete,
  onCancel,
}: {
  task: WorkOrder | null;
  onStart: (id: string) => void;
  onComplete: (id: string) => void;
  onCancel: (id: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  if (!task) {
    return (
      <div className="card p-8">
        <EmptyState
          icon={<ClipboardList className="w-8 h-8" />}
          title="Select a task"
          description="Click on a task from the list to view details"
        />
      </div>
    );
  }

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await workorderService.start(task.id);
      onStart(task.id);
    } catch (err) {
      console.error("Failed to start work order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await workorderService.complete(task.id);
      onComplete(task.id);
    } catch (err) {
      console.error("Failed to complete work order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async () => {
    setIsLoading(true);
    try {
      await workorderService.cancel(task.id);
      onCancel(task.id);
    } catch (err) {
      console.error("Failed to cancel work order:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Header */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-start justify-between">
          <div>
            <span
              className="text-xs font-mono"
              style={{ color: "var(--foreground-muted)" }}
            >
              {task.work_order_number}
            </span>
            <h3
              className="font-semibold text-lg"
              style={{ color: "var(--foreground)" }}
            >
              {task.title}
            </h3>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium capitalize`}
            style={{
              background:
                task.status === "in_progress"
                  ? "var(--warning-light)"
                  : task.status === "completed"
                  ? "var(--success-light)"
                  : "var(--primary-100)",
              color:
                task.status === "in_progress"
                  ? "var(--warning)"
                  : task.status === "completed"
                  ? "var(--success)"
                  : "var(--primary)",
            }}
          >
            {task.status.replace("_", " ")}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Equipment Info */}
        {task.equipment && (
          <div
            className="p-4 rounded-xl"
            style={{ background: "var(--background-secondary)" }}
          >
            <h4
              className="text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Equipment
            </h4>
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: "var(--primary-100)" }}
              >
                <Wrench
                  className="w-6 h-6"
                  style={{ color: "var(--primary)" }}
                />
              </div>
              <div>
                <span
                  className="font-medium block"
                  style={{ color: "var(--foreground)" }}
                >
                  {task.equipment.name}
                </span>
                {task.equipment.location && (
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin
                      className="w-3 h-3"
                      style={{ color: "var(--foreground-muted)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {task.equipment.location.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        {task.description && (
          <div>
            <h4
              className="text-sm font-medium mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Description
            </h4>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              {task.description}
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div
          className="grid grid-cols-3 gap-2 p-3 rounded-xl"
          style={{ background: "var(--background-secondary)" }}
        >
          <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Camera
              className="w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Photo
            </span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <MessageSquare
              className="w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Notes
            </span>
          </button>
          <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-100 transition-colors">
            <Phone
              className="w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Contact
            </span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        {task.status === "pending" ? (
          <button
            onClick={handleStart}
            disabled={isLoading}
            className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2"
            style={{ background: "var(--primary)" }}
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Start Work
          </button>
        ) : task.status === "in_progress" ? (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2"
              style={{ background: "var(--success)" }}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle2 className="w-4 h-4" />
              )}
              Complete
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2"
              style={{ background: "var(--danger)" }}
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              Cancel
            </button>
          </div>
        ) : (
          <div
            className="py-3 rounded-xl text-center font-medium"
            style={{
              background: "var(--background-secondary)",
              color: "var(--foreground-muted)",
            }}
          >
            Task {task.status}
          </div>
        )}
      </div>
    </div>
  );
}

function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium py-1"
            style={{ color: "var(--foreground-muted)" }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          return (
            <button
              key={day}
              className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                isToday(day) ? "font-bold" : ""
              }`}
              style={{
                background: isToday(day) ? "var(--primary)" : "transparent",
                color: isToday(day) ? "white" : "var(--foreground)",
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CompletedTasks({ workOrders }: { workOrders: WorkOrder[] }) {
  const completed = workOrders
    .filter((wo) => wo.status === "completed")
    .slice(0, 5);

  if (completed.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Completed Tasks" />
        <div className="mt-4">
          <EmptyState
            icon={<CheckCircle2 className="w-8 h-8" />}
            title="No completed tasks"
            description="Complete tasks to see them here"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader title="Recently Completed" />
      <div className="space-y-3 mt-4">
        {completed.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--success-light)" }}
            >
              <CheckCircle2
                className="w-4 h-4"
                style={{ color: "var(--success)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-sm block truncate"
                style={{ color: "var(--foreground)" }}
              >
                {task.title}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {task.work_order_number}
              </span>
            </div>
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              {task.completed_at
                ? new Date(task.completed_at).toLocaleDateString()
                : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function TechnicianDashboard() {
  const { workOrders, isLoading, error, refetch } = useMyWorkOrders();
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const pendingTasks = workOrders.filter(
    (wo) => wo.status === "pending" || wo.status === "in_progress"
  );
  const selectedTask =
    workOrders.find((wo) => wo.id === selectedTaskId) || null;

  const handleTaskUpdate = () => {
    refetch();
    setSelectedTaskId(null);
  };

  const stats = {
    total: workOrders.length,
    pending: workOrders.filter((wo) => wo.status === "pending").length,
    inProgress: workOrders.filter((wo) => wo.status === "in_progress").length,
    completed: workOrders.filter((wo) => wo.status === "completed").length,
  };

  if (error) {
    return (
      <DashboardLayout title="My Tasks" notificationCount={0}>
        <div className="card p-8">
          <EmptyState
            icon={
              <AlertCircle
                className="w-8 h-8"
                style={{ color: "var(--danger)" }}
              />
            }
            title="Failed to load tasks"
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
    <DashboardLayout
      title="My Tasks"
      notificationCount={stats.pending + stats.inProgress}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary-100)" }}
            >
              <ClipboardList
                className="w-5 h-5"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.total}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Total Tasks
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--info-light)" }}
            >
              <Clock className="w-5 h-5" style={{ color: "var(--info)" }} />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.pending}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Pending
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--warning-light)" }}
            >
              <Wrench className="w-5 h-5" style={{ color: "var(--warning)" }} />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.inProgress}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                In Progress
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--success-light)" }}
            >
              <CheckCircle2
                className="w-5 h-5"
                style={{ color: "var(--success)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.completed}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Task List */}
        <div className="lg:col-span-1">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-4">
              <SectionHeader title="My Tasks" />
              <button
                onClick={refetch}
                className="btn btn-secondary text-sm"
                disabled={isLoading}
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
              </button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="skeleton-card h-24 rounded-xl" />
                ))}
              </div>
            ) : pendingTasks.length === 0 ? (
              <EmptyState
                icon={<ClipboardList className="w-8 h-8" />}
                title="No pending tasks"
                description="All caught up!"
              />
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {pendingTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <TaskCard
                      task={task}
                      isActive={selectedTaskId === task.id}
                      onSelect={() => setSelectedTaskId(task.id)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Task Detail */}
        <div className="lg:col-span-2">
          <TaskDetail
            task={selectedTask}
            onStart={handleTaskUpdate}
            onComplete={handleTaskUpdate}
            onCancel={handleTaskUpdate}
          />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MiniCalendar />
        <CompletedTasks workOrders={workOrders} />
      </div>
    </DashboardLayout>
  );
}
