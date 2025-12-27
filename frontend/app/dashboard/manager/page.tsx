"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  StatusBadge,
  PriorityBadge,
  Avatar,
  EmptyState,
  SkeletonTable,
} from "@/app/components/dashboard/shared";
import {
  workorderService,
  teamService,
  scheduleService,
  userService,
} from "@/app/lib/api/services";
import {
  WorkOrder,
  Team,
  MaintenanceSchedule,
  User,
} from "@/app/lib/api/config";
import {
  ClipboardList,
  Users,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Wrench,
  AlertTriangle,
  RefreshCw,
  Plus,
  GripVertical,
  User as UserIcon,
  MapPin,
  AlertCircle,
} from "lucide-react";

// ============ TYPES ============
type KanbanColumn = "new" | "in_progress" | "completed" | "cancelled";

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

// ============ HOOKS ============
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

function useTeams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await teamService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setTeams(items);
      }
    } catch (err) {
      console.error("Failed to fetch teams:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return { teams, isLoading };
}

function useSchedules() {
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSchedules = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await scheduleService.getUpcoming(7);
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setSchedules(items);
      }
    } catch (err) {
      console.error("Failed to fetch schedules:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return { schedules, isLoading };
}

function useTechnicians() {
  const [technicians, setTechnicians] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTechnicians = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await userService.list({ role: "technician" });
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setTechnicians(
          items.filter((u) => u.role === "technician" || u.role === "manager")
        );
      }
    } catch (err) {
      console.error("Failed to fetch technicians:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTechnicians();
  }, [fetchTechnicians]);

  return { technicians, isLoading };
}

// ============ COMPONENTS ============
function KanbanBoard({
  workOrders,
  isLoading,
  error,
  onRefresh,
}: {
  workOrders: WorkOrder[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  const columns: { id: KanbanColumn; label: string; color: string }[] = [
    { id: "new", label: "New", color: "var(--primary)" },
    { id: "in_progress", label: "In Progress", color: "var(--warning)" },
    { id: "completed", label: "Completed", color: "var(--success)" },
    { id: "cancelled", label: "Cancelled", color: "var(--foreground-muted)" },
  ];

  const getWorkOrdersByStatus = (status: KanbanColumn): KanbanCard[] => {
    return workOrders
      .filter((wo) => {
        if (status === "new") return wo.status === "pending";
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
            <button onClick={onRefresh} className="btn btn-primary text-sm">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          }
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <SectionHeader title="Work Orders Kanban" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => (
            <div key={col.id} className="space-y-3">
              <div className="skeleton-card h-10 rounded-lg" />
              <div className="skeleton-card h-32 rounded-xl" />
              <div className="skeleton-card h-32 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <SectionHeader title="Work Orders Kanban" />
        <div className="flex items-center gap-2">
          <button onClick={onRefresh} className="btn btn-secondary text-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" />
            New Work Order
          </button>
        </div>
      </div>

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
              <div className="space-y-3 min-h-[200px]">
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
                      className="p-4 rounded-xl cursor-pointer transition-all hover:shadow-md animate-fade-in"
                      style={{
                        background: "var(--background)",
                        border: "1px solid var(--border)",
                        animationDelay: `${index * 0.05}s`,
                      }}
                    >
                      {/* Card Header */}
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

                      {/* Title */}
                      <h4
                        className="font-medium text-sm mb-2 line-clamp-2"
                        style={{ color: "var(--foreground)" }}
                      >
                        {card.title}
                      </h4>

                      {/* Equipment */}
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

                      {/* Footer */}
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

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

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
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
          </button>
        </div>
      </div>

      {/* Day headers */}
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

      {/* Calendar grid */}
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

function TeamWorkload({
  teams,
  isLoading,
}: {
  teams: Team[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Team Workload" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Team Workload" />
        <div className="mt-4">
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title="No teams"
            description="Create teams to track workload"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader title="Team Workload" />
      <div className="space-y-4 mt-4">
        {teams.slice(0, 4).map((team, index) => (
          <div
            key={team.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "var(--primary-100)" }}
                >
                  <Users
                    className="w-4 h-4"
                    style={{ color: "var(--primary)" }}
                  />
                </div>
                <div>
                  <span
                    className="font-medium text-sm"
                    style={{ color: "var(--foreground)" }}
                  >
                    {team.name}
                  </span>
                  <p
                    className="text-xs"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {team.members_count || 0} members
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UpcomingSchedules({
  schedules,
  isLoading,
}: {
  schedules: MaintenanceSchedule[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Upcoming Preventive Maintenance" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Upcoming Preventive Maintenance" />
        <div className="mt-4">
          <EmptyState
            icon={<Calendar className="w-8 h-8" />}
            title="No upcoming maintenance"
            description="Schedule preventive maintenance tasks"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader title="Upcoming Preventive Maintenance" />
      <div className="space-y-3 mt-4">
        {schedules.slice(0, 5).map((schedule, index) => (
          <div
            key={schedule.id}
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary-100)" }}
            >
              <Wrench className="w-5 h-5" style={{ color: "var(--primary)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-sm block"
                style={{ color: "var(--foreground)" }}
              >
                {schedule.name}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {schedule.equipment?.name || "Unknown equipment"}
              </span>
            </div>
            <div className="text-right">
              <span
                className="text-xs font-medium block"
                style={{ color: "var(--primary)" }}
              >
                {schedule.next_due
                  ? new Date(schedule.next_due).toLocaleDateString()
                  : "Not scheduled"}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {schedule.frequency_type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function ManagerDashboard() {
  const {
    workOrders,
    isLoading: woLoading,
    error: woError,
    refetch: refetchWO,
  } = useWorkOrders();
  const { teams, isLoading: teamsLoading } = useTeams();
  const { schedules, isLoading: schedulesLoading } = useSchedules();

  const stats = {
    total: workOrders.length,
    pending: workOrders.filter((wo) => wo.status === "pending").length,
    inProgress: workOrders.filter((wo) => wo.status === "in_progress").length,
    completed: workOrders.filter((wo) => wo.status === "completed").length,
  };

  return (
    <DashboardLayout
      title="Manager Dashboard"
      notificationCount={stats.pending}
    >
      {/* Stats Row */}
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
                Total Work Orders
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
              <ClipboardList
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

      {/* Kanban Board */}
      <div className="mb-6">
        <KanbanBoard
          workOrders={workOrders}
          isLoading={woLoading}
          error={woError}
          onRefresh={refetchWO}
        />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MiniCalendar />
        <TeamWorkload teams={teams} isLoading={teamsLoading} />
        <UpcomingSchedules schedules={schedules} isLoading={schedulesLoading} />
      </div>
    </DashboardLayout>
  );
}
