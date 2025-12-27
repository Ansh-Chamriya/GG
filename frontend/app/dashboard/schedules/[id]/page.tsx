"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, PencilIcon, BoltIcon } from '@heroicons/react/24/outline';
import { useSchedules } from '../hooks/useSchedules';
import ScheduleStatusBadge from '@/app/(dashboard)/schedules/schedules/ScheduleStatusBadge';
import ScheduleFrequencyTag from '@/app/(dashboard)/schedules/schedules/ScheduleFrequencyTag';

export default function ScheduleDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const { selectedSchedule, isLoading, error, generateWorkOrder } = useSchedules(params.id);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateWorkOrder = async () => {
        setIsGenerating(true);
        try {
            await generateWorkOrder(params.id);
            // Optionally show success message or redirect
            alert('Work order generated successfully!');
        } catch (err) {
            alert('Failed to generate work order');
        } finally {
            setIsGenerating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
                <div className="h-96 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 animate-pulse" />
            </div>
        );
    }

    if (error || !selectedSchedule) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule not found</h3>
                <Link href="/schedules" className="mt-4 btn-primary">
                    Back to Schedules
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Link
                        href="/schedules"
                        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                    >
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Schedules
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {selectedSchedule.equipmentName || 'Unknown Equipment'}
                    </h1>
                    <div className="mt-2 flex items-center gap-2">
                        <ScheduleStatusBadge isActive={selectedSchedule.isActive} />
                        <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                            {selectedSchedule.type.replace('_', ' ')}
                        </span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleGenerateWorkOrder}
                        disabled={isGenerating}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <BoltIcon className="h-4 w-4" />
                        {isGenerating ? 'Generating...' : 'Generate Work Order'}
                    </button>
                    <Link
                        href={`/schedules/${params.id}/edit`}
                        className="btn-primary flex items-center gap-2"
                    >
                        <PencilIcon className="h-4 w-4" />
                        Edit Schedule
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-700">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">Schedule Details</h3>
                </div>
                <div className="px-4 py-5 sm:p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Frequency</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                <ScheduleFrequencyTag type={selectedSchedule.frequencyType} value={selectedSchedule.frequencyValue} />
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Priority</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white capitalize">{selectedSchedule.priority}</dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Next Due Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {new Date(selectedSchedule.nextDue).toLocaleDateString()}
                            </dd>
                        </div>
                        <div className="sm:col-span-1">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Performed</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white">
                                {selectedSchedule.lastPerformed ? new Date(selectedSchedule.lastPerformed).toLocaleDateString() : 'Never'}
                            </dd>
                        </div>
                        <div className="sm:col-span-2">
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">Schedule ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 dark:text-white font-mono">{selectedSchedule.id}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    );
}
