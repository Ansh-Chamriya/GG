'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LocationHeader } from '../components/LocationHeader';
import { LocationForm } from '../components/LocationForm';
import { useLocations } from '../hooks/useLocations';
import { CreateLocationDTO } from '../types/location.types';

export default function NewLocationPage() {
    const router = useRouter();
    const { createLocation } = useLocations();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const handleSubmit = async (data: CreateLocationDTO) => {
        setIsSubmitting(true);
        try {
            await createLocation(data);
            router.push('/locations');
        } catch (error) {
            console.error('Failed to create location:', error);
            // Ideally show a toast notification here
            alert('Failed to create location');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <LocationHeader
                title="Add Location"
                description="Create a new location to manage inventory and equipment."
            />

            <div className="mt-8">
                <LocationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
}
