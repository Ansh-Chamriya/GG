"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  EmptyState,
  SkeletonTable,
  HealthScore,
} from "@/app/components/dashboard/shared";
import {
  equipmentService,
  workorderService,
  scheduleService,
  reportService,
} from "@/app/lib/api/services";
import {
  Equipment,
  WorkOrder,
  MaintenanceSchedule,
} from "@/app/lib/api/config";
import {
  Settings,
  ClipboardList,
  Clock,
  RefreshCw,
  MapPin,
  AlertCircle,
  Search,
  CheckCircle2,
  Wrench,
  Calendar,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

// ============ HOOKS ============
function useViewerData() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [eqResponse, woResponse, schedResponse] = await Promise.all([
        equipmentService.list(),
        workorderService.list(),
        scheduleService.list(),
      ]);

      if (eqResponse.success && eqResponse.data) {
        const items = Array.isArray(eqResponse.data)
          ? eqResponse.data
          : (eqResponse.data as unknown as { items: Equipment[] }).items || [];
        setEquipment(items);
      }

      if (woResponse.success && woResponse.data) {
        const items = Array.isArray(woResponse.data)
          ? woResponse.data
          : (woResponse.data as unknown as { items: WorkOrder[] }).items || [];
        setWorkOrders(items);
      }

      if (schedResponse.success && schedResponse.data) {
        const items = Array.isArray(schedResponse.data)
          ? schedResponse.data
          : [];
        setSchedules(items);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    equipment,
    workOrders,
    schedules,
    isLoading,
    error,
    refetch: fetchData,
  };
}

// ============ COMPONENTS ============
function EquipmentStatusSummary({ equipment }: { equipment: Equipment[] }) {
  const operational = equipment.filter(
    (e) => e.status === "operational"
  ).length;
  const maintenance = equipment.filter(
    (e) => e.status === "maintenance"
  ).length;
  const breakdown = equipment.filter((e) => e.status === "breakdown").length;
  const total = equipment.length || 1;

  const data = [
    {
      label: "Operational",
      count: operational,
      color: "var(--success)",
      percent: Math.round((operational / total) * 100),
    },
    {
      label: "Maintenance",
      count: maintenance,
      color: "var(--warning)",
      percent: Math.round((maintenance / total) * 100),
    },
    {
      label: "Breakdown",
      count: breakdown,
      color: "var(--danger)",
      percent: Math.round((breakdown / total) * 100),
    },
  ];

  return (
    <div className="card p-4">
      <SectionHeader title="Equipment Status Overview" />
      <div className="mt-4 space-y-4">
        {data.map((item, index) => (
          <div
            key={item.label}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: item.color }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.label}
                </span>
              </div>
              <span
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                {item.count} ({item.percent}%)
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--background-tertiary)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${item.percent}%`, background: item.color }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Overall Health */}
      <div
        className="mt-6 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Average Equipment Health
          </span>
          <span
            className="text-lg font-bold"
            style={{ color: "var(--primary)" }}
          >
            {equipment.length > 0
              ? Math.round(
                  equipment.reduce((acc, e) => acc + (e.health_score || 0), 0) /
                    equipment.length
                )
              : 0}
            %
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkOrderSummary({ workOrders }: { workOrders: WorkOrder[] }) {
  const pending = workOrders.filter((wo) => wo.status === "pending").length;
  const inProgress = workOrders.filter(
    (wo) => wo.status === "in_progress"
  ).length;
  const completed = workOrders.filter((wo) => wo.status === "completed").length;
  const total = workOrders.length;

  return (
    <div className="card p-4">
      <SectionHeader title="Work Orders Summary" />
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div
          className="p-4 rounded-xl text-center"
          style={{ background: "var(--primary-100)" }}
        >
          <p className="text-2xl font-bold" style={{ color: "var(--primary)" }}>
            {total}
          </p>
          <p className="text-xs" style={{ color: "var(--primary)" }}>
            Total
          </p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ background: "var(--info-light)" }}
        >
          <p className="text-2xl font-bold" style={{ color: "var(--info)" }}>
            {pending}
          </p>
          <p className="text-xs" style={{ color: "var(--info)" }}>
            Pending
          </p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ background: "var(--warning-light)" }}
        >
          <p className="text-2xl font-bold" style={{ color: "var(--warning)" }}>
            {inProgress}
          </p>
          <p className="text-xs" style={{ color: "var(--warning)" }}>
            In Progress
          </p>
        </div>
        <div
          className="p-4 rounded-xl text-center"
          style={{ background: "var(--success-light)" }}
        >
          <p className="text-2xl font-bold" style={{ color: "var(--success)" }}>
            {completed}
          </p>
          <p className="text-xs" style={{ color: "var(--success)" }}>
            Completed
          </p>
        </div>
      </div>
    </div>
  );
}

function EquipmentTable({
  equipment,
  isLoading,
}: {
  equipment: Equipment[];
  isLoading: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = equipment.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="card overflow-hidden">
        <div className="p-4">
          <SectionHeader title="Equipment List" />
        </div>
        <SkeletonTable rows={5} />
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <SectionHeader title="Equipment List" />
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: "var(--background-secondary)" }}
        >
          <Search
            className="w-4 h-4"
            style={{ color: "var(--foreground-muted)" }}
          />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-sm w-40"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<Settings className="w-8 h-8" />}
            title="No equipment found"
            description={
              searchQuery
                ? "Try adjusting your search"
                : "No equipment available"
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Location</th>
                <th>Status</th>
                <th>Health</th>
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 10).map((eq, index) => (
                <tr
                  key={eq.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--primary-100)" }}
                      >
                        <Settings
                          className="w-5 h-5"
                          style={{ color: "var(--primary)" }}
                        />
                      </div>
                      <div>
                        <span className="font-medium">{eq.name}</span>
                        {eq.code && (
                          <p
                            className="text-xs"
                            style={{ color: "var(--foreground-muted)" }}
                          >
                            {eq.code}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    {eq.location ? (
                      <div className="flex items-center gap-1.5">
                        <MapPin
                          className="w-3.5 h-3.5"
                          style={{ color: "var(--foreground-muted)" }}
                        />
                        <span>{eq.location.name}</span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        eq.status === "operational"
                          ? "badge-success"
                          : eq.status === "maintenance"
                          ? "badge-warning"
                          : eq.status === "breakdown"
                          ? "badge-danger"
                          : "badge-neutral"
                      }`}
                    >
                      {eq.status}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-16 h-2 rounded-full overflow-hidden"
                        style={{ background: "var(--background-tertiary)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${eq.health_score}%`,
                            background:
                              eq.health_score >= 80
                                ? "var(--success)"
                                : eq.health_score >= 50
                                ? "var(--warning)"
                                : "var(--danger)",
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {eq.health_score}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function UpcomingMaintenance({
  schedules,
  isLoading,
}: {
  schedules: MaintenanceSchedule[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Upcoming Maintenance" />
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
        <SectionHeader title="Upcoming Maintenance" />
        <div className="mt-4">
          <EmptyState
            icon={<Calendar className="w-8 h-8" />}
            title="No scheduled maintenance"
            description="Maintenance schedules will appear here"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader title="Upcoming Maintenance" />
      <div className="space-y-3 mt-4">
        {schedules.slice(0, 5).map((schedule, index) => (
          <div
            key={schedule.id}
            className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary-100)" }}
            >
              <Wrench className="w-5 h-5" style={{ color: "var(--primary)" }} />
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-sm block truncate"
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
                  : "TBD"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentWorkOrders({
  workOrders,
  isLoading,
}: {
  workOrders: WorkOrder[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Work Orders" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (workOrders.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Work Orders" />
        <div className="mt-4">
          <EmptyState
            icon={<ClipboardList className="w-8 h-8" />}
            title="No work orders"
            description="Work orders will appear here"
          />
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2
            className="w-4 h-4"
            style={{ color: "var(--success)" }}
          />
        );
      case "in_progress":
        return (
          <Wrench className="w-4 h-4" style={{ color: "var(--warning)" }} />
        );
      default:
        return (
          <Clock className="w-4 h-4" style={{ color: "var(--primary)" }} />
        );
    }
  };

  return (
    <div className="card p-4">
      <SectionHeader title="Recent Work Orders" />
      <div className="space-y-3 mt-4">
        {workOrders.slice(0, 5).map((wo, index) => (
          <div
            key={wo.id}
            className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--background)" }}
            >
              {getStatusIcon(wo.status)}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-sm block truncate"
                style={{ color: "var(--foreground)" }}
              >
                {wo.title}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {wo.work_order_number}
              </span>
            </div>
            <span
              className="px-2 py-1 rounded-full text-xs font-medium capitalize"
              style={{
                background:
                  wo.status === "completed"
                    ? "var(--success-light)"
                    : wo.status === "in_progress"
                    ? "var(--warning-light)"
                    : "var(--primary-100)",
                color:
                  wo.status === "completed"
                    ? "var(--success)"
                    : wo.status === "in_progress"
                    ? "var(--warning)"
                    : "var(--primary)",
              }}
            >
              {wo.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function ViewerDashboard() {
  const { equipment, workOrders, schedules, isLoading, error, refetch } =
    useViewerData();

  if (error) {
    return (
      <DashboardLayout title="Dashboard" notificationCount={0}>
        <div className="card p-8">
          <EmptyState
            icon={
              <AlertCircle
                className="w-8 h-8"
                style={{ color: "var(--danger)" }}
              />
            }
            title="Failed to load data"
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
    <DashboardLayout title="Dashboard" notificationCount={0}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: "var(--primary-100)" }}
          >
            <BarChart3
              className="w-6 h-6"
              style={{ color: "var(--primary)" }}
            />
          </div>
          <div>
            <h2
              className="text-lg font-bold"
              style={{ color: "var(--foreground)" }}
            >
              Overview Dashboard
            </h2>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
              View equipment and maintenance status
            </p>
          </div>
        </div>
        <button
          onClick={refetch}
          className="btn btn-secondary"
          disabled={isLoading}
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--primary-100)" }}
            >
              <Settings
                className="w-5 h-5"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {equipment.length}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Total Equipment
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
                {equipment.filter((e) => e.status === "operational").length}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Operational
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
              <ClipboardList
                className="w-5 h-5"
                style={{ color: "var(--warning)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {
                  workOrders.filter(
                    (wo) =>
                      wo.status !== "completed" && wo.status !== "cancelled"
                  ).length
                }
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Open Work Orders
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
              <Calendar className="w-5 h-5" style={{ color: "var(--info)" }} />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {schedules.length}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Scheduled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EquipmentTable equipment={equipment} isLoading={isLoading} />
        </div>
        <div className="space-y-6">
          <EquipmentStatusSummary equipment={equipment} />
          <WorkOrderSummary workOrders={workOrders} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentWorkOrders workOrders={workOrders} isLoading={isLoading} />
        <UpcomingMaintenance schedules={schedules} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}
