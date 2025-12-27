import { useState, useEffect } from 'react';
import { Location, CreateLocationDTO, UpdateLocationDTO } from '../types/location.types';

// Mock data
const MOCK_LOCATIONS: Location[] = [
    {
        id: '1',
        name: 'Main Warehouse',
        type: 'warehouse',
        status: 'active',
        city: 'San Francisco',
        state: 'CA',
        address: '123 Market St',
        zipCode: '94105',
        equipmentCount: 145,
        manager: 'John Doe',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        name: 'Downtown Office',
        type: 'office',
        status: 'active',
        city: 'New York',
        state: 'NY',
        address: '456 Broadway',
        zipCode: '10012',
        equipmentCount: 42,
        manager: 'Jane Smith',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '3',
        name: 'Site A - Construction',
        type: 'job_site',
        status: 'inactive',
        city: 'Austin',
        state: 'TX',
        address: '789 Congress Ave',
        zipCode: '78701',
        equipmentCount: 12,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export function useLocations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate API call
        const fetchLocations = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                setLocations(MOCK_LOCATIONS);
                setIsLoading(false);
            } catch (err) {
                setError('Failed to fetch locations');
                setIsLoading(false);
            }
        };

        fetchLocations();
    }, []);

    const createLocation = async (data: CreateLocationDTO) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newLocation: Location = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            equipmentCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setLocations((prev) => [...prev, newLocation]);
        return newLocation;
    };

    const updateLocation = async (id: string, data: UpdateLocationDTO) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLocations((prev) =>
            prev.map((loc) => (loc.id === id ? { ...loc, ...data } : loc))
        );
    };

    const deleteLocation = async (id: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLocations((prev) => prev.filter((loc) => loc.id !== id));
    };

    const getLocation = (id: string) => {
        return locations.find((loc) => loc.id === id);
    };

    return {
        locations,
        isLoading,
        error,
        createLocation,
        updateLocation,
        deleteLocation,
        getLocation,
    };
}
