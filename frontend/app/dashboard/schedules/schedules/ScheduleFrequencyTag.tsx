import { MaintenanceSchedule } from '../types/schedule.types';

interface ScheduleFrequencyTagProps {
    type: MaintenanceSchedule['frequencyType'];
    value: number;
}

export default function ScheduleFrequencyTag({ type, value }: ScheduleFrequencyTagProps) {
    const formatFrequency = () => {
        if (value === 1) {
            return type.charAt(0).toUpperCase() + type.slice(1);
        }
        return `Every ${value} ${type.replace('ly', 's')}`;
    };

    return (
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/20 dark:text-blue-400 dark:ring-blue-900/30">
            {formatFrequency()}
        </span>
    );
}
