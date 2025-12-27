"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CreatePartDTO, Part } from '../types/part.types';
import { useLocations } from '../../locations/hooks/useLocations';

interface PartFormProps {
    initialData?: Part;
    onSubmit: (data: any) => Promise<void>;
    isSubmitting: boolean;
}

export function PartForm({ initialData, onSubmit, isSubmitting }: PartFormProps) {
    const { locations } = useLocations();
    const [formData, setFormData] = useState<Partial<CreatePartDTO>>({
        name: initialData?.name || '',
        partNumber: initialData?.partNumber || '',
        description: initialData?.description || '',
        category: initialData?.category || '',
        manufacturer: initialData?.manufacturer || '',
        modelNumber: initialData?.modelNumber || '',
        locationId: initialData?.locationId || '',
        quantityOnHand: initialData?.quantityOnHand || 0,
        minimumStockLevel: initialData?.minimumStockLevel || 0,
        reorderPoint: initialData?.reorderPoint || 0,
        unitCost: initialData?.unitCost || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantityOnHand' || name === 'minimumStockLevel' || name === 'reorderPoint' || name === 'unitCost'
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-6 sm:space-y-5">
                <div>
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        {initialData ? 'Edit Part' : 'New Part'}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">
                        {initialData ? 'Update inventory details.' : 'Add a new item to your inventory.'}
                    </p>
                </div>

                <div className="space-y-6 sm:space-y-5">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Part Name *
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="partNumber" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Part Number *
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="partNumber"
                                id="partNumber"
                                required
                                value={formData.partNumber}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Category
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="text"
                                name="category"
                                id="category"
                                list="categories"
                                value={formData.category}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                            <datalist id="categories">
                                <option value="Filters" />
                                <option value="Belts" />
                                <option value="Valves" />
                                <option value="Electronics" />
                                <option value="Bearings" />
                            </datalist>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="locationId" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Location *
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <select
                                id="locationId"
                                name="locationId"
                                required
                                value={formData.locationId}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">Select a location</option>
                                {locations.map(loc => (
                                    <option key={loc.id} value={loc.id}>{loc.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="quantityOnHand" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Quantity On Hand *
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="number"
                                name="quantityOnHand"
                                id="quantityOnHand"
                                min="0"
                                required
                                value={formData.quantityOnHand}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="minimumStockLevel" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Min Stock Level
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="number"
                                name="minimumStockLevel"
                                id="minimumStockLevel"
                                min="0"
                                value={formData.minimumStockLevel}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="unitCost" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Unit Cost ($)
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input
                                type="number"
                                name="unitCost"
                                id="unitCost"
                                min="0"
                                step="0.01"
                                required
                                value={formData.unitCost}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5 dark:border-gray-700">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-300">
                            Description
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                                id="description"
                                name="description"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-5">
                <div className="flex justify-end gap-x-3">
                    <Link
                        href="/parts"
                        className="rounded-md bg-white py-2 px-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:ring-gray-600 dark:hover:bg-gray-700"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </div>
        </form>
    );
}
