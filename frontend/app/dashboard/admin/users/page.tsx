"use client";

import React, { useState } from "react";
import {
    DashboardLayout,
    SectionHeader,
    RoleBadge,
    roleConfig,
    EmptyState,
    SkeletonTable,
} from "@/app/components/dashboard/shared";
import { UserRole, ROLE_LABELS } from "@/app/lib/api";
import {
    Users,
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    Shield,
    UserCheck,
    Clock,
    Mail,
    Edit2,
    Trash2,
    Eye,
    ChevronDown,
} from "lucide-react";

// Mock user data with roles
const mockUsers = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@company.com",
        role: "admin" as UserRole,
        status: "active",
        lastActive: "2 hours ago",
        joinedDate: "Jan 15, 2024",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        role: "manager" as UserRole,
        status: "active",
        lastActive: "30 mins ago",
        joinedDate: "Feb 22, 2024",
    },
    {
        id: "3",
        name: "Mike Chen",
        email: "mike.c@company.com",
        role: "technician" as UserRole,
        status: "active",
        lastActive: "5 mins ago",
        joinedDate: "Mar 10, 2024",
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily.d@company.com",
        role: "technician" as UserRole,
        status: "inactive",
        lastActive: "2 days ago",
        joinedDate: "Apr 5, 2024",
    },
    {
        id: "5",
        name: "Robert Wilson",
        email: "r.wilson@company.com",
        role: "viewer" as UserRole,
        status: "active",
        lastActive: "1 hour ago",
        joinedDate: "May 18, 2024",
    },
    {
        id: "6",
        name: "Lisa Brown",
        email: "lisa.b@company.com",
        role: "operator" as UserRole,
        status: "active",
        lastActive: "15 mins ago",
        joinedDate: "Jun 3, 2024",
    },
];

// Role Summary Card Component
function RoleSummaryCard({ role, count }: { role: UserRole; count: number }) {
    const config = roleConfig[role];

    return (
        <div
            className="card p-4 transition-all hover:shadow-md cursor-pointer"
            style={{ borderLeft: `4px solid ${config.color}` }}
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: config.gradient }}
                >
                    <span className="text-white">{config.icon}</span>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <span
                            className="font-semibold text-lg"
                            style={{ color: "var(--foreground)" }}
                        >
                            {count}
                        </span>
                        <RoleBadge role={role} size="sm" variant="default" />
                    </div>
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                        {config.description}
                    </p>
                </div>
            </div>
        </div>
    );
}

// User Row Component
function UserRow({
    user,
    onEdit,
    onDelete,
}: {
    user: (typeof mockUsers)[0];
    onEdit: () => void;
    onDelete: () => void;
}) {
    const [showMenu, setShowMenu] = useState(false);
    const config = roleConfig[user.role];

    return (
        <tr
            className="animate-fade-in hover:bg-gray-50 transition-colors"
            style={{ animationDelay: "0.05s" }}
        >
            <td>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white"
                        style={{ background: config.gradient }}
                    >
                        {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                    </div>
                    <div>
                        <div className="font-medium" style={{ color: "var(--foreground)" }}>
                            {user.name}
                        </div>
                        <div
                            className="text-sm flex items-center gap-1"
                            style={{ color: "var(--foreground-muted)" }}
                        >
                            <Mail className="w-3 h-3" />
                            {user.email}
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <RoleBadge role={user.role} size="sm" variant="default" showIcon={true} />
            </td>
            <td>
                <span
                    className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${user.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                >
                    <span
                        className={`w-2 h-2 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-gray-400"
                            }`}
                    />
                    {user.status === "active" ? "Active" : "Inactive"}
                </span>
            </td>
            <td>
                <div className="flex items-center gap-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                    <Clock className="w-3.5 h-3.5" />
                    {user.lastActive}
                </div>
            </td>
            <td>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <MoreHorizontal className="w-4 h-4" style={{ color: "var(--foreground-muted)" }} />
                    </button>
                    {showMenu && (
                        <div
                            className="absolute right-0 top-full mt-1 w-40 rounded-xl py-2 z-10 animate-scale-in"
                            style={{
                                background: "var(--background)",
                                border: "1px solid var(--border)",
                                boxShadow: "var(--shadow-lg)",
                            }}
                        >
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    onEdit();
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                                style={{ color: "var(--foreground)" }}
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit User
                            </button>
                            <button
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
                                style={{ color: "var(--foreground)" }}
                            >
                                <Eye className="w-4 h-4" />
                                View Details
                            </button>
                            <div className="my-1 border-t" style={{ borderColor: "var(--border)" }} />
                            <button
                                onClick={() => {
                                    setShowMenu(false);
                                    onDelete();
                                }}
                                className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-red-50"
                                style={{ color: "var(--danger)" }}
                            >
                                <Trash2 className="w-4 h-4" />
                                Remove
                            </button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default function AdminUsersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("all");
    const [isLoading] = useState(false);

    // Filter users based on search and role
    const filteredUsers = mockUsers.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = selectedRole === "all" || user.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    // Count users by role
    const roleCounts = mockUsers.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return (
        <DashboardLayout title="User Management">
            {/* Role Overview Section */}
            <div className="mb-6">
                <SectionHeader
                    title="Role Overview"
                    subtitle="Understanding role-based access control in your organization"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {(["admin", "manager", "technician", "operator", "viewer"] as UserRole[]).map(
                        (role) => (
                            <RoleSummaryCard
                                key={role}
                                role={role}
                                count={roleCounts[role] || 0}
                            />
                        )
                    )}
                </div>
            </div>

            {/* Users Table Section */}
            <div className="card overflow-hidden">
                <div
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border-b"
                    style={{ borderColor: "var(--border)" }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: "var(--primary-light)" }}
                        >
                            <Users className="w-5 h-5" style={{ color: "var(--primary)" }} />
                        </div>
                        <div>
                            <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
                                All Users
                            </h3>
                            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                                {filteredUsers.length} users found
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Search */}
                        <div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg"
                            style={{ background: "var(--background-secondary)" }}
                        >
                            <Search className="w-4 h-4" style={{ color: "var(--foreground-muted)" }} />
                            <input
                                type="text"
                                placeholder="Search users..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-transparent border-none outline-none text-sm w-40"
                                style={{ color: "var(--foreground)" }}
                            />
                        </div>
                        {/* Role Filter */}
                        <div className="relative">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="appearance-none px-4 py-2 pr-10 rounded-lg text-sm outline-none cursor-pointer"
                                style={{
                                    background: "var(--background-secondary)",
                                    color: "var(--foreground)",
                                    border: "1px solid var(--border)",
                                }}
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="technician">Technician</option>
                                <option value="operator">Operator</option>
                                <option value="viewer">Viewer</option>
                            </select>
                            <ChevronDown
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                                style={{ color: "var(--foreground-muted)" }}
                            />
                        </div>
                        {/* Add User Button */}
                        <button className="btn btn-primary flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add User
                        </button>
                    </div>
                </div>

                {/* Table */}
                {isLoading ? (
                    <SkeletonTable rows={5} />
                ) : filteredUsers.length === 0 ? (
                    <div className="p-8">
                        <EmptyState
                            icon={<Users className="w-8 h-8" />}
                            title="No users found"
                            description={
                                searchQuery || selectedRole !== "all"
                                    ? "Try adjusting your filters"
                                    : "Add your first user to get started"
                            }
                        />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Last Active</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <UserRow
                                        key={user.id}
                                        user={user}
                                        onEdit={() => console.log("Edit", user.id)}
                                        onDelete={() => console.log("Delete", user.id)}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Role Permissions Legend */}
            <div className="mt-6 card p-6">
                <SectionHeader
                    title="Role Permissions Guide"
                    subtitle="What each role can access in the system"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                    {(["admin", "manager", "technician", "operator", "viewer"] as UserRole[]).map(
                        (role) => (
                            <RoleBadge
                                key={role}
                                role={role}
                                variant="card"
                                showDescription={true}
                            />
                        )
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
