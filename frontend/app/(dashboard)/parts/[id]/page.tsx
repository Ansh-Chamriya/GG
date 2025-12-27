"use client";

import { use, useEffect } from 'react';
import Link from 'next/link';
import { useParts } from '../hooks/useParts';
import { ArrowLeftIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function PartDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const { selectedPart, isLoading, error } = useParts(params.id);

    if (isLoading) {
        return <div className="h-96 bg-gray-100 rounded animate-pulse dark:bg-gray-800" />;
    }

    if (error || !selectedPart) {
        return (
            <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Part not found</h3>
                <Link href="/parts" className="mt-4 btn-primary inline-flex">
                    Back to Inventory
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/parts"
                        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Inventory
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {selectedPart.name}
                    </h1>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        PN: {selectedPart.partNumber}
                    </div>
                </div>
                <Link
                    href={`/parts/${params.id}/edit`}
                    className="btn-primary flex items-center gap-2"
                >
                    <PencilIcon className="h-4 w-4" />
                    Edit Part
                </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Inventory Status</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <dl className="grid grid-cols-1 gap-x-4 gap-y-4">
                            <div className="flex justify-between items-center">
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">On Hand</dt>
                                <dd className="text-2xl font-bold text-gray-900 dark:text-white">{selectedPart.quantityOnHand}</dd>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                <div
                                    className={`h-2.5 rounded-full ${selectedPart.quantityOnHand <= selectedPart.minimumStockLevel ? 'bg-red-600' : 'bg-green-600'
                                        }`}
                                    style={{ width: `${Math.min(100, (selectedPart.quantityOnHand / (selectedPart.reorderPoint * 2)) * 100)}%` }}
                                ></div>
                            </div>
                            <div className="flex justify-between text-sm">
                                <dt className="text-gray-500 dark:text-gray-400">Reorder Point</dt>
                                <dd className="font-medium text-gray-900 dark:text-white">{selectedPart.reorderPoint}</dd>
                            </div>
                            <div className="flex justify-between text-sm">
                                <dt className="text-gray-500 dark:text-gray-400">Min Stock</dt>
                                <dd className="font-medium text-gray-900 dark:text-white">{selectedPart.minimumStockLevel}</dd>
                            </div>
                        </dl>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Part Details</h3>
                    </div>
                    <div className="px-4 py-5 sm:p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPart.category}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Manufacturer</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPart.manufacturer}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Unit Cost</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">${selectedPart.unitCost.toFixed(2)}</dd>
                            </div>
                            <div>
                                <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Value</dt>
                                <dd className="mt-1 text-sm text-gray-900 dark:text-white">${selectedPart.totalValue.toFixed(2)}</dd>
                            </div>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Location</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPart.locationName}</dd>
                        </div>
                        <div>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">{selectedPart.description}</dd>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
