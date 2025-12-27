"use client";

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Something went wrong!</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">{error.message}</p>
            <button
                onClick={reset}
                className="mt-4 btn-primary"
            >
                Try again
            </button>
        </div>
    );
}
