"use client";

import { useState, useMemo } from 'react';
import { EquipmentHeader } from './components/equipment/EquipmentHeader';
import { EquipmentFilters } from './components/equipment/EquipmentFilters';
import { EquipmentTable } from './components/equipment/EquipmentTable';
import { useEquipment } from './hooks/useEquipment';
import { useEquipmentCategories } from './hooks/useEquipmentCategories';
import { useLocations } from './hooks/useLocations';

export default function EquipmentPage() {
    const { equipment, isLoading, error } = useEquipment();
    const { categories } = useEquipmentCategories();
    const { locations } = useLocations();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');

    const filteredEquipment = useMemo(() => {
        return equipment.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                (item.serialNumber && item.serialNumber.toLowerCase().includes(search.toLowerCase()));
            const matchesCategory = category ? item.categoryId === category : true;
            const matchesLocation = location ? item.locationId === location : true;
            const matchesStatus = status ? item.status === status : true;

            return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
        });
    }, [equipment, search, category, location, status]);

    if (error) {
        throw new Error(error);
    }

    return (
        <div className="space-y-6">
            <EquipmentHeader />
            <EquipmentFilters
                search={search}
                onSearchChange={setSearch}
                category={category}
                onCategoryChange={setCategory}
                location={location}
                onLocationChange={setLocation}
                status={status}
                onStatusChange={setStatus}
                categories={categories}
                locations={locations}
            />
            <EquipmentTable equipment={filteredEquipment} isLoading={isLoading} />
        </div>
    );
}
