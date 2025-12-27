import Link from 'next/link';
import { Location } from '../types/location.types';
import { BuildingOfficeIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

interface LocationListProps {
    locations: Location[];
    isLoading: boolean;
    onDelete: (id: string) => void;
}

export function LocationList({ locations, isLoading, onDelete }: LocationListProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 rounded-lg bg-gray-100 animate-pulse dark:bg-gray-800" />
                ))}
            </div>
        );
    }

    if (locations.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <BuildingOfficeIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No locations</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new location.</p>
                <div className="mt-6">
                    <Link
                        href="/locations/new"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Location
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
                <div
                    key={location.id}
                    className="relative flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900 dark:border-gray-700"
                >
                    <div className="p-5 flex-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${location.status === 'active'
                                    ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400'
                                    : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {location.status}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 capitalize bg-gray-100 px-2 py-1 rounded dark:bg-gray-800">
                                    {location.type.replace('_', ' ')}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {location.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                            {location.city}, {location.state}
                        </p>

                        <div className="border-t border-gray-100 pt-4 mt-2 dark:border-gray-800 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Equipment</span>
                                <span className="font-medium text-gray-900 dark:text-white">{location.equipmentCount} units</span>
                            </div>
                            {location.manager && (
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 dark:text-gray-400">Manager</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{location.manager}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex border-t border-gray-200 divide-x divide-gray-200 dark:border-gray-700 dark:divide-gray-700">
                        <Link
                            href={`/locations/${location.id}`}
                            className="flex-1 py-3 text-sm font-medium text-center text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 rounded-bl-lg"
                        >
                            View Details
                        </Link>
                        <Link
                            href={`/locations/${location.id}/edit`}
                            className="flex-1 py-3 text-sm font-medium text-center text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-gray-800"
                        >
                            Edit
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}
