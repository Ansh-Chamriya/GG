import React from 'react';

export function WorkOrderEmpty() {
    return (
        <div className="flex h-[60vh] flex-col items-center justify-center text-center">
            <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-900">
                <svg
                    className="h-10 w-10 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                No work orders
            </h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
                Get started by creating a new work order.
            </p>
            <button className="mt-6 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                Create Work Order
            </button>
        </div>
    );
}
