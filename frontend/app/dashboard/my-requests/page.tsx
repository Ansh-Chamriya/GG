"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Plus, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
    DashboardLayout,
    DataTable,
    EmptyState
} from "@/app/components/dashboard/shared";

// Mock data
const MY_REQUESTS = [
    {
        id: "REQ-001",
        title: "Broken conveyor belt sensor",
        equipment: "Assembly Conveyor A",
        submittedDate: "2024-03-20",
        status: "in_progress",
        priority: "high",
        assignedTo: "Mike Brown"
    },
    {
        id: "REQ-002",
        title: "HVAC not cooling properly",
        equipment: "Main HVAC Unit",
        submittedDate: "2024-03-18",
        status: "pending",
        priority: "medium",
        assignedTo: null
    },
    {
        id: "REQ-003",
        title: "Oil leak in pump",
        equipment: "Centrifugal Pump #1",
        submittedDate: "2024-03-15",
        status: "completed",
        priority: "critical",
        assignedTo: "John Smith"
    },
    {
        id: "REQ-004",
        title: "Strange noise from compressor",
        equipment: "Air Compressor",
        submittedDate: "2024-03-10",
        status: "completed",
        priority: "low",
        assignedTo: "Sarah Johnson"
    }
];

const statusConfig: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
    pending: {
        icon: <Clock className="w-4 h-4" />,
        color: "text-yellow-600",
        bg: "bg-yellow-100"
    },
    in_progress: {
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        color: "text-blue-600",
        bg: "bg-blue-100"
    },
    completed: {
        icon: <CheckCircle className="w-4 h-4" />,
        color: "text-green-600",
        bg: "bg-green-100"
    }
};

const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700"
};

export default function MyRequestsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredRequests = MY_REQUESTS.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "id",
            header: "Request",
            render: (item: typeof MY_REQUESTS[0]) => (
                <div>
                    <div className="font-medium text-gray-900">{item.id}</div>
                    <div className="text-xs text-gray-500 max-w-[200px] truncate">{item.title}</div>
                </div>
            )
        },
        {
            key: "equipment",
            header: "Equipment",
            render: (item: typeof MY_REQUESTS[0]) => (
                <span className="text-sm text-gray-600">{item.equipment}</span>
            )
        },
        {
            key: "submittedDate",
            header: "Submitted",
            render: (item: typeof MY_REQUESTS[0]) => (
                <span className="text-sm text-gray-500">{item.submittedDate}</span>
            )
        },
        {
            key: "priority",
            header: "Priority",
            render: (item: typeof MY_REQUESTS[0]) => (
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium capitalize ${priorityColors[item.priority]}`}>
                    {item.priority}
                </span>
            )
        },
        {
            key: "status",
            header: "Status",
            render: (item: typeof MY_REQUESTS[0]) => {
                const config = statusConfig[item.status];
                return (
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}>
                        {config.icon}
                        <span className="capitalize">{item.status.replace('_', ' ')}</span>
                    </div>
                );
            }
        },
        {
            key: "assignedTo",
            header: "Assigned To",
            render: (item: typeof MY_REQUESTS[0]) => (
                <span className="text-sm text-gray-600">
                    {item.assignedTo || <span className="text-gray-400 italic">Unassigned</span>}
                </span>
            )
        }
    ];

    return (
        <DashboardLayout title="My Requests">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search requests..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Link href="/dashboard/report-issue" className="btn btn-primary">
                        <Plus className="w-4 h-4" />
                        New Request
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">Total Requests</div>
                        <div className="text-2xl font-bold text-gray-900">{MY_REQUESTS.length}</div>
                    </div>
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">Pending</div>
                        <div className="text-2xl font-bold text-yellow-600">
                            {MY_REQUESTS.filter(r => r.status === 'pending').length}
                        </div>
                    </div>
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">In Progress</div>
                        <div className="text-2xl font-bold text-blue-600">
                            {MY_REQUESTS.filter(r => r.status === 'in_progress').length}
                        </div>
                    </div>
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">Completed</div>
                        <div className="text-2xl font-bold text-green-600">
                            {MY_REQUESTS.filter(r => r.status === 'completed').length}
                        </div>
                    </div>
                </div>

                {/* Table */}
                {filteredRequests.length === 0 && searchTerm === "" ? (
                    <div className="card p-8">
                        <EmptyState
                            icon={<AlertCircle className="w-8 h-8" />}
                            title="No requests yet"
                            description="You haven't submitted any maintenance requests yet."
                            action={
                                <Link href="/dashboard/report-issue" className="btn btn-primary">
                                    <Plus className="w-4 h-4" />
                                    Report an Issue
                                </Link>
                            }
                        />
                    </div>
                ) : (
                    <DataTable
                        data={filteredRequests}
                        columns={columns}
                        emptyMessage="No requests found"
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
