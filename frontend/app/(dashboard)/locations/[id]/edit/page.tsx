'use client';

import React, { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LocationHeader } from '../../components/LocationHeader';
import { LocationForm } from '../../components/LocationForm';
import { useLocations } from '../../hooks/useLocations';
import { CreateLocationDTO } from '../../types/location.types';

export default function EditLocationPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const { getLocation, updateLocation, isLoading } = useLocations();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const location = getLocation(params.id);

    if (isLoading) {
        return <div className="p-8">Loading...</div>;
    }

    if (!location) {
        return <div className="p-8">Location not found</div>;
    }

    const initialData: CreateLocationDTO = {
        name: location.name,
        type: location.type as any, // Cast if type mismatch or generic string
        status: location.status as any,
        city: location.city,
        state: location.state,
        address: location.address,
        zipCode: location.zipCode,
        manager: location.manager,
        contactPhone: location.contactPhone
    };

    const handleSubmit = async (data: CreateLocationDTO) => {
        setIsSubmitting(true);
        try {
            await updateLocation(params.id, data);
            router.push('/locations');
            router.refresh();
        } catch (error) {
            console.error('Failed to update location:', error);
            alert('Failed to update location');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <LocationHeader
                title="Edit Location"
                description={`Edit details for ${location.name}`}
            />

            <div className="mt-8">
                <LocationForm
                    initialData={initialData}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
