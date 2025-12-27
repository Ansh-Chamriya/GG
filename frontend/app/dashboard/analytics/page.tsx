"use client";

import { BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle, Package, Users } from "lucide-react";
import {
    DashboardLayout,
    KPICard,
    ProgressBar,
    SectionHeader
} from "@/app/components/dashboard/shared";

export default function AnalyticsPage() {
    return (
        <DashboardLayout title="Analytics">
            <div className="space-y-8">
                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPICard
                        label="Equipment Health"
                        value="94%"
                        icon={<TrendingUp className="w-6 h-6" />}
                        trend={{ value: 2.5, isPositive: true }}
                        color="var(--success)"
                    />
                    <KPICard
                        label="MTTR (Mean Time To Repair)"
                        value="4.2h"
                        icon={<Clock className="w-6 h-6" />}
                        trend={{ value: 12, isPositive: true }}
                        color="var(--info)"
                    />
                    <KPICard
                        label="Work Order Completion"
                        value="88%"
                        icon={<CheckCircle className="w-6 h-6" />}
                        trend={{ value: 5, isPositive: true }}
                        color="var(--primary)"
                    />
                    <KPICard
                        label="Critical Alerts"
                        value="3"
                        icon={<AlertTriangle className="w-6 h-6" />}
                        trend={{ value: 1, isPositive: false }}
                        color="var(--danger)"
                    />
                </div>

                {/* Charts Area - Mocked for visual representation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="card p-6">
                        <SectionHeader title="Maintenance Costs" subtitle="Monthly expenses breakdown" />
                        <div className="h-64 flex items-end justify-between gap-2 mt-4">
                            {[45, 60, 35, 70, 50, 65, 80, 55, 45, 60, 75, 50].map((h, i) => (
                                <div key={i} className="w-full bg-blue-100 rounded-t-sm hover:bg-blue-200 transition-colors relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-blue-500 rounded-t-sm transition-all duration-500 group-hover:bg-blue-600"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-400">
                            <span>Jan</span><span>Dec</span>
                        </div>
                    </div>

                    <div className="card p-6">
                        <SectionHeader title="Work Order Status" subtitle="Current workload distribution" />
                        <div className="space-y-6 mt-4">
                            <ProgressBar value={45} label="Preventive Maintenance" color="var(--primary)" />
                            <ProgressBar value={25} label="Corrective Repairs" color="var(--warning)" />
                            <ProgressBar value={20} label="Inspections" color="var(--info)" />
                            <ProgressBar value={10} label="Emergency Fixes" color="var(--danger)" />
                        </div>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                                <Package className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">1,240</div>
                                <div className="text-xs text-gray-500">Parts Used this Month</div>
                            </div>
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">98.5%</div>
                                <div className="text-xs text-gray-500">SLA Compliance</div>
                            </div>
                        </div>
                    </div>
                    <div className="card p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                                <Users className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">92%</div>
                                <div className="text-xs text-gray-500">Technician Utilization</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
