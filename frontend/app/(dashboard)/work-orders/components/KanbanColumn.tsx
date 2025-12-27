import React from 'react';
import { WorkOrder, WorkOrderStatus } from '../types/workorder.types';
import { STATUS_CONFIG } from '../utils/statusConfig';
import { WorkOrderCard } from './WorkOrderCard';

interface KanbanColumnProps {
    status: WorkOrderStatus;
    workOrders: WorkOrder[];
}

export function KanbanColumn({ status, workOrders }: KanbanColumnProps) {
    const config = STATUS_CONFIG[status];

    return (
        <div className="flex h-full min-w-[280px] flex-col rounded-lg bg-gray-50/50 p-2 dark:bg-gray-900/10">
            <div className="mb-3 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${config.bg.replace('bg-', 'bg-').split(' ')[0].replace('50', '500')}`} />
                    {/* ^ Simple hack to get a dot color from the bg color class (e.g. bg-blue-50 -> bg-blue-500)
               Ideally we would have dotColor in config, but this works for now or we can use text color class like 'bg-current' with text color wrapper.
               Actually better to use the dot color explicitly or just use the label color.
           */}
                    <h3 className={`text-sm font-semibold ${config.color.replace('text-', 'text-gray-900 dark:text-gray-100')}`}>
                        {config.label}
                    </h3>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-200 px-1.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                        {workOrders.length}
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
                {workOrders.map((wo) => (
                    <WorkOrderCard key={wo.id} workOrder={wo} />
                ))}
                {workOrders.length === 0 && (
                    <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-gray-100 text-xs text-gray-400 dark:border-gray-800">
                        No tickets
                    </div>
                )}
            </div>
        </div>
    );
}
