"use client";

import React, { useState } from "react";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  StatusBadge,
  PriorityBadge,
  Avatar,
  ProgressBar,
  OverdueIndicator,
} from "@/app/components/dashboard/shared";
import {
  Settings,
  ClipboardList,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  Wrench,
  Calendar,
  Filter,
  Search,
  MapPin,
  Tag,
  ChevronRight,
  Zap,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

// ============ MOCK DATA ============
const kpiData = [
  {
    label: "Total Equipment",
    value: 456,
    icon: <Settings className="w-6 h-6" />,
    trend: { value: 5, isPositive: true },
    color: "var(--primary)",
  },
  {
    label: "Active Requests",
    value: 28,
    icon: <ClipboardList className="w-6 h-6" />,
    trend: { value: 12, isPositive: false },
    color: "var(--warning)",
  },
  {
    label: "Overdue Requests",
    value: 4,
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "var(--danger)",
  },
  {
    label: "Preventive This Week",
    value: 12,
    icon: <Calendar className="w-6 h-6" />,
    trend: { value: 8, isPositive: true },
    color: "var(--success)",
  },
];

const equipmentData = [
  {
    id: 1,
    name: "HVAC Unit #12",
    category: "HVAC",
    department: "Production",
    location: "Building A",
    status: "operational",
    requests: 2,
  },
  {
    id: 2,
    name: "CNC Machine #5",
    category: "Machinery",
    department: "Manufacturing",
    location: "Floor 2",
    status: "maintenance",
    requests: 1,
  },
  {
    id: 3,
    name: "Forklift FL-03",
    category: "Vehicles",
    department: "Warehouse",
    location: "Dock B",
    status: "operational",
    requests: 0,
  },
  {
    id: 4,
    name: "Server Rack A",
    category: "IT",
    department: "IT",
    location: "Server Room",
    status: "operational",
    requests: 3,
  },
  {
    id: 5,
    name: "Generator #1",
    category: "Power",
    department: "Facilities",
    location: "Basement",
    status: "scrap",
    requests: 0,
  },
];

const teamData = [
  {
    id: 1,
    name: "Mechanics Team",
    members: 8,
    activeRequests: 12,
    avgResponse: "2.5h",
    lead: "John Smith",
  },
  {
    id: 2,
    name: "Electricians",
    members: 5,
    activeRequests: 8,
    avgResponse: "1.8h",
    lead: "Mike Johnson",
  },
  {
    id: 3,
    name: "IT Support",
    members: 6,
    activeRequests: 15,
    avgResponse: "1.2h",
    lead: "Sarah Davis",
  },
  {
    id: 4,
    name: "HVAC Specialists",
    members: 4,
    activeRequests: 5,
    avgResponse: "3.1h",
    lead: "Tom Wilson",
  },
];

const recentRequests = [
  {
    id: "REQ-001",
    equipment: "HVAC Unit #12",
    priority: "high" as const,
    status: "in-progress" as const,
    team: "HVAC Specialists",
    created: "2 hours ago",
  },
  {
    id: "REQ-002",
    equipment: "Server Rack A",
    priority: "urgent" as const,
    status: "new" as const,
    team: "IT Support",
    created: "30 mins ago",
  },
  {
    id: "REQ-003",
    equipment: "CNC Machine #5",
    priority: "medium" as const,
    status: "in-progress" as const,
    team: "Mechanics Team",
    created: "5 hours ago",
  },
  {
    id: "REQ-004",
    equipment: "Forklift FL-03",
    priority: "low" as const,
    status: "repaired" as const,
    team: "Mechanics Team",
    created: "1 day ago",
  },
];

const categoryBreakdown = [
  { category: "Machinery", count: 125, percentage: 28 },
  { category: "HVAC", count: 89, percentage: 20 },
  { category: "IT Equipment", count: 112, percentage: 25 },
  { category: "Vehicles", count: 67, percentage: 15 },
  { category: "Power Systems", count: 63, percentage: 14 },
];

// ============ COMPONENTS ============
function EquipmentList() {
  const [filter, setFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <span className="badge badge-success">Operational</span>;
      case "maintenance":
        return <span className="badge badge-warning">In Maintenance</span>;
      case "scrap":
        return <span className="badge badge-neutral">Scrapped</span>;
      default:
        return null;
    }
  };

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
              className="bg-transparent border-none outline-none text-sm w-40"
            />
          </div>
          <button className="btn btn-secondary text-sm">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" />
            Add Equipment
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Category</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
              <th>Requests</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {equipmentData.map((equipment, index) => (
              <tr
                key={equipment.id}
                className={`animate-fade-in ${
                  equipment.status === "scrap" ? "opacity-50" : ""
                }`}
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
                    <span className="font-medium">{equipment.name}</span>
                  </div>
                </td>
                <td>
                  <span className="badge badge-neutral">
                    {equipment.category}
                  </span>
                </td>
                <td>{equipment.department}</td>
                <td>
                  <div
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {equipment.location}
                  </div>
                </td>
                <td>{getStatusBadge(equipment.status)}</td>
                <td>
                  {equipment.requests > 0 ? (
                    <button
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition-all hover:scale-105"
                      style={{
                        background:
                          equipment.requests > 2
                            ? "var(--danger-light)"
                            : "var(--warning-light)",
                        color:
                          equipment.requests > 2
                            ? "var(--danger)"
                            : "var(--warning)",
                      }}
                    >
                      <ClipboardList className="w-3.5 h-3.5" />
                      <span className="font-medium text-sm">
                        {equipment.requests}
                      </span>
                    </button>
                  ) : (
                    <span
                      className="text-sm"
                      style={{ color: "var(--foreground-subtle)" }}
                    >
                      —
                    </span>
                  )}
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
    </div>
  );
}

function TeamCards() {
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
        {teamData.map((team, index) => (
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
                  Lead: {team.lead}
                </p>
              </div>
              <div className="flex -space-x-2">
                {Array.from({ length: Math.min(team.members, 4) }).map(
                  (_, i) => (
                    <Avatar key={i} name={`Member ${i + 1}`} size="sm" />
                  )
                )}
                {team.members > 4 && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border-2"
                    style={{
                      background: "var(--background-secondary)",
                      borderColor: "var(--background)",
                      color: "var(--foreground-muted)",
                    }}
                  >
                    +{team.members - 4}
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div
                className="text-center p-2 rounded-lg"
                style={{ background: "var(--background-secondary)" }}
              >
                <div
                  className="text-lg font-semibold"
                  style={{ color: "var(--foreground)" }}
                >
                  {team.members}
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
                style={{ background: "var(--warning-light)" }}
              >
                <div
                  className="text-lg font-semibold"
                  style={{ color: "var(--warning)" }}
                >
                  {team.activeRequests}
                </div>
                <div className="text-xs" style={{ color: "var(--warning)" }}>
                  Active
                </div>
              </div>
              <div
                className="text-center p-2 rounded-lg"
                style={{ background: "var(--success-light)" }}
              >
                <div
                  className="text-lg font-semibold"
                  style={{ color: "var(--success)" }}
                >
                  {team.avgResponse}
                </div>
                <div className="text-xs" style={{ color: "var(--success)" }}>
                  Avg Time
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecentRequestsList() {
  return (
    <div className="card p-4">
      <SectionHeader
        title="Recent Requests"
        action={
          <button className="btn btn-ghost text-sm">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3 mt-4">
        {recentRequests.map((request, index) => (
          <div
            key={request.id}
            className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 cursor-pointer animate-fade-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className={`w-1 h-12 rounded-full ${
                request.priority === "urgent" ? "animate-pulse-danger" : ""
              }`}
              style={{
                background:
                  request.priority === "urgent"
                    ? "var(--danger)"
                    : request.priority === "high"
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
                  {request.id}
                </span>
                <PriorityBadge priority={request.priority} />
              </div>
              <p
                className="text-sm truncate"
                style={{ color: "var(--foreground-muted)" }}
              >
                {request.equipment}
              </p>
            </div>
            <div className="text-right">
              <StatusBadge status={request.status} />
              <p
                className="text-xs mt-1"
                style={{ color: "var(--foreground-subtle)" }}
              >
                {request.created}
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

function CategoryBreakdown() {
  const colors = [
    "var(--primary)",
    "var(--info)",
    "var(--warning)",
    "var(--success)",
    "var(--danger)",
  ];

  return (
    <div className="card p-4">
      <SectionHeader title="Equipment by Category" />
      <div className="space-y-4 mt-4">
        {categoryBreakdown.map((cat, index) => (
          <div
            key={cat.category}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: colors[index % colors.length] }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  {cat.category}
                </span>
              </div>
              <span
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                {cat.count} units
              </span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "var(--background-tertiary)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${cat.percentage}%`,
                  background: colors[index % colors.length],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaintenanceRatio() {
  const corrective = 65;
  const preventive = 35;

  return (
    <div className="card p-4">
      <SectionHeader title="Maintenance Type Ratio" subtitle="This month" />
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
              stroke="var(--warning)"
              strokeWidth="12"
              strokeDasharray={`${corrective * 2.51} 251`}
              className="transition-all duration-1000"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="var(--success)"
              strokeWidth="12"
              strokeDasharray={`${preventive * 2.51} 251`}
              strokeDashoffset={`-${corrective * 2.51}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {corrective + preventive}
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
      <div className="flex justify-center gap-6">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--warning)" }}
          />
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            Corrective ({corrective}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--success)" }}
          />
          <span className="text-sm" style={{ color: "var(--foreground)" }}>
            Preventive ({preventive}%)
          </span>
        </div>
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function AdminDashboard() {
  return (
    <DashboardLayout title="Organization Dashboard" notificationCount={3}>
      {/* Alert for Overdue */}
      <div className="mb-6">
        <OverdueIndicator count={4} />
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
          <EquipmentList />
        </div>
        <div className="space-y-6">
          <CategoryBreakdown />
          <MaintenanceRatio />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeamCards />
        <RecentRequestsList />
      </div>
    </DashboardLayout>
  );
}
