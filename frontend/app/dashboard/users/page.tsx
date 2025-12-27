"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Mail, Shield, Smartphone } from "lucide-react";
import {
    DashboardLayout,
    DataTable,
    StatusBadge,
    Avatar,
    RoleBadge,
    SectionHeader,
    roleConfig,
} from "@/app/components/dashboard/shared";
import { UserRole } from "@/app/lib/api";

// Mock data
const USERS = [
    {
        id: "1",
        name: "John Smith",
        email: "john.smith@example.com",
        role: "super_admin",
        status: "active",
        department: "Management",
        lastActive: "2 mins ago"
    },
    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah.j@example.com",
        role: "admin",
        status: "active",
        department: "Operations",
        lastActive: "1 hour ago"
    },
    {
        id: "3",
        name: "Mike Brown",
        email: "m.brown@example.com",
        role: "technician",
        status: "on_leave",
        department: "Maintenance",
        lastActive: "2 days ago"
    },
    {
        id: "4",
        name: "Emily Davis",
        email: "emily.d@example.com",
        role: "manager",
        status: "active",
        department: "Facilities",
        lastActive: "5 mins ago"
    },
    {
        id: "5",
        name: "David Wilson",
        email: "david.w@example.com",
        role: "operator",
        status: "inactive",
        department: "Production",
        lastActive: "1 week ago"
    }
];

const ROLE_COLORS = {
    super_admin: "bg-purple-100 text-purple-700",
    admin: "bg-blue-100 text-blue-700",
    manager: "bg-indigo-100 text-indigo-700",
    technician: "bg-orange-100 text-orange-700",
    operator: "bg-green-100 text-green-700",
    viewer: "bg-gray-100 text-gray-700"
};

export default function UsersPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = USERS.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "user",
            header: "User",
            render: (user: any) => (
                <div className="flex items-center gap-3">
                    <Avatar name={user.name} />
                    <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.department}</div>
                    </div>
                </div>
            )
        },
        {
            key: "contact",
            header: "Contact",
            render: (user: any) => (
                <div className="flex flex-col gap-1 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-3 h-3" />
                        {user.email}
                    </div>
                </div>
            )
        },
        {
            key: "role",
            header: "Role",
            render: (user: any) => (
                <RoleBadge role={user.role as UserRole} size="sm" variant="default" showIcon={true} />
            )
        },
        {
            key: "status",
            header: "Status",
            render: (user: any) => {
                const statusStyles = {
                    active: "bg-green-100 text-green-700",
                    inactive: "bg-gray-100 text-gray-600",
                    on_leave: "bg-yellow-100 text-yellow-700"
                };
                return (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${(statusStyles as any)[user.status]}`}>
                        {user.status.replace('_', ' ')}
                    </span>
                );
            }
        },
        {
            key: "activity",
            header: "Last Active",
            render: (user: any) => (
                <span className="text-sm text-gray-500">{user.lastActive}</span>
            )
        },
        {
            key: "actions",
            header: "",
            width: "50px",
            render: () => (
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-4 h-4" />
                </button>
            )
        }
    ];

    return (
        <DashboardLayout title="Users Management">
            <div className="space-y-6">
                {/* Role Overview */}
                <div>
                    <SectionHeader
                        title="Role Distribution"
                        subtitle="Overview of users by role in your organization"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
                        {(["super_admin", "admin", "manager", "technician", "operator"] as UserRole[]).map((role) => {
                            const count = USERS.filter((u) => u.role === role).length;
                            const config = roleConfig[role];
                            return (
                                <div
                                    key={role}
                                    className="card p-3 transition-all hover:shadow-md cursor-default"
                                    style={{ borderLeft: `3px solid ${config?.color || "var(--border)"}` }}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span
                                            className="text-xl font-bold"
                                            style={{ color: config?.color || "var(--foreground)" }}
                                        >
                                            {count}
                                        </span>
                                        <RoleBadge role={role} size="sm" showIcon={false} />
                                    </div>
                                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                                        {config?.description || ""}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/users/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Invite User
                    </Link>
                </div>

                {/* Data Table */}
                <DataTable
                    data={filteredUsers}
                    columns={columns}
                    emptyMessage="No users found"
                />
            </div>
        </DashboardLayout>
    );
}
