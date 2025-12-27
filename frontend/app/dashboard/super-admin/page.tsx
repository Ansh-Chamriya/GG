"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  Avatar,
  EmptyState,
  SkeletonTable,
} from "@/app/components/dashboard/shared";
import {
  organizationService,
  userService,
  auditService,
  reportService,
} from "@/app/lib/api/services";
import { Organization, User, AuditLog } from "@/app/lib/api/config";
import {
  Building2,
  Settings,
  ClipboardList,
  Activity,
  Users,
  AlertTriangle,
  CheckCircle2,
  Plus,
  MoreHorizontal,
  ArrowUpRight,
  Server,
  RefreshCw,
  AlertCircle,
  Shield,
  Search,
} from "lucide-react";

// ============ HOOKS ============
function useOrganizationList() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await organizationService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setOrganizations(items);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch organizations"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  return { organizations, isLoading, error, refetch: fetchOrganizations };
}

function useUserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await userService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setUsers(items);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, error, refetch: fetchUsers };
}

function useAuditLog() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLogs = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await auditService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data) ? response.data : [];
        setLogs(items);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch audit logs"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  return { logs, isLoading, error, refetch: fetchLogs };
}

// ============ COMPONENTS ============
function OrganizationsTable({
  organizations,
  isLoading,
  error,
  onRefresh,
}: {
  organizations: Organization[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrgs = organizations.filter((org) =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          title="Failed to load organizations"
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
          Organizations
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
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-32"
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
          <Link href="/dashboard/organizations/new" className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" />
            Add Org
          </Link>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable rows={5} />
      ) : filteredOrgs.length === 0 ? (
        <div className="p-8">
          <EmptyState
            icon={<Building2 className="w-8 h-8" />}
            title="No organizations found"
            description={
              searchQuery
                ? "Try adjusting your search"
                : "Create your first organization"
            }
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Organization</th>
                <th>Subscription</th>
                <th>Status</th>
                <th>Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredOrgs.map((org, index) => (
                <tr
                  key={org.id}
                  className="animate-fade-in hover:bg-gray-50 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "var(--primary-100)" }}
                      >
                        {org.logo_url ? (
                          <img
                            src={org.logo_url}
                            alt={org.name}
                            className="w-8 h-8 rounded"
                          />
                        ) : (
                          <Building2
                            className="w-5 h-5"
                            style={{ color: "var(--primary)" }}
                          />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">{org.name}</span>
                        <p
                          className="text-xs"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {org.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        background:
                          org.subscription_tier === "enterprise"
                            ? "var(--primary-100)"
                            : org.subscription_tier === "pro"
                              ? "var(--info-light)"
                              : "var(--background-secondary)",
                        color:
                          org.subscription_tier === "enterprise"
                            ? "var(--primary)"
                            : org.subscription_tier === "pro"
                              ? "var(--info)"
                              : "var(--foreground-muted)",
                      }}
                    >
                      {org.subscription_tier || "Free"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${org.is_active ? "badge-success" : "badge-neutral"
                        }`}
                    >
                      {org.is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {new Date(org.created_at).toLocaleDateString()}
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

function UsersList({
  users,
  isLoading,
  error,
}: {
  users: User[];
  isLoading: boolean;
  error: string | null;
}) {
  const getRoleBadge = (role: string) => {
    const colors: Record<string, { bg: string; text: string }> = {
      super_admin: { bg: "var(--danger-light)", text: "var(--danger)" },
      admin: { bg: "var(--primary-100)", text: "var(--primary)" },
      manager: { bg: "var(--info-light)", text: "var(--info)" },
      technician: { bg: "var(--success-light)", text: "var(--success)" },
      operator: { bg: "var(--warning-light)", text: "var(--warning)" },
      viewer: {
        bg: "var(--background-secondary)",
        text: "var(--foreground-muted)",
      },
    };
    const style = colors[role] || colors.viewer;
    return (
      <span
        className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
        style={{ background: style.bg, color: style.text }}
      >
        {role.replace("_", " ")}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Users" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-card h-12 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || users.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Recent Users" />
        <div className="mt-4">
          <EmptyState
            icon={<Users className="w-8 h-8" />}
            title={error ? "Failed to load users" : "No users found"}
            description={error || "Users will appear here"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader
        title="Recent Users"
        action={
          <button className="btn btn-ghost text-sm">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3 mt-4">
        {users.slice(0, 6).map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <Avatar name={`${user.first_name} ${user.last_name}`} size="md" />
            <div className="flex-1 min-w-0">
              <span
                className="font-medium block"
                style={{ color: "var(--foreground)" }}
              >
                {user.first_name} {user.last_name}
              </span>
              <span
                className="text-sm truncate block"
                style={{ color: "var(--foreground-muted)" }}
              >
                {user.email}
              </span>
            </div>
            {getRoleBadge(user.role)}
          </div>
        ))}
      </div>
    </div>
  );
}

function AuditLogList({
  logs,
  isLoading,
  error,
}: {
  logs: AuditLog[];
  isLoading: boolean;
  error: string | null;
}) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return "Just now";
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return <Plus className="w-4 h-4" style={{ color: "var(--success)" }} />;
      case "update":
        return (
          <Settings className="w-4 h-4" style={{ color: "var(--info)" }} />
        );
      case "delete":
        return (
          <AlertTriangle
            className="w-4 h-4"
            style={{ color: "var(--danger)" }}
          />
        );
      default:
        return (
          <Activity
            className="w-4 h-4"
            style={{ color: "var(--foreground-muted)" }}
          />
        );
    }
  };

  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="Activity Feed" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-card h-12 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error || logs.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="Activity Feed" />
        <div className="mt-4">
          <EmptyState
            icon={<Activity className="w-8 h-8" />}
            title={error ? "Failed to load activity" : "No activity yet"}
            description={error || "Recent activity will appear here"}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="card p-4">
      <SectionHeader
        title="Activity Feed"
        action={
          <button className="btn btn-ghost text-sm">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3 mt-4 max-h-96 overflow-y-auto">
        {logs.slice(0, 10).map((log, index) => (
          <div
            key={log.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "var(--background-secondary)" }}
            >
              {getActionIcon(log.action)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm" style={{ color: "var(--foreground)" }}>
                <span className="font-medium capitalize">{log.action}</span>{" "}
                <span style={{ color: "var(--foreground-muted)" }}>
                  {log.resource_type}
                </span>
              </p>
              {log.resource_id && (
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  ID: {log.resource_id}
                </p>
              )}
            </div>
            <span
              className="text-xs shrink-0"
              style={{ color: "var(--foreground-subtle)" }}
            >
              {formatTime(log.created_at)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemHealth() {
  const [health, setHealth] = useState({
    database: "ok",
    status: "healthy",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("http://localhost:8000/health");
        const data = await response.json();
        setHealth(data);
      } catch {
        setHealth({ database: "error", status: "unhealthy" });
      } finally {
        setIsLoading(false);
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      name: "API Server",
      status: health.status === "healthy" ? "operational" : "degraded",
    },
    {
      name: "Database",
      status: health.database === "ok" ? "operational" : "error",
    },
    { name: "Authentication", status: "operational" },
    { name: "File Storage", status: "operational" },
  ];

  return (
    <div className="card p-4">
      <SectionHeader
        title="System Health"
        subtitle={
          isLoading
            ? "Checking..."
            : health.status === "healthy"
              ? "All systems operational"
              : "Issues detected"
        }
      />
      <div className="space-y-3 mt-4">
        {services.map((service, index) => (
          <div
            key={service.name}
            className="flex items-center justify-between p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <Server
                className="w-4 h-4"
                style={{ color: "var(--foreground-muted)" }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {service.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${service.status === "operational"
                    ? "bg-green-500"
                    : service.status === "degraded"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
              />
              <span
                className="text-xs capitalize"
                style={{
                  color:
                    service.status === "operational"
                      ? "var(--success)"
                      : service.status === "degraded"
                        ? "var(--warning)"
                        : "var(--danger)",
                }}
              >
                {service.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function SuperAdminDashboard() {
  const {
    organizations,
    isLoading: orgsLoading,
    error: orgsError,
    refetch: refetchOrgs,
  } = useOrganizationList();
  const { users, isLoading: usersLoading, error: usersError } = useUserList();
  const { logs, isLoading: logsLoading, error: logsError } = useAuditLog();

  const kpiData = [
    {
      label: "Total Organizations",
      value: organizations.length,
      icon: <Building2 className="w-6 h-6" />,
      color: "var(--primary)",
    },
    {
      label: "Total Users",
      value: users.length,
      icon: <Users className="w-6 h-6" />,
      color: "var(--info)",
    },
    {
      label: "Active Orgs",
      value: organizations.filter((o) => o.is_active).length,
      icon: <CheckCircle2 className="w-6 h-6" />,
      color: "var(--success)",
    },
    {
      label: "System Status",
      value: "Healthy",
      icon: <Activity className="w-6 h-6" />,
      color: "var(--success)",
    },
  ];

  return (
    <DashboardLayout title="Super Admin Dashboard" notificationCount={0}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <Shield className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Platform Overview
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Manage all organizations and system settings
          </p>
        </div>
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <OrganizationsTable
            organizations={organizations}
            isLoading={orgsLoading}
            error={orgsError}
            onRefresh={refetchOrgs}
          />
        </div>
        <div className="space-y-6">
          <SystemHealth />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersList users={users} isLoading={usersLoading} error={usersError} />
        <AuditLogList logs={logs} isLoading={logsLoading} error={logsError} />
      </div>
    </DashboardLayout>
  );
}
