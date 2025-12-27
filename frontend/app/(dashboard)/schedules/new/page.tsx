"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSchedules } from '../hooks/useSchedules';
import { useEquipment } from '@/app/(dashboard)/equipment/hooks/useEquipment';

export default function CreateSchedulePage() {
    const router = useRouter();
    const { createSchedule } = useSchedules();
    const { equipment: equipmentList } = useEquipment();

    // Form state
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        equipmentId: '',
        type: 'preventive',
        frequencyType: 'monthly',
        frequencyValue: 1,
        priority: 'medium',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const selectedEquipment = equipmentList.find(e => e.id === formData.equipmentId);

            await createSchedule({
                ...formData,
                equipmentName: selectedEquipment?.name,
                frequencyValue: Number(formData.frequencyValue),
                type: formData.type as any,
                frequencyType: formData.frequencyType as any,
                priority: formData.priority as any,
                isActive: true
            });
            router.push('/schedules');
        } catch (err) {
            setError('Failed to create schedule. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/schedules"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Schedules
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Create Schedule</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <div>
                    <label htmlFor="equipmentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Equipment *
                    </label>
                    <select
                        id="equipmentId"
                        name="equipmentId"
                        required
                        className="mt-1 input"
                        value={formData.equipmentId}
                        onChange={handleChange}
                    >
                        <option value="">Select Equipment</option>
                        {equipmentList.map(item => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Maintenance Type *
                    </label>
                    <select
                        id="type"
                        name="type"
                        required
                        className="mt-1 input"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <option value="preventive">Preventive</option>
                        <option value="predictive">Predictive</option>
                        <option value="condition_based">Condition Based</option>
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="frequencyType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Frequency Type *
                        </label>
                        <select
                            id="frequencyType"
                            name="frequencyType"
                            required
                            className="mt-1 input"
                            value={formData.frequencyType}
                            onChange={handleChange}
                        >
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="frequencyValue" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Frequency Value *
                        </label>
                        <input
                            type="number"
                            id="frequencyValue"
                            name="frequencyValue"
                            required
                            min="1"
                            className="mt-1 input"
                            value={formData.frequencyValue}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Priority *
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        required
                        className="mt-1 input"
                        value={formData.priority}
                        onChange={handleChange}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                    </select>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href="/schedules"
                        className="btn-secondary"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary disabled:opacity-50"
                    >
                        {isSubmitting ? 'Creating...' : 'Create Schedule'}
                    </button>
                </div>
            </form>
        </div>
    );
}
