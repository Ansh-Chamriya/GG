"use client";

import React from "react";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  StatusBadge,
  Avatar,
  ProgressBar,
  EmptyState,
} from "@/app/components/dashboard/shared";
import {
  Building2,
  Settings,
  ClipboardList,
  Activity,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Shield,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  Zap,
  Server,
} from "lucide-react";

// ============ MOCK DATA ============
const kpiData = [
  {
    label: "Total Organizations",
    value: 24,
    icon: <Building2 className="w-6 h-6" />,
    trend: { value: 12, isPositive: true },
    color: "var(--primary)",
  },
  {
    label: "Total Equipment",
    value: "2,847",
    icon: <Settings className="w-6 h-6" />,
    trend: { value: 8, isPositive: true },
    color: "var(--info)",
  },
  {
    label: "Active Requests",
    value: 156,
    icon: <ClipboardList className="w-6 h-6" />,
    trend: { value: 5, isPositive: false },
    color: "var(--warning)",
  },
  {
    label: "System Uptime",
    value: "99.9%",
    icon: <Activity className="w-6 h-6" />,
    color: "var(--success)",
  },
];

const organizationData = [
  {
    id: 1,
    name: "Acme Manufacturing",
    equipment: 450,
    requests: 23,
    teams: 5,
    status: "active",
  },
  {
    id: 2,
    name: "TechCorp Industries",
    equipment: 320,
    requests: 18,
    teams: 4,
    status: "active",
  },
  {
    id: 3,
    name: "BuildRight Construction",
    equipment: 280,
    requests: 31,
    teams: 6,
    status: "active",
  },
  {
    id: 4,
    name: "FastTrack Logistics",
    equipment: 195,
    requests: 12,
    teams: 3,
    status: "active",
  },
  {
    id: 5,
    name: "GreenEnergy Solutions",
    equipment: 167,
    requests: 8,
    teams: 2,
    status: "pending",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "org",
    action: "New organization registered",
    name: "GreenEnergy Solutions",
    time: "2 mins ago",
  },
  {
    id: 2,
    type: "user",
    action: "Admin role assigned",
    name: "Sarah Johnson",
    time: "15 mins ago",
  },
  {
    id: 3,
    type: "request",
    action: "Critical request created",
    name: "HVAC System #45",
    time: "32 mins ago",
  },
  {
    id: 4,
    type: "equipment",
    action: "Equipment marked as scrap",
    name: "Generator Unit #12",
    time: "1 hour ago",
  },
  {
    id: 5,
    type: "system",
    action: "Automation rule triggered",
    name: "Auto-assignment",
    time: "2 hours ago",
  },
];

const teamTypeData = [
  { type: "Mechanics", requests: 45, completion: 92 },
  { type: "Electricians", requests: 38, completion: 88 },
  { type: "IT Support", requests: 52, completion: 95 },
  { type: "HVAC", requests: 21, completion: 85 },
];

// ============ COMPONENTS ============
function OrganizationTable() {
  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          Organizations Overview
        </h3>
        <button className="btn btn-ghost text-sm">
          View All
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Organization</th>
              <th>Equipment</th>
              <th>Active Requests</th>
              <th>Teams</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {organizationData.map((org, index) => (
              <tr
                key={org.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--primary-100)" }}
                    >
                      <Building2
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                    </div>
                    <span className="font-medium">{org.name}</span>
                  </div>
                </td>
                <td>
                  <span className="font-medium">{org.equipment}</span>
                </td>
                <td>
                  <span
                    className="inline-flex items-center gap-1.5 font-medium"
                    style={{
                      color:
                        org.requests > 20
                          ? "var(--warning)"
                          : "var(--foreground)",
                    }}
                  >
                    {org.requests > 20 && <AlertTriangle className="w-4 h-4" />}
                    {org.requests}
                  </span>
                </td>
                <td>{org.teams}</td>
                <td>
                  <span
                    className={`badge ${
                      org.status === "active"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {org.status === "active" ? "Active" : "Pending"}
                  </span>
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

function ActivityFeed() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "org":
        return <Building2 className="w-4 h-4" />;
      case "user":
        return <Users className="w-4 h-4" />;
      case "request":
        return <ClipboardList className="w-4 h-4" />;
      case "equipment":
        return <Settings className="w-4 h-4" />;
      case "system":
        return <Zap className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "org":
        return "var(--primary)";
      case "user":
        return "var(--info)";
      case "request":
        return "var(--warning)";
      case "equipment":
        return "var(--danger)";
      case "system":
        return "var(--success)";
      default:
        return "var(--foreground-muted)";
    }
  };

  return (
    <div className="card p-4">
      <SectionHeader title="Recent Activity" />
      <div className="space-y-4">
        {recentActivity.map((activity, index) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 animate-fade-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${getActivityColor(activity.type)}15` }}
            >
              <span style={{ color: getActivityColor(activity.type) }}>
                {getActivityIcon(activity.type)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                {activity.action}
              </p>
              <p
                className="text-sm font-medium truncate"
                style={{ color: "var(--foreground-muted)" }}
              >
                {activity.name}
              </p>
            </div>
            <span
              className="text-xs whitespace-nowrap"
              style={{ color: "var(--foreground-subtle)" }}
            >
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPerformance() {
  return (
    <div className="card p-4">
      <SectionHeader
        title="Team Performance"
        subtitle="Requests by team type"
      />
      <div className="space-y-4 mt-4">
        {teamTypeData.map((team, index) => (
          <div
            key={team.type}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {team.type}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                {team.requests} requests
              </span>
            </div>
            <ProgressBar value={team.completion} showValue={false} />
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "var(--success)" }}>
                {team.completion}% completion rate
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemHealth() {
  const metrics = [
    { label: "API Response Time", value: "45ms", status: "good" },
    { label: "Database Load", value: "23%", status: "good" },
    { label: "Active Sessions", value: "1,247", status: "good" },
    { label: "Error Rate", value: "0.02%", status: "good" },
  ];

  return (
    <div className="card p-4">
      <SectionHeader
        title="System Health"
        action={
          <span className="badge badge-success">
            <CheckCircle2 className="w-3 h-3" />
            All Systems Operational
          </span>
        }
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="status-dot status-dot-success" />
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {metric.label}
              </span>
            </div>
            <span
              className="text-lg font-semibold"
              style={{ color: "var(--foreground)" }}
            >
              {metric.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RequestsChart() {
  const data = [65, 45, 80, 55, 70, 90, 75, 82, 68, 95, 78, 88];
  const maxValue = Math.max(...data);

  return (
    <div className="card p-4">
      <SectionHeader
        title="Requests Overview"
        subtitle="Last 12 months"
        action={
          <select
            className="text-sm px-3 py-1.5 rounded-lg border outline-none"
            style={{
              borderColor: "var(--border)",
              background: "var(--background)",
            }}
          >
            <option>All Organizations</option>
            <option>Acme Manufacturing</option>
            <option>TechCorp Industries</option>
          </select>
        }
      />
      <div className="flex items-end justify-between h-48 gap-2 mt-6 px-2">
        {data.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-lg transition-all hover:opacity-80 animate-fade-in-up cursor-pointer"
            style={{
              height: `${(value / maxValue) * 100}%`,
              background:
                index === data.length - 1
                  ? "var(--primary)"
                  : "var(--primary-100)",
              animationDelay: `${index * 0.05}s`,
            }}
            title={`${value} requests`}
          />
        ))}
      </div>
      <div
        className="flex justify-between text-xs mt-3 px-2"
        style={{ color: "var(--foreground-muted)" }}
      >
        <span>Jan</span>
        <span>Feb</span>
        <span>Mar</span>
        <span>Apr</span>
        <span>May</span>
        <span>Jun</span>
        <span>Jul</span>
        <span>Aug</span>
        <span>Sep</span>
        <span>Oct</span>
        <span>Nov</span>
        <span>Dec</span>
      </div>
      <div
        className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--primary)" }}
          >
            891
          </div>
          <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            Total This Year
          </div>
        </div>
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--success)" }}
          >
            847
          </div>
          <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            Completed
          </div>
        </div>
        <div className="text-center">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--warning)" }}
          >
            44
          </div>
          <div className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            In Progress
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickActions() {
  const actions = [
    {
      icon: <Building2 className="w-5 h-5" />,
      label: "Add Organization",
      color: "var(--primary)",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Manage Users",
      color: "var(--info)",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Role Matrix",
      color: "var(--warning)",
    },
    {
      icon: <Server className="w-5 h-5" />,
      label: "System Logs",
      color: "var(--success)",
    },
  ];

  return (
    <div className="card p-4">
      <SectionHeader title="Quick Actions" />
      <div className="grid grid-cols-2 gap-3 mt-2">
        {actions.map((action, index) => (
          <button
            key={action.label}
            className="flex items-center gap-3 p-3 rounded-xl text-left transition-all hover:scale-[1.02] animate-fade-in"
            style={{
              background: `${action.color}10`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <span style={{ color: action.color }}>{action.icon}</span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function SuperAdminDashboard() {
  return (
    <DashboardLayout title="Platform Overview" notificationCount={5}>
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Wide */}
        <div className="lg:col-span-2 space-y-6">
          <RequestsChart />
          <OrganizationTable />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <SystemHealth />
          <TeamPerformance />
          <QuickActions />
          <ActivityFeed />
        </div>
      </div>
    </DashboardLayout>
  );
}
