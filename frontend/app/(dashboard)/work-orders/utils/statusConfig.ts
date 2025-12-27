import { WorkOrderStatus } from '../types/workorder.types';

export const STATUS_CONFIG: Record<
    WorkOrderStatus,
    { label: string; color: string; bg: string }
> = {
    // backlog: {
    //     label: 'Backlog',
    //     color: 'text-gray-600',
    //     bg: 'bg-gray-100 dark:bg-gray-800',
    // },
    pending: {
        label: 'Pending',
        color: 'text-blue-600',
        bg: 'bg-blue-50 dark:bg-blue-900/20',
    },
    'in-progress': {
        label: 'In Progress',
        color: 'text-amber-600',
        bg: 'bg-amber-50 dark:bg-amber-900/20',
    },
    'in-review': {
        label: 'In Review',
        color: 'text-purple-600',
        bg: 'bg-purple-50 dark:bg-purple-900/20',
    },
    completed: {
        label: 'Completed',
        color: 'text-green-600',
        bg: 'bg-green-50 dark:bg-green-900/20',
    },
} as Record<WorkOrderStatus, { label: string; color: string; bg: string }>;

export const STATUS_ORDER: WorkOrderStatus[] = [
    // 'backlog',
    'pending',
    'in-progress',
    'in-review',
    'completed',
];
