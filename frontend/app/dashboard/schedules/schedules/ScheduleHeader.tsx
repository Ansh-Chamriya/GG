import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ScheduleHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Maintenance Schedules
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage preventive and predictive maintenance strategies
                </p>
            </div>
            <Link
                href="/schedules/new"
                className="btn-primary flex items-center gap-2"
            >
                <PlusIcon className="h-4 w-4" />
                Create Schedule
            </Link>
        </div>
    );
}
