'use client';

import React from 'react';
import { CreateWorkOrderForm } from '../components/CreateWorkOrderForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewWorkOrderPage() {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50/50 p-6 dark:bg-black/50">
            <div className="mx-auto w-full max-w-3xl">
                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <Link
                        href="/work-orders"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-all hover:border-gray-300 hover:text-gray-900 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Create New Work Order
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Fill in the details below to create a new maintenance ticket.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <CreateWorkOrderForm />
            </div>
        </div>
    );
}
