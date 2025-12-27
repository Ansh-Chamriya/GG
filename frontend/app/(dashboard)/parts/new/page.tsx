"use client";

import { useParts } from '../hooks/useParts';
import { PartForm } from '../components/PartForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function CreatePartPage() {
    const { createPart } = useParts();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true);
        try {
            await createPart(data);
            router.push('/parts');
        } catch (err) {
            setError('Failed to create part');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link
                    href="/parts"
                    className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-4"
                >
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Inventory
                </Link>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Add New Part</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm dark:bg-red-900/20 dark:text-red-400">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700">
                <PartForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
        </div>
    );
}
