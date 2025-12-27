import Link from 'next/link';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export default function ScheduleEmpty() {
    return (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300 dark:bg-gray-900 dark:border-gray-700">
            <CalendarDaysIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No schedules</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new maintenance schedule.
            </p>
            <div className="mt-6">
                <Link
                    href="/schedules/new"
                    className="btn-primary"
                >
                    Create Schedule
                </Link>
            </div>
        </div>
    );
}
