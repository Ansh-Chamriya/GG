"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/lib/auth";
import { UserRole } from "@/app/lib/api";
import {
  Shield,
  LayoutDashboard,
  Settings,
  Users,
  ClipboardList,
  Building2,
  Calendar,
  BarChart3,
  Wrench,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  ChevronDown,
  Kanban,
  Clock,
  FileText,
  Database,
  AlertTriangle,
} from "lucide-react";

// ============ TYPES ============
interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface SidebarProps {
  role: UserRole;
  collapsed?: boolean;
  onToggle?: () => void;
}

interface TopbarProps {
  title: string;
  notificationCount?: number;
}

// ============ NAVIGATION CONFIG ============
const navigationConfig: Record<UserRole, NavItem[]> = {
  "super-admin": [
    {
      label: "Dashboard",
      href: "/dashboard/super-admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Organizations",
      href: "/dashboard/super-admin/organizations",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "All Equipment",
      href: "/dashboard/super-admin/equipment",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      label: "All Requests",
      href: "/dashboard/super-admin/requests",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Users & Roles",
      href: "/dashboard/super-admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Analytics",
      href: "/dashboard/super-admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "System Settings",
      href: "/dashboard/super-admin/settings",
      icon: <Database className="w-5 h-5" />,
    },
    {
      label: "Audit Logs",
      href: "/dashboard/super-admin/logs",
      icon: <FileText className="w-5 h-5" />,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Equipment",
      href: "/dashboard/admin/equipment",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      label: "Teams",
      href: "/dashboard/admin/teams",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Requests",
      href: "/dashboard/admin/requests",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Calendar",
      href: "/dashboard/admin/calendar",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Reports",
      href: "/dashboard/admin/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Wrench className="w-5 h-5" />,
    },
  ],
  manager: [
    {
      label: "Dashboard",
      href: "/dashboard/manager",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Kanban Board",
      href: "/dashboard/manager/kanban",
      icon: <Kanban className="w-5 h-5" />,
    },
    {
      label: "Calendar",
      href: "/dashboard/manager/calendar",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "Equipment",
      href: "/dashboard/manager/equipment",
      icon: <Settings className="w-5 h-5" />,
    },
    {
      label: "My Team",
      href: "/dashboard/manager/team",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Reports",
      href: "/dashboard/manager/reports",
      icon: <BarChart3 className="w-5 h-5" />,
    },
  ],
  technician: [
    {
      label: "My Tasks",
      href: "/dashboard/technician",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Kanban",
      href: "/dashboard/technician/kanban",
      icon: <Kanban className="w-5 h-5" />,
    },
    {
      label: "Calendar",
      href: "/dashboard/technician/calendar",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      label: "History",
      href: "/dashboard/technician/history",
      icon: <Clock className="w-5 h-5" />,
    },
  ],
};

const roleLabels: Record<UserRole, string> = {
  "super-admin": "Super Admin",
  admin: "Organization Admin",
  manager: "Manager",
  technician: "Technician",
};

const roleColors: Record<UserRole, string> = {
  "super-admin": "var(--danger)",
  admin: "var(--warning)",
  manager: "var(--primary)",
  technician: "var(--success)",
};

// ============ SIDEBAR COMPONENT ============
export function Sidebar({ role, collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const navItems = navigationConfig[role];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className={`sidebar fixed left-0 top-0 z-40 ${
        collapsed ? "collapsed" : ""
      }`}
      style={{
        width: collapsed
          ? "var(--sidebar-collapsed-width)"
          : "var(--sidebar-width)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-5 py-5 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
          }}
        >
          <Shield className="w-5 h-5 text-white" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <div
              className="font-semibold text-base"
              style={{ color: "var(--foreground)" }}
            >
              GearGuard
            </div>
            <div
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              {roleLabels[role]}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-nav-item relative ${
                isActive ? "active" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <span
                className="flex-shrink-0"
                style={{ color: isActive ? "var(--primary)" : "inherit" }}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full"
                      style={{ background: "var(--danger)", color: "white" }}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: "var(--background)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        {collapsed ? (
          <ChevronRight
            className="w-3 h-3"
            style={{ color: "var(--foreground-muted)" }}
          />
        ) : (
          <ChevronLeft
            className="w-3 h-3"
            style={{ color: "var(--foreground-muted)" }}
          />
        )}
      </button>

      {/* Logout */}
      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <button
          onClick={handleLogout}
          className="sidebar-nav-item w-full justify-start hover:text-red-500"
        >
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// ============ TOPBAR COMPONENT ============
export function Topbar({ title, notificationCount = 0 }: TopbarProps) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const role = user?.role || "technician";
  const userName = user?.fullName || "User";

  const handleLogout = async () => {
    setShowUserMenu(false);
    await logout();
  };

  return (
    <header className="topbar sticky top-0 z-30">
      {/* Page Title */}
      <div className="flex-1">
        <h1
          className="text-xl font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h1>
      </div>

      {/* Search */}
      <div
        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl"
        style={{ background: "var(--background-secondary)" }}
      >
        <Search
          className="w-4 h-4"
          style={{ color: "var(--foreground-muted)" }}
        />
        <input
          type="text"
          placeholder="Search equipment, requests..."
          className="bg-transparent border-none outline-none text-sm w-64"
          style={{ color: "var(--foreground)" }}
        />
      </div>

      {/* Notifications */}
      <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors">
        <Bell
          className="w-5 h-5"
          style={{ color: "var(--foreground-muted)" }}
        />
        {notificationCount > 0 && (
          <span className="notification-dot">{notificationCount}</span>
        )}
      </button>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setShowUserMenu(!showUserMenu)}
          className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-100 transition-colors"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold"
            style={{ background: roleColors[role], color: "white" }}
          >
            {userName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="hidden md:block text-left">
            <div
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {userName}
            </div>
            <div
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              {roleLabels[role]}
            </div>
          </div>
          <ChevronDown
            className="w-4 h-4 hidden md:block"
            style={{ color: "var(--foreground-muted)" }}
          />
        </button>

        {showUserMenu && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-xl py-2 animate-scale-in"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
              style={{ color: "var(--foreground)" }}
              onClick={() => setShowUserMenu(false)}
            >
              <User className="w-4 h-4" />
              Profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50"
              style={{ color: "var(--foreground)" }}
              onClick={() => setShowUserMenu(false)}
            >
              <Settings className="w-4 h-4" />
              Settings
            </Link>
            <div
              className="my-2 border-t"
              style={{ borderColor: "var(--border)" }}
            />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 text-sm w-full hover:bg-gray-50"
              style={{ color: "var(--danger)" }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

// ============ DASHBOARD LAYOUT ============
interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  notificationCount?: number;
}

export function DashboardLayout({
  children,
  title,
  notificationCount,
}: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Show loading state while auth is being determined
  if (isLoading || !user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background-secondary)" }}
      >
        <div className="animate-pulse">
          <Shield className="w-12 h-12" style={{ color: "var(--primary)" }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--background-secondary)" }}
    >
      <Sidebar
        role={user.role}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div
        className="transition-all duration-300"
        style={{
          marginLeft: sidebarCollapsed
            ? "var(--sidebar-collapsed-width)"
            : "var(--sidebar-width)",
        }}
      >
        <Topbar title={title} notificationCount={notificationCount} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

// ============ KPI CARD ============
interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
  color?: string;
  onClick?: () => void;
}

export function KPICard({
  label,
  value,
  icon,
  trend,
  color = "var(--primary)",
  onClick,
}: KPICardProps) {
  return (
    <div
      className={`kpi-card ${onClick ? "card-interactive" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `${color}15` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {trend && (
          <span
            className={`kpi-trend ${
              trend.isPositive ? "kpi-trend-up" : "kpi-trend-down"
            }`}
          >
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="kpi-value animate-count-up">{value}</div>
        <div className="kpi-label">{label}</div>
      </div>
    </div>
  );
}

// ============ SECTION HEADER ============
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h2
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

// ============ STATUS BADGE ============
type StatusType =
  | "new"
  | "in-progress"
  | "repaired"
  | "scrap"
  | "scheduled"
  | "overdue";

const statusConfig: Record<StatusType, { label: string; className: string }> = {
  new: { label: "New", className: "badge-info" },
  "in-progress": { label: "In Progress", className: "badge-warning" },
  repaired: { label: "Repaired", className: "badge-success" },
  scrap: { label: "Scrap", className: "badge-neutral" },
  scheduled: { label: "Scheduled", className: "badge-primary" },
  overdue: { label: "Overdue", className: "badge-danger" },
};

export function StatusBadge({ status }: { status: StatusType }) {
  const config = statusConfig[status];
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}

// ============ PRIORITY BADGE ============
type PriorityType = "low" | "medium" | "high" | "urgent";

const priorityConfig: Record<
  PriorityType,
  { label: string; className: string }
> = {
  low: { label: "Low", className: "badge-neutral" },
  medium: { label: "Medium", className: "badge-info" },
  high: { label: "High", className: "badge-warning" },
  urgent: { label: "Urgent", className: "badge-danger" },
};

export function PriorityBadge({ priority }: { priority: PriorityType }) {
  const config = priorityConfig[priority];
  return <span className={`badge ${config.className}`}>{config.label}</span>;
}

// ============ AVATAR ============
interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  image?: string;
}

export function Avatar({ name, size = "md", image }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (image) {
    return (
      <img
        src={image}
        alt={name}
        className={`avatar avatar-${size} object-cover`}
      />
    );
  }

  return <div className={`avatar avatar-${size}`}>{initials}</div>;
}

// ============ EMPTY STATE ============
interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "var(--background-tertiary)" }}
        >
          <span style={{ color: "var(--foreground-muted)" }}>{icon}</span>
        </div>
      )}
      <h3
        className="text-lg font-semibold mb-1"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      {description && (
        <p
          className="text-sm max-w-sm mb-4"
          style={{ color: "var(--foreground-muted)" }}
        >
          {description}
        </p>
      )}
      {action}
    </div>
  );
}

// ============ LOADING SKELETON ============
export function SkeletonCard() {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="skeleton w-16 h-5 rounded-full" />
      </div>
      <div className="skeleton w-24 h-8 mb-2" />
      <div className="skeleton w-32 h-4" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="skeleton w-48 h-6" />
      </div>
      <div className="divide-y" style={{ borderColor: "var(--border-light)" }}>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <div className="skeleton w-10 h-10 rounded-full" />
            <div className="flex-1">
              <div className="skeleton w-48 h-4 mb-2" />
              <div className="skeleton w-32 h-3" />
            </div>
            <div className="skeleton w-20 h-6 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ PROGRESS BAR ============
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div>
      {(label || showValue) && (
        <div className="flex justify-between text-sm mb-1">
          {label && (
            <span style={{ color: "var(--foreground-muted)" }}>{label}</span>
          )}
          {showValue && (
            <span style={{ color: "var(--foreground)" }}>{value}%</span>
          )}
        </div>
      )}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// ============ QUICK ACTION BUTTON ============
interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export function QuickAction({
  icon,
  label,
  onClick,
  variant = "secondary",
}: QuickActionProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

// ============ OVERDUE INDICATOR ============
export function OverdueIndicator({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <div
      className="flex items-center gap-2 px-3 py-2 rounded-lg animate-pulse-danger"
      style={{ background: "var(--danger-light)" }}
    >
      <AlertTriangle className="w-4 h-4" style={{ color: "var(--danger)" }} />
      <span className="text-sm font-medium" style={{ color: "var(--danger)" }}>
        {count} overdue request{count > 1 ? "s" : ""}
      </span>
    </div>
  );
}
