"use client";

import { useState } from "react";
import { Search, Clock, CheckCircle, XCircle, Filter } from "lucide-react";
import {
    DashboardLayout,
    DataTable,
    StatusBadge
} from "@/app/components/dashboard/shared";

// Mock data for work order history
const WORK_HISTORY = [
    {
        id: "WO-2024-001",
        title: "Pump Motor Replacement",
        equipment: "Centrifugal Pump #3",
        completedDate: "2024-03-18",
        duration: "3.5 hours",
        status: "completed",
        priority: "high"
    },
    {
        id: "WO-2024-002",
        title: "HVAC Filter Change",
        equipment: "Main HVAC Unit",
        completedDate: "2024-03-15",
        duration: "1 hour",
        status: "completed",
        priority: "medium"
    },
    {
        id: "WO-2024-003",
        title: "Conveyor Belt Inspection",
        equipment: "Assembly Line Conveyor",
        completedDate: "2024-03-12",
        duration: "2 hours",
        status: "completed",
        priority: "low"
    },
    {
        id: "WO-2024-004",
        title: "Emergency Valve Repair",
        equipment: "Main Water Valve",
        completedDate: "2024-03-10",
        duration: "4 hours",
        status: "completed",
        priority: "critical"
    },
    {
        id: "WO-2024-005",
        title: "Generator Maintenance",
        equipment: "Backup Generator",
        completedDate: "2024-03-08",
        duration: "5 hours",
        status: "cancelled",
        priority: "medium"
    }
];

const priorityColors: Record<string, string> = {
    low: "bg-gray-100 text-gray-700",
    medium: "bg-blue-100 text-blue-700",
    high: "bg-orange-100 text-orange-700",
    critical: "bg-red-100 text-red-700"
};

export default function HistoryPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredHistory = WORK_HISTORY.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "id",
            header: "Work Order",
            render: (item: typeof WORK_HISTORY[0]) => (
                <div>
                    <div className="font-medium text-gray-900">{item.id}</div>
                    <div className="text-xs text-gray-500">{item.title}</div>
                </div>
            )
        },
        {
            key: "equipment",
            header: "Equipment",
            render: (item: typeof WORK_HISTORY[0]) => (
                <span className="text-sm text-gray-600">{item.equipment}</span>
            )
        },
        {
            key: "completedDate",
            header: "Completed",
            render: (item: typeof WORK_HISTORY[0]) => (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 text-gray-400" />
                    {item.completedDate}
                </div>
            )
        },
        {
            key: "duration",
            header: "Duration",
            render: (item: typeof WORK_HISTORY[0]) => (
                <span className="text-sm text-gray-600">{item.duration}</span>
            )
        },
        {
            key: "priority",
            header: "Priority",
            render: (item: typeof WORK_HISTORY[0]) => (
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium capitalize ${priorityColors[item.priority]}`}>
                    {item.priority}
                </span>
            )
        },
        {
            key: "status",
            header: "Status",
            render: (item: typeof WORK_HISTORY[0]) => (
                <div className="flex items-center gap-1.5">
                    {item.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                        <XCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <span className={`text-sm capitalize ${item.status === 'completed' ? 'text-green-600' : 'text-gray-500'}`}>
                        {item.status}
                    </span>
                </div>
            )
        }
    ];

    return (
        <DashboardLayout title="Work History">
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search history..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-secondary">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">Total Completed</div>
                        <div className="text-2xl font-bold text-gray-900">
                            {WORK_HISTORY.filter(h => h.status === 'completed').length}
                        </div>
                    </div>
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">Avg Duration</div>
                        <div className="text-2xl font-bold text-gray-900">2.9h</div>
                    </div>
                    <div className="card p-4">
                        <div className="text-sm text-gray-500">This Month</div>
                        <div className="text-2xl font-bold text-gray-900">12</div>
                    </div>
                </div>

                {/* Table */}
                <DataTable
                    data={filteredHistory}
                    columns={columns}
                    emptyMessage="No work history found"
                />
            </div>
        </DashboardLayout>
    );
}
