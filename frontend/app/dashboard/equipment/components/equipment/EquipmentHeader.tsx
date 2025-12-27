import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export function EquipmentHeader() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Equipment</h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage and track all requested assets
                </p>
            </div>
            <Link
                href="/equipment/new"
                className="btn-primary inline-flex items-center gap-2"
            >
                <PlusIcon className="h-5 w-5" />
                Add Equipment
            </Link>
        </div>
    );
}
