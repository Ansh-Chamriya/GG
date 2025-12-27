'use client';

import React from 'react';
import { useLocations } from './hooks/useLocations';
import { LocationList } from './components/LocationList';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline'; // Adjust import based on what's available or define inline if needed, but LocationList has it inline. LocationList doesn't export PlusIcon.
// Actually LocationList defines PlusIcon usage internally for the empty state but doesn't export it.
// I'll use text for now or verify icons.
// The user's LocationList imports from '@heroicons/react/24/outline'.

export default function LocationsPage() {
    const { locations, isLoading, deleteLocation } = useLocations();

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this location?')) {
            await deleteLocation(id);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Locations</h2>
                <div className="flex items-center space-x-2">
                    <Link href="/locations/new" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
                        Add Location
                    </Link>
                </div>
            </div>

            <LocationList
                locations={locations}
                isLoading={isLoading}
                onDelete={handleDelete}
            />
        </div>
    );
}
