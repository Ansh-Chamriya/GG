interface ScheduleStatusBadgeProps {
    isActive: boolean;
}

export default function ScheduleStatusBadge({ isActive }: ScheduleStatusBadgeProps) {
    if (isActive) {
        return (
            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-900/30">
                Active
            </span>
        );
    }

    return (
        <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-900/20 dark:text-gray-400 dark:ring-gray-800/30">
            Inactive
        </span>
    );
}
