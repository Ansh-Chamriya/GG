"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeftIcon,
    PencilSquareIcon,
    TrashIcon,
    CalendarIcon,
    MapPinIcon,
    TagIcon,
    WrenchIcon
} from '@heroicons/react/24/outline';
import { useEquipment } from '@/app/(dashboard)/equipment/hooks/useEquipment';
import { EquipmentStatusBadge } from '@/app/(dashboard)/equipment/components/equipment/EquipmentStatusBadge';
import { clsx } from 'clsx'; // Assuming clsx is installed or using template literals
// Helper for classes if clsx is not available
const cn = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

export default function EquipmentDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const { selectedEquipment, isLoading, error, deleteEquipment } = useEquipment(params.id);
    const [activeTab, setActiveTab] = useState<'info' | 'history' | 'work-orders'>('info');
    const [isDeleting, setIsDeleting] = useState(false);

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div className="skeleton h-8 w-64" />
                    <div className="skeleton h-10 w-32" />
                </div>
                <div className="skeleton h-64 w-full rounded-lg" />
            </div>
        );
    }

    if (error || !selectedEquipment) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Equipment not found</h3>
                <Link href="/equipment" className="mt-4 btn-primary">
                    Back to Equipment
                </Link>
            </div>
        );
    }

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this equipment? This action cannot be undone.')) {
            setIsDeleting(true);
            try {
                await deleteEquipment(params.id);
                router.push('/equipment');
            } catch (err) {
                alert('Failed to delete equipment');
                setIsDeleting(false);
            }
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <Link
                    href="/equipment"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to equipment
                </Link>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {selectedEquipment.name}
                            </h1>
                            <EquipmentStatusBadge status={selectedEquipment.status} />
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 font-mono">
                            SN: {selectedEquipment.serialNumber || 'N/A'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Link
                            href={`/equipment/${params.id}/edit`}
                            className="btn-secondary inline-flex items-center gap-2"
                        >
                            <PencilSquareIcon className="h-4 w-4" />
                            Edit
                        </Link>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="btn-secondary text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 inline-flex items-center gap-2"
                        >
                            <TrashIcon className="h-4 w-4" />
                            {isDeleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    {[
                        { id: 'info', name: 'Information' },
                        { id: 'history', name: 'History' },
                        { id: 'work-orders', name: 'Work Orders' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                activeTab === tab.id
                                    ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium'
                            )}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 dark:bg-gray-900 dark:border-gray-700">
                {activeTab === 'info' && (
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Location & Category</h3>
                            <dl className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-900 dark:text-white">Location</dt>
                                        <dd className="text-sm text-gray-500 dark:text-gray-400">{selectedEquipment.locationName}</dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <TagIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-900 dark:text-white">Category</dt>
                                        <dd className="text-sm text-gray-500 dark:text-gray-400">{selectedEquipment.categoryName}</dd>
                                    </div>
                                </div>
                            </dl>
                        </div>

                        <div>
                            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Details</h3>
                            <dl className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <WrenchIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-900 dark:text-white">Model / Manufacturer</dt>
                                        <dd className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedEquipment.model} {selectedEquipment.manufacturer ? `by ${selectedEquipment.manufacturer}` : ''}
                                        </dd>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                                    <div>
                                        <dt className="text-sm font-medium text-gray-900 dark:text-white">Last Maintenance</dt>
                                        <dd className="text-sm text-gray-500 dark:text-gray-400">
                                            {selectedEquipment.lastMaintenanceDate
                                                ? new Date(selectedEquipment.lastMaintenanceDate).toLocaleDateString()
                                                : 'Never'}
                                        </dd>
                                    </div>
                                </div>
                            </dl>
                        </div>

                        {selectedEquipment.description && (
                            <div className="col-span-2 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Description</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {selectedEquipment.description}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'history' && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <CalendarIcon className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p>No history records available yet.</p>
                    </div>
                )}

                {activeTab === 'work-orders' && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <WrenchIcon className="h-8 w-8 mx-auto mb-3 opacity-50" />
                        <p>No active work orders linked to this equipment.</p>
                        <button className="mt-4 btn-secondary text-xs">
                            Create Work Order
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
