"use client";

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useLocations } from '../hooks/useLocations';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function LocationDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const { getLocation, isLoading, error } = useLocations();
    const selectedLocation = getLocation(params.id);

    if (isLoading) {
        return <div className="animate-pulse space-y-4 p-8">
            <div className="h-8 w-48 bg-gray-200 rounded dark:bg-gray-800" />
            <div className="h-64 bg-gray-100 rounded dark:bg-gray-800" />
        </div>;
    }

    if (error || !selectedLocation) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Location not found</h3>
                <Link href="/locations" className="mt-4 btn-primary inline-flex items-center gap-2">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Locations
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/locations"
                        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Locations
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {selectedLocation.name}
                    </h1>
                    <div className="mt-2 flex items-center gap-2">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${selectedLocation.status === 'active'
                            ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400'
                            : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                            {selectedLocation.status}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalise">
                            {selectedLocation.type.replace('_', ' ')}
                        </span>
                    </div>
                </div>
                <Link
                    href={`/locations/${params.id}/edit`}
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 gap-2"
                >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                </Link>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {selectedLocation.address}<br />
                                {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipCode}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Contact</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                Manager: {selectedLocation.manager || 'N/A'}<br />
                                Phone: {selectedLocation.contactPhone || 'N/A'}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Equipment Count</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {selectedLocation.equipmentCount} Units
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Created At</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {selectedLocation.createdAt ? new Date(selectedLocation.createdAt).toLocaleDateString() : 'N/A'}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
