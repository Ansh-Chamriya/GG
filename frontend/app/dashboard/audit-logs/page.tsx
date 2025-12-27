"use client";

import { useState } from "react";
import { Search, FileText, Filter, Download } from "lucide-react";
import {
    DashboardLayout,
    DataTable,
    Avatar
} from "@/app/components/dashboard/shared";

// Mock data
const AUDIT_LOGS = [
    {
        id: "1",
        action: "User Login",
        user: "John Smith",
        role: "Super Admin",
        ip: "192.168.1.105",
        timestamp: "2024-03-20 14:30:45",
        status: "success",
        details: "Successful login via web portal"
    },
    {
        id: "2",
        action: "Update Equipment",
        user: "Sarah Johnson",
        role: "Admin",
        ip: "192.168.1.112",
        timestamp: "2024-03-20 13:15:22",
        status: "success",
        details: "Updated specs for CNC Machine #4"
    },
    {
        id: "3",
        action: "Delete User",
        user: "John Smith",
        role: "Super Admin",
        ip: "192.168.1.105",
        timestamp: "2024-03-20 11:45:10",
        status: "failure",
        details: "Failed attempt to delete user (ID: 55)"
    },
    {
        id: "4",
        action: "Create Work Order",
        user: "Mike Brown",
        role: "Technician",
        ip: "192.168.1.145",
        timestamp: "2024-03-19 16:20:00",
        status: "success",
        details: "Created WO-2024-001 for Pump maintenance"
    },
    {
        id: "5",
        action: "System Backup",
        user: "System",
        role: "System",
        ip: "localhost",
        timestamp: "2024-03-19 02:00:00",
        status: "success",
        details: "Daily automated database backup"
    }
];

export default function AuditLogsPage() {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLogs = AUDIT_LOGS.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const columns = [
        {
            key: "action",
            header: "Action",
            render: (log: any) => (
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.status === 'success' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'
                        }`}>
                        <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900">{log.action}</span>
                </div>
            )
        },
        {
            key: "user",
            header: "User",
            render: (log: any) => (
                <div className="flex items-center gap-2">
                    <Avatar name={log.user} size="sm" />
                    <div className="text-sm">
                        <div className="text-gray-900">{log.user}</div>
                        <div className="text-xs text-gray-500">{log.role}</div>
                    </div>
                </div>
            )
        },
        {
            key: "details",
            header: "Details",
            render: (log: any) => (
                <span className="text-sm text-gray-600">{log.details}</span>
            )
        },
        {
            key: "ip",
            header: "IP Address",
            render: (log: any) => (
                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {log.ip}
                </span>
            )
        },
        {
            key: "timestamp",
            header: "Timestamp",
            render: (log: any) => (
                <span className="text-sm text-gray-500">{log.timestamp}</span>
            )
        }
    ];

    return (
        <DashboardLayout title="Audit Logs">
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search logs..."
                            className="input pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="btn btn-secondary">
                            <Filter className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="btn btn-secondary">
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                    </div>
                </div>

                {/* Data Table */}
                <DataTable
                    data={filteredLogs}
                    columns={columns}
                    emptyMessage="No logs found"
                />
            </div>
        </DashboardLayout>
    );
}
