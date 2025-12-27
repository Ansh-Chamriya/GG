import React from 'react';
import { WorkOrder } from '../types/workorder.types';
import { STATUS_CONFIG } from '../utils/statusConfig';

interface WorkOrderCardProps {
    workOrder: WorkOrder;
    onStatusChange?: (id: string, newStatus: string) => void;
}

export function WorkOrderCard({ workOrder }: WorkOrderCardProps) {
    const priorityColors = {
        low: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
        medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
        high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
        critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="group relative flex cursor-pointer flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700">
            <div className="flex items-start justify-between gap-2">
                <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium capitalize ${priorityColors[workOrder.priority]
                        }`}
                >
                    {workOrder.priority}
                </span>
                <span className="text-xs text-gray-400">{workOrder.id}</span>
            </div>

            <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {workOrder.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {workOrder.description}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
                <div className="flex items-center gap-2">
                    {workOrder.assignee ? (
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                            {workOrder.assignee.name.charAt(0)}
                        </div>
                    ) : (
                        <div className="h-6 w-6 rounded-full border border-dashed border-gray-300 dark:border-gray-700" />
                    )}
                    {workOrder.assignee && (
                        <span className="text-xs text-gray-500">{workOrder.assignee.name}</span>
                    )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(workOrder.dueDate)}
                </div>
            </div>
        </div>
    );
}
