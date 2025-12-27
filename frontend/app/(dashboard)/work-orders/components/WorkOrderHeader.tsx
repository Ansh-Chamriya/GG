import React from 'react';

export function WorkOrderHeader() {
    return (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Work Orders
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Manage and track your maintenance tasks
                </p>
            </div>
            <div className="flex gap-3">
                {/* Placeholders for filters/actions */}
                <button className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800">
                    Filter
                </button>
                <button className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    + New Work Order
                </button>
            </div>
        </div>
    );
}
