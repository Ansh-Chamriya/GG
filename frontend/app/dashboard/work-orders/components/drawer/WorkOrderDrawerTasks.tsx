import React from 'react';
import { WorkOrder } from '../../types/workorder.types';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid';

interface WorkOrderDrawerTasksProps {
    workOrder: WorkOrder;
    onUpdate: (updatedWorkOrder: WorkOrder) => void;
}

export function WorkOrderDrawerTasks({ workOrder, onUpdate }: WorkOrderDrawerTasksProps) {
    const tasks = workOrder.tasks || [];

    const toggleTask = (taskId: string) => {
        const updatedTasks = tasks.map(t =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        onUpdate({
            ...workOrder,
            tasks: updatedTasks
        });
    };

    if (tasks.length === 0) {
        return (
            <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tasks</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">No tasks defined for this work order.</p>
            </div>
        );
    }

    const completedCount = tasks.filter(t => t.completed).length;
    const progress = Math.round((completedCount / tasks.length) * 100);

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tasks</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {completedCount}/{tasks.length} completed
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden">
                <div
                    className="h-full bg-indigo-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-start gap-3 group cursor-pointer"
                        onClick={() => toggleTask(task.id)}
                    >
                        <button className="mt-0.5 flex-shrink-0 text-gray-400 hover:text-indigo-600 dark:text-gray-500 dark:hover:text-indigo-400">
                            {task.completed ? (
                                <CheckCircleIconSolid className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                                <CheckCircleIcon className="h-5 w-5" />
                            )}
                        </button>
                        <span className={`text-sm ${task.completed ? 'text-gray-400 line-through dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
