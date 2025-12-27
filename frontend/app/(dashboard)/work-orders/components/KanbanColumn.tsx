import React, { useMemo } from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { WorkOrder, WorkOrderStatus } from '../types/workorder.types';
import { STATUS_CONFIG } from '../utils/statusConfig';
import { WorkOrderCard } from './WorkOrderCard';

interface KanbanColumnProps {
    status: WorkOrderStatus;
    workOrders: WorkOrder[];
}

export function KanbanColumn({ status, workOrders }: KanbanColumnProps) {
    const config = STATUS_CONFIG[status];
    const { setNodeRef } = useDroppable({
        id: status,
    });

    const workOrderIds = useMemo(() => workOrders.map((w) => w.id), [workOrders]);

    return (
        <div className="flex h-full w-full flex-col rounded-2xl bg-gray-50/50 p-3 backdrop-blur-xl dark:bg-white/5">
            <div className="mb-4 flex items-center justify-between px-2 pt-1">
                <div className="flex items-center gap-2">
                    <div className={`h-2.5 w-2.5 rounded-full ring-2 ring-white/50 ${config.bg.replace('bg-', 'bg-').split(' ')[0].replace('50', '500')}`} />
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        {config.label}
                    </h3>
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-md bg-white px-2 text-xs font-semibold text-gray-500 shadow-sm ring-1 ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700">
                        {workOrders.length}
                    </span>
                </div>
            </div>

            <div
                ref={setNodeRef}
                className="flex flex-1 flex-col gap-3 overflow-y-auto overflow-x-hidden rounded-xl bg-gray-100/50 p-2 transition-colors dark:bg-black/20"
            >
                <SortableContext items={workOrderIds} strategy={verticalListSortingStrategy}>
                    {workOrders.map((wo) => (
                        <WorkOrderCard key={wo.id} workOrder={wo} />
                    ))}
                </SortableContext>

                {workOrders.length === 0 && (
                    <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 text-gray-400 dark:border-gray-800">
                        <span className="text-sm">No tickets</span>
                        <span className="text-xs opacity-60">Drop items here</span>
                    </div>
                )}
            </div>
        </div>
    );
}
