import React from 'react';
import { WorkOrder, WorkOrderStatus } from '../../types/workorder.types';

interface WorkOrderDrawerActionsProps {
    workOrder: WorkOrder;
    onUpdate: (updatedWorkOrder: WorkOrder) => void;
    onClose: () => void;
}

export function WorkOrderDrawerActions({ workOrder, onUpdate, onClose }: WorkOrderDrawerActionsProps) {

    const handleStatusChange = (newStatus: WorkOrderStatus) => {
        onUpdate({
            ...workOrder,
            status: newStatus
        });
    };

    return (
        <div className="flex w-full gap-3">
            <button
                type="button"
                className="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10"
                onClick={onClose}
            >
                Close
            </button>

            {workOrder.status === 'pending' && (
                <button
                    type="button"
                    onClick={() => handleStatusChange('in-progress')}
                    className="flex-1 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Start Work
                </button>
            )}

            {workOrder.status === 'in-progress' && (
                <div className="flex flex-1 gap-2">
                    <button
                        type="button"
                        onClick={() => handleStatusChange('in-review')}
                        className="flex-1 rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500"
                    >
                        Review
                    </button>
                    <button
                        type="button"
                        onClick={() => handleStatusChange('completed')}
                        className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                    >
                        Complete
                    </button>
                </div>
            )}

            {workOrder.status === 'in-review' && (
                <button
                    type="button"
                    onClick={() => handleStatusChange('completed')}
                    className="flex-1 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
                >
                    Approve & Complete
                </button>
            )}
        </div>
    );
}
