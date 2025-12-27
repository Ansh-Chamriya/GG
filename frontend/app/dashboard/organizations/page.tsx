"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, MoreVertical, Building2, MapPin, Users } from "lucide-react";
import {
    DashboardLayout,
    DataTable,
    StatusBadge,
    Avatar,
    QuickAction
} from "@/app/components/dashboard/shared";

// Mock data
const ORGANIZATIONS = [
    {
        id: "1",
        name: "Acme Manufacturing",
        industry: "Manufacturing",
        status: "active",
        location: "New York, NY",
        users: 156,
        equipment: 450,
        subscription: "Enterprise",
        renewalDate: "2024-12-31"
    },
    {
        id: "2",
        name: "Global Logistics Inc",
        industry: "Logistics",
        status: "active",
        location: "Chicago, IL",
        users: 89,
        equipment: 230,
        subscription: "Professional",
        renewalDate: "2024-10-15"
    },
    {
        id: "3",
        name: "TechStart Solutions",
        industry: "Technology",
        status: "pending",
        location: "San Francisco, CA",
        users: 24,
        equipment: 56,
        subscription: "Starter",
        renewalDate: "2024-09-01"
    },
    {
        id: "4",
        name: "Bright Health Systems",
        industry: "Healthcare",
        status: "active",
        location: "Boston, MA",
        users: 340,
        equipment: 1200,
        subscription: "Enterprise",
        renewalDate: "2025-01-15"
    }
];

export default function OrganizationsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrgs = ORGANIZATIONS.filter(org =>
        org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        org.industry.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "name",
            header: "Organization",
            render: (org: any) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{org.name}</div>
                        <div className="text-xs text-gray-500">{org.industry}</div>
                    </div>
                </div>
            )
        },
        {
            key: "location",
            header: "Location",
            render: (org: any) => (
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{org.location}</span>
                </div>
            )
        },
        {
            key: "stats",
            header: "Stats",
            render: (org: any) => (
                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1" title="Users">
                        <Users className="w-4 h-4 text-gray-400" />
                        {org.users}
                    </div>
                    <div className="flex items-center gap-1" title="Equipment">
                        <span className="font-medium">Eq:</span>
                        {org.equipment}
                    </div>
                </div>
            )
        },
        {
            key: "status",
            header: "Status",
            render: (org: any) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${org.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {org.status}
                </span>
            )
        },
        {
            key: "subscription",
            header: "Plan",
            render: (org: any) => (
                <div className="text-sm">
                    <div className="font-medium text-gray-900">{org.subscription}</div>
                    <div className="text-xs text-gray-500">Renews: {org.renewalDate}</div>
                </div>
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
        <DashboardLayout title="Organizations">
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search organizations..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/organizations/new" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        Add Organization
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6">
                        <div className="text-sm text-gray-500 mb-1">Total Organizations</div>
                        <div className="text-3xl font-bold text-gray-900">{ORGANIZATIONS.length}</div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-gray-500 mb-1">Active Subscriptions</div>
                        <div className="text-3xl font-bold text-gray-900">
                            {ORGANIZATIONS.filter(o => o.status === 'active').length}
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="text-sm text-gray-500 mb-1">Total Users Managed</div>
                        <div className="text-3xl font-bold text-gray-900">
                            {ORGANIZATIONS.reduce((acc, curr) => acc + curr.users, 0)}
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    data={filteredOrgs}
                    columns={columns}
                    emptyMessage="No organizations found"
                />
            </div>
        </DashboardLayout>
    );
}
