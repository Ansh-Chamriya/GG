import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export function PartHeader() {
    return (
        <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight dark:text-white">
                    Parts Inventory
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage spare parts, stock levels, and procurement.
                </p>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
                <Link
                    href="/parts/new"
                    className="btn-primary flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Part
                </Link>
            </div>
        </div>
    );
}
