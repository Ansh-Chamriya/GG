import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { WorkOrder } from '../../types/workorder.types';
import { STATUS_CONFIG } from '../../utils/statusConfig';

interface WorkOrderDrawerHeaderProps {
    workOrder: WorkOrder;
    onClose: () => void;
}

export function WorkOrderDrawerHeader({ workOrder, onClose }: WorkOrderDrawerHeaderProps) {
    const statusConfig = STATUS_CONFIG[workOrder.status];

    // Simple priority styles
    const priorityColors = {
        low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
        critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="flex items-start justify-between px-4 py-6 sm:px-6">
            <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-medium text-gray-500 dark:text-gray-400">
                        {workOrder.id}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${priorityColors[workOrder.priority]}`}>
                        {workOrder.priority}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusConfig.bg.replace('50', '100')} ${statusConfig.color}`}>
                        {statusConfig.label}
                    </span>
                </div>
            </div>
            <div className="ml-3 flex h-7 items-center">
                <button
                    type="button"
                    className="relative rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-500 dark:hover:text-gray-400"
                    onClick={onClose}
                >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}
