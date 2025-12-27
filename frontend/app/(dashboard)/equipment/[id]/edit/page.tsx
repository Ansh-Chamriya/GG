"use client";

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useEquipment } from '@/app/(dashboard)/equipment/hooks/useEquipment';
import { useEquipmentCategories } from '@/app/(dashboard)/equipment/hooks/useEquipmentCategories';
import { useLocations } from '@/app/(dashboard)/equipment/hooks/useLocations';
import { EquipmentStatus } from '@/app/(dashboard)/equipment/types/equipment.types';

export default function EditEquipmentPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const { selectedEquipment, isLoading, error: fetchError, updateEquipment } = useEquipment(params.id);
    const { categories } = useEquipmentCategories();
    const { locations } = useLocations();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        categoryId: '',
        locationId: '',
        serialNumber: ('') as string | undefined,
        status: 'operational' as EquipmentStatus,
        model: ('') as string | undefined,
        manufacturer: ('') as string | undefined,
        description: ('') as string | undefined,
    });

    useEffect(() => {
        if (selectedEquipment) {
            setFormData({
                name: selectedEquipment.name,
                categoryId: selectedEquipment.categoryId,
                locationId: selectedEquipment.locationId,
                serialNumber: selectedEquipment.serialNumber || '',
                status: selectedEquipment.status,
                model: selectedEquipment.model || '',
                manufacturer: selectedEquipment.manufacturer || '',
                description: selectedEquipment.description || '',
            });
        }
    }, [selectedEquipment]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Find names for category and location
            const categoryName = categories.find(c => c.id === formData.categoryId)?.name;
            const locationName = locations.find(l => l.id === formData.locationId)?.name;

            await updateEquipment(params.id, {
                ...formData,
                categoryName,
                locationName,
            });
            router.push(`/equipment/${params.id}`);
        } catch (err) {
            setError('Failed to update equipment. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="skeleton h-8 w-64" />
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 h-96" />
            </div>
        );
    }

    if (fetchError || !selectedEquipment) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Equipment not found</h3>
                <Link href="/equipment" className="mt-4 btn-primary">
                    Back to Equipment
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <Link
                    href={`/equipment/${params.id}`}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to details
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Equipment</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Basic Info */}
                    <div className="col-span-2">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Basic Information</h3>
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Equipment Name *
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="mt-1 input"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Category *
                        </label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            required
                            className="mt-1 input"
                            value={formData.categoryId}
                            onChange={handleChange}
                        >
                            <option value="">Select Category</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Location *
                        </label>
                        <select
                            id="locationId"
                            name="locationId"
                            required
                            className="mt-1 input"
                            value={formData.locationId}
                            onChange={handleChange}
                        >
                            <option value="">Select Location</option>
                            {locations.map(l => (
                                <option key={l.id} value={l.id}>{l.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Serial Number
                        </label>
                        <input
                            type="text"
                            id="serialNumber"
                            name="serialNumber"
                            className="mt-1 input"
                            value={formData.serialNumber}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Status *
                        </label>
                        <select
                            id="status"
                            name="status"
                            required
                            className="mt-1 input"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="operational">Operational</option>
                            <option value="maintenance">Maintenance</option>
                            <option value="down">Down</option>
                            <option value="scrapped">Scrapped</option>
                        </select>
                    </div>

                    {/* Technical Details */}
                    <div className="col-span-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white">Technical Details</h3>
                    </div>

                    <div>
                        <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Manufacturer
                        </label>
                        <input
                            type="text"
                            id="manufacturer"
                            name="manufacturer"
                            className="mt-1 input"
                            value={formData.manufacturer}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Model
                        </label>
                        <input
                            type="text"
                            id="model"
                            name="model"
                            className="mt-1 input"
                            value={formData.model}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="mt-1 input min-h-[80px] py-2"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href={`/equipment/${params.id}`}
                        className="btn-secondary"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}
