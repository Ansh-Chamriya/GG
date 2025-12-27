"use client";

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useSchedules } from '../../hooks/useSchedules';
import { useEquipment } from '@/app/(dashboard)/equipment/hooks/useEquipment';

export default function EditSchedulePage(props: { params: Promise<{ id: string }> }) {
    const params = use(props.params);
    const router = useRouter();
    const { selectedSchedule, isLoading, error: fetchError, updateSchedule } = useSchedules(params.id);
    const { equipment: equipmentList } = useEquipment(); // Need equipment list for the name if changing (though usually equipment isn't changed on edit, but let's allow it or at least show it)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        equipmentId: '',
        type: 'preventive',
        frequencyType: 'monthly',
        frequencyValue: 1,
        priority: 'medium',
        isActive: true,
    });

    useEffect(() => {
        if (selectedSchedule) {
            setFormData({
                equipmentId: selectedSchedule.equipmentId,
                type: selectedSchedule.type,
                frequencyType: selectedSchedule.frequencyType,
                frequencyValue: selectedSchedule.frequencyValue,
                priority: selectedSchedule.priority,
                isActive: selectedSchedule.isActive,
            });
        }
    }, [selectedSchedule]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const selectedEquipment = equipmentList.find(e => e.id === formData.equipmentId);

            await updateSchedule(params.id, {
                ...formData,
                equipmentName: selectedEquipment?.name,
                frequencyValue: Number(formData.frequencyValue),
                type: formData.type as any,
                frequencyType: formData.frequencyType as any,
                priority: formData.priority as any,
                isActive: formData.isActive
            });
            router.push(`/schedules/${params.id}`);
        } catch (err) {
            setError('Failed to update schedule. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
                <div className="h-96 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 animate-pulse" />
            </div>
        );
    }

    if (fetchError || !selectedSchedule) {
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
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href={`/schedules/${params.id}`}
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Details
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Edit Schedule</h1>
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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="isActive"
                        name="isActive"
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        checked={formData.isActive}
                        onChange={handleChange}
                    />
                    <label htmlFor="isActive" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active
                    </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <Link
                        href={`/schedules/${params.id}`}
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
