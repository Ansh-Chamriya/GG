"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  StatusBadge,
  PriorityBadge,
  Avatar,
  EmptyState,
  SkeletonTable,
  OverdueIndicator,
} from "@/app/components/dashboard/shared";
import {
  reportService,
  equipmentService,
  teamService,
  workorderService,
} from "@/app/lib/api/services";
import {
  Equipment,
  Team,
  WorkOrder,
  EquipmentStatus,
} from "@/app/lib/api/config";
import {
  Settings,
  ClipboardList,
  AlertTriangle,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  Calendar,
  Filter,
  Search,
  MapPin,
  ChevronRight,
  RefreshCw,
  Loader2,
  Wrench,
  AlertCircle,
  Users,
} from "lucide-react";

// ============ TYPES ============
interface DashboardStats {
  total_equipment: number;
  operational_equipment: number;
  equipment_in_maintenance: number;
  equipment_breakdown: number;
  total_work_orders: number;
  pending_work_orders: number;
  in_progress_work_orders: number;
  completed_work_orders: number;
  overdue_work_orders: number;
  upcoming_maintenance: number;
  low_stock_parts: number;
  avg_equipment_health: number;
}

// ============ HOOKS ============
function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await reportService.getDashboard();
      if (response.success && response.data) {
        setStats(response.data as unknown as DashboardStats);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboard stats"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

function useEquipmentList() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await equipmentService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : (response.data as unknown as { items: Equipment[] }).items || [];
        setEquipment(items);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch equipment"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return { equipment, isLoading, error, refetch: fetchEquipment };
}

function useTeamList() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeams = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await teamService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setTeams(items);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch teams");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return { teams, isLoading, error, refetch: fetchTeams };
}

function useWorkOrderList() {
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

// ============ COMPONENTS ============
function EquipmentList({
  equipment,
  isLoading,
  error,
  onRefresh,
}: {
  equipment: Equipment[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEquipment = equipment.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: EquipmentStatus) => {
    switch (status) {
      case "operational":
        return <span className="badge badge-success">Operational</span>;
      case "maintenance":
        return <span className="badge badge-warning">In Maintenance</span>;
      case "breakdown":
        return <span className="badge badge-danger">Breakdown</span>;
      case "retired":
        return <span className="badge badge-neutral">Retired</span>;
      default:
        return null;
    }
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
          title="Failed to load equipment"
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

  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          Equipment Overview
        </h3>
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ background: "var(--background-secondary)" }}
          >
            <Search
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-40"
            />
          </div>
          <button
            onClick={onRefresh}
            className="btn btn-secondary text-sm"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable rows={5} />
      ) : filteredEquipment.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<Settings className="w-8 h-8" />}
            title="No equipment found"
            description={
              searchQuery
                ? "Try adjusting your search"
                : "Add your first equipment to get started"
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th>Health</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.slice(0, 10).map((eq, index) => (
                <tr
                  key={eq.id}
                  className="animate-fade-in hover:bg-gray-50 transition-colors"
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
                    <span className="badge badge-neutral">
                      {eq.category?.name || "Uncategorized"}
                    </span>
                  </td>
                  <td>
                    <div
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      {eq.location?.name || "—"}
                    </div>
                  </td>
                  <td>{getStatusBadge(eq.status)}</td>
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
                  <td>
                    <button className="btn btn-ghost p-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
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

function TeamCards({
  teams,
  isLoading,
  error,
}: {
  teams: Team[];
  isLoading: boolean;
  error: string | null;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Maintenance Teams" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card p-4 rounded-xl h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error || teams.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Maintenance Teams" />
        <div className="mt-4">
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title={error ? "Failed to load teams" : "No teams yet"}
            description={error || "Create teams to organize your workforce"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader
        title="Maintenance Teams"
        action={
          <button className="btn btn-secondary text-sm">
            <Plus className="w-4 h-4" />
            Add Team
          </button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {teams.slice(0, 4).map((team, index) => (
          <div
            key={team.id}
            className="card-interactive p-4 rounded-xl animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4
                  className="font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {team.name}
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {team.leader
                    ? `Lead: ${team.leader.first_name} ${team.leader.last_name}`
                    : "No leader assigned"}
                </p>
              </div>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: "var(--primary-100)" }}
              >
                <Users
                  className="w-5 h-5"
                  style={{ color: "var(--primary)" }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div
                className="text-center p-2 rounded-lg"
                style={{ background: "var(--background-secondary)" }}
              >
                <div
                  className="text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {team.members_count || 0}
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  Members
                </div>
              </div>
              <div
                className="text-center p-2 rounded-lg"
                style={{ background: "var(--primary-100)" }}
              >
                <div
                  className="text-lg font-semibold"
                  style={{ color: "var(--primary)" }}
                >
                  {team.location?.name || "—"}
                </div>
                <div className="text-xs" style={{ color: "var(--primary)" }}>
                  Location
                </div>
              </div>
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
  error,
}: {
  workOrders: WorkOrder[];
  isLoading: boolean;
  error: string | null;
}) {
  const getPriorityFromString = (
    priority: string
  ): "low" | "medium" | "high" | "critical" => {
    if (priority === "critical") return "critical";
    if (priority === "high") return "high";
    if (priority === "medium") return "medium";
    return "low";
  };

  const getStatusFromString = (
    status: string
  ): "pending" | "in_progress" | "completed" | "cancelled" => {
    if (status === "in_progress") return "in_progress";
    if (status === "completed") return "completed";
    if (status === "cancelled") return "cancelled";
    return "pending";
  };

  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Work Orders" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="skeleton-card h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || workOrders.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Work Orders" />
        <div className="mt-4">
          <EmptyState
            icon={<ClipboardList className="w-8 h-8" />}
            title={error ? "Failed to load work orders" : "No work orders"}
            description={
              error || "Create work orders to track maintenance tasks"
            }
          />
        </div>
      </div>
    );
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="card p-4">
      <SectionHeader
        title="Recent Work Orders"
        action={
          <button className="btn btn-ghost text-sm">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3 mt-4">
        {workOrders.slice(0, 5).map((wo, index) => (
          <div
            key={wo.id}
            className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 cursor-pointer animate-fade-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`w-1 h-12 rounded-full ${
                wo.priority === "critical" ? "animate-pulse-danger" : ""
              }`}
              style={{
                background:
                  wo.priority === "critical"
                    ? "var(--danger)"
                    : wo.priority === "high"
                    ? "var(--warning)"
                    : "var(--primary)",
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className="font-medium text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {wo.work_order_number}
                </span>
                <PriorityBadge priority={getPriorityFromString(wo.priority)} />
              </div>
              <p
                className="text-sm truncate"
                style={{ color: "var(--foreground-muted)" }}
              >
                {wo.title}
              </p>
            </div>
            <div className="text-right">
              <StatusBadge status={getStatusFromString(wo.status)} />
              <p
                className="text-xs mt-1"
                style={{ color: "var(--foreground-subtle)" }}
              >
                {formatTime(wo.created_at)}
              </p>
            </div>
            <ChevronRight
              className="w-4 h-4"
              style={{ color: "var(--foreground-subtle)" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsBreakdown({ stats }: { stats: DashboardStats | null }) {
  if (!stats) return null;

  const equipmentByStatus = [
    {
      label: "Operational",
      count: stats.operational_equipment,
      color: "var(--success)",
    },
    {
      label: "In Maintenance",
      count: stats.equipment_in_maintenance,
      color: "var(--warning)",
    },
    {
      label: "Breakdown",
      count: stats.equipment_breakdown,
      color: "var(--danger)",
    },
  ];

  const total = stats.total_equipment || 1;

  return (
    <div className="card p-4">
      <SectionHeader title="Equipment Status" />
      <div className="space-y-4 mt-4">
        {equipmentByStatus.map((item, index) => (
          <div
            key={item.label}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-1.5">
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
                {item.count} units
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--background-tertiary)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(item.count / total) * 100}%`,
                  background: item.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkOrderRatio({ stats }: { stats: DashboardStats | null }) {
  if (!stats) return null;

  const totalWO = stats.total_work_orders || 1;
  const completed = Math.round((stats.completed_work_orders / totalWO) * 100);
  const inProgress = Math.round(
    (stats.in_progress_work_orders / totalWO) * 100
  );
  const pending = Math.round((stats.pending_work_orders / totalWO) * 100);

  return (
    <div className="card p-4">
      <SectionHeader title="Work Order Status" subtitle="Current overview" />
      <div className="flex items-center justify-center my-6">
        <div className="relative w-36 h-36">
          <svg
            className="w-full h-full transform -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--background-tertiary)"
              strokeWidth="12"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--success)"
              strokeWidth="12"
              strokeDasharray={`${completed * 2.51} 251`}
              className="transition-all duration-1000"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--warning)"
              strokeWidth="12"
              strokeDasharray={`${inProgress * 2.51} 251`}
              strokeDashoffset={`-${completed * 2.51}`}
              className="transition-all duration-1000"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="12"
              strokeDasharray={`${pending * 2.51} 251`}
              strokeDashoffset={`-${(completed + inProgress) * 2.51}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {stats.total_work_orders}
            </span>
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Total
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--success)" }}
          />
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            Completed ({stats.completed_work_orders})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--warning)" }}
          />
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            In Progress ({stats.in_progress_work_orders})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--primary)" }}
          />
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            Pending ({stats.pending_work_orders})
          </span>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function AdminDashboard() {
  const {
    stats,
    isLoading: statsLoading,
    error: statsError,
    refetch: refetchStats,
  } = useDashboardStats();
  const {
    equipment,
    isLoading: equipmentLoading,
    error: equipmentError,
    refetch: refetchEquipment,
  } = useEquipmentList();
  const { teams, isLoading: teamsLoading, error: teamsError } = useTeamList();
  const {
    workOrders,
    isLoading: workOrdersLoading,
    error: workOrdersError,
  } = useWorkOrderList();

  const kpiData = [
    {
      label: "Total Equipment",
      value: stats?.total_equipment || 0,
      icon: <Settings className="w-6 h-6" />,
      color: "var(--primary)",
    },
    {
      label: "Active Work Orders",
      value:
        (stats?.pending_work_orders || 0) +
        (stats?.in_progress_work_orders || 0),
      icon: <ClipboardList className="w-6 h-6" />,
      color: "var(--warning)",
    },
    {
      label: "Overdue",
      value: stats?.overdue_work_orders || 0,
      icon: <AlertTriangle className="w-6 h-6" />,
      color: "var(--danger)",
    },
    {
      label: "Upcoming Maintenance",
      value: stats?.upcoming_maintenance || 0,
      icon: <Calendar className="w-6 h-6" />,
      color: "var(--success)",
    },
  ];

  const refreshAll = () => {
    refetchStats();
    refetchEquipment();
  };

  return (
    <DashboardLayout
      title="Organization Dashboard"
      notificationCount={stats?.overdue_work_orders || 0}
    >
      {/* Alert for Overdue */}
      {(stats?.overdue_work_orders || 0) > 0 && (
        <div className="mb-6">
          <OverdueIndicator count={stats?.overdue_work_orders || 0} />
        </div>
      )}

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={refreshAll}
          disabled={statsLoading || equipmentLoading}
          className="btn btn-secondary text-sm"
        >
          <RefreshCw
            className={`w-4 h-4 ${
              statsLoading || equipmentLoading ? "animate-spin" : ""
            }`}
          />
          Refresh
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <div
            key={kpi.label}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <EquipmentList
            equipment={equipment}
            isLoading={equipmentLoading}
            error={equipmentError}
            onRefresh={refetchEquipment}
          />
        </div>
        <div className="space-y-6">
          <StatsBreakdown stats={stats} />
          <WorkOrderRatio stats={stats} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamCards teams={teams} isLoading={teamsLoading} error={teamsError} />
        <RecentWorkOrders
          workOrders={workOrders}
          isLoading={workOrdersLoading}
          error={workOrdersError}
        />
      </div>
    </DashboardLayout>
  );
}
