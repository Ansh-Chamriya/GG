import { WorkOrderStatus } from '../types/workorder.types';

export const STATUS_CONFIG: Record<
    WorkOrderStatus,
    { label: string; color: string; bg: string }
> = {
    pending: {
        label: 'Pending',
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    in_progress: {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    on_hold: {
        label: 'On Hold',
        color: 'text-purple-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    completed: {
        label: 'Completed',
        color: 'text-green-600',
        bg: 'bg-green-50 dark:bg-green-900/20',
    },
    cancelled: {
        label: 'Cancelled',
        color: 'text-gray-600',
        bg: 'bg-gray-50 dark:bg-gray-900/20',
    },
};

export const STATUS_ORDER: WorkOrderStatus[] = [
    'pending',
    'in_progress',
    'on_hold',
    'completed',
    'cancelled',
];

