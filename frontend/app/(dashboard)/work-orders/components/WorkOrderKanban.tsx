import React from 'react';
import { useWorkOrders } from '../hooks/useWorkOrders';
import { groupWorkOrdersByStatus } from '../utils/groupByStatus';
import { STATUS_ORDER } from '../utils/statusConfig';
import { KanbanColumn } from './KanbanColumn';
import { WorkOrderEmpty } from './WorkOrderEmpty';

export function WorkOrderKanban() {
    const { workOrders, isLoading, error } = useWorkOrders();

    if (isLoading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-gray-800 dark:border-t-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    if (!workOrders.length) {
        return <WorkOrderEmpty />;
    }

    const groupedWorkOrders = groupWorkOrdersByStatus(workOrders);

    return (
        <div className="flex h-[calc(100vh-200px)] gap-6 overflow-x-auto pb-6">
            {STATUS_ORDER.map((status) => (
                <KanbanColumn
                    key={status}
                    status={status}
                    workOrders={groupedWorkOrders[status]}
                />
            ))}
        </div>
    );
}
