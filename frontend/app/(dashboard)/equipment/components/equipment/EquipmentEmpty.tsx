import Link from 'next/link';
import { WrenchScrewdriverIcon, PlusIcon } from '@heroicons/react/24/outline';

export function EquipmentEmpty() {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center bg-white rounded-lg border border-dashed border-gray-300 dark:bg-gray-900 dark:border-gray-700">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <WrenchScrewdriverIcon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">No equipment found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Get started by creating a new asset or try adjusting your filters.
            </p>
            <div className="mt-6">
                <Link
                    href="/equipment/new"
                    className="btn-primary inline-flex items-center gap-2"
                >
                    <PlusIcon className="h-5 w-5" />
                    New Equipment
                </Link>
            </div>
        </div>
    );
}
