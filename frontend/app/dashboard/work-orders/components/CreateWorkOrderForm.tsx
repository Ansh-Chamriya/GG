'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { WorkOrderPriority, WorkOrderType } from '../types/workorder.types';
import { workOrdersApi } from '../api/workorders.api';

// Simple mock for assignees until we have a real user API
const MOCK_ASSIGNEES = [
    { id: '1', name: 'Alex Johnson' },
    { id: '2', name: 'Sarah Connor' },
    { id: '3', name: 'Mike Smith' },
    { id: '4', name: 'Jane Doe' },
    { id: '5', name: 'Tom Wilson' },
];

export function CreateWorkOrderForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'maintenance' as WorkOrderType,
        priority: 'medium' as WorkOrderPriority,
        dueDate: '',
        assigneeName: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await workOrdersApi.createWorkOrder({
                title: formData.title,
                description: formData.description,
                type: formData.type,
                priority: formData.priority,
                dueDate: formData.dueDate || new Date(Date.now() + 86400000).toISOString(), // Default to tomorrow
                assignee: formData.assigneeName ? { name: formData.assigneeName } : undefined,
            });
            router.push('/work-orders');
            router.refresh();
        } catch (error) {
            console.error('Failed to create work order:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900/50">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Title */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Work Order Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g. Broken AC in Server Room"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        />
                    </div>

                    {/* Type */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        >
                            <option value="maintenance">Maintenance</option>
                            <option value="repair">Repair</option>
                            <option value="installation">Installation</option>
                            <option value="inspection">Inspection</option>
                        </select>
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Priority
                        </label>
                        <select
                            name="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="critical">Critical</option>
                        </select>
                    </div>

                    {/* Due Date */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Due Date
                        </label>
                        <input
                            type="date"
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        />
                    </div>

                    {/* Assignee */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Assignee (Optional)
                        </label>
                        <select
                            name="assigneeName"
                            value={formData.assigneeName}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        >
                            <option value="">Unassigned</option>
                            {MOCK_ASSIGNEES.map((user) => (
                                <option key={user.id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div className="md:col-span-2">
                        <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-100">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Detailed description of the issue or task..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-gray-900 transition-all focus:border-primary focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-primary dark:focus:bg-gray-800"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="rounded-lg border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900 dark:border-gray-800 dark:bg-transparent dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-primary-dark px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary/25 transition-all hover:translate-y-px hover:shadow-xl hover:shadow-primary/30 disabled:opacity-70"
                >
                    {isLoading ? (
                        <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Creating...
                        </>
                    ) : (
                        'Create Work Order'
                    )}
                </button>
            </div>
        </form>
    );
}
