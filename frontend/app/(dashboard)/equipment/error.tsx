"use client";

import { useEffect } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="mt-4 text-sm font-semibold text-gray-900 dark:text-white">Something went wrong!</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {error.message || 'Failed to load equipment data.'}
            </p>
            <button
                onClick={reset}
                className="mt-6 btn-secondary"
            >
                Try again
            </button>
        </div>
    );
}
