import React from 'react';
import { WorkOrder } from '../../types/workorder.types';
import { CalendarIcon, UserCircleIcon, WrenchIcon } from '@heroicons/react/24/outline';

interface WorkOrderDrawerOverviewProps {
    workOrder: WorkOrder;
}

export function WorkOrderDrawerOverview({ workOrder }: WorkOrderDrawerOverviewProps) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                    {workOrder.title}
                </h2>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <WrenchIcon className="h-4 w-4" />
                        <span className="capitalize">{workOrder.type}</span>
                    </div>
                </div>
            </div>

            <div className="prose prose-sm prose-gray dark:prose-invert">
                <p>{workOrder.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-900/50">
                <div>
                    <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                        Assignee
                    </span>
                    <div className="mt-1 flex items-center gap-2">
                        {workOrder.assignee ? (
                            <>
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                                    {workOrder.assignee.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                                    {workOrder.assignee.name}
                                </span>
                            </>
                        ) : (
                            <span className="text-sm text-gray-400 italic">Unassigned</span>
                        )}
                    </div>
                </div>

                <div>
                    <span className="block text-xs font-medium text-gray-500 dark:text-gray-400">
                        Due Date
                    </span>
                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-gray-900 dark:text-gray-200">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        {new Date(workOrder.dueDate).toLocaleDateString()}
                    </div>
                </div>
            </div>
        </div>
    );
}
