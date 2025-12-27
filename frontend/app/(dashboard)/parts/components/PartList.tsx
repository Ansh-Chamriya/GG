import Link from 'next/link';
import { Part } from '../types/part.types';
import { ArchiveBoxIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface PartListProps {
    parts: Part[];
    isLoading: boolean;
    onDelete: (id: string) => void;
}

export function PartList({ parts, isLoading, onDelete }: PartListProps) {
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow space-y-4 p-4 dark:bg-gray-900">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded bg-gray-100 animate-pulse dark:bg-gray-800" />
                ))}
            </div>
        );
    }

    if (parts.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                <ArchiveBoxIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No parts found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new part record.</p>
                <div className="mt-6">
                    <Link
                        href="/parts/new"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <PlusIcon className="h-5 w-5" />
                        Add Part
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl dark:bg-gray-900 dark:ring-gray-800">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Part Details</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Category</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Stock</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Value</th>
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {parts.map((part) => (
                        <tr key={part.id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                <div className="flex items-center">
                                    <div className="font-medium text-gray-900 dark:text-white">{part.name}</div>
                                </div>
                                <div className="text-gray-500 dark:text-gray-400">{part.partNumber}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                {part.category}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-900 dark:text-white font-medium">{part.quantityOnHand}</span>
                                    {part.quantityOnHand <= part.minimumStockLevel && (
                                        <ExclamationTriangleIcon className="h-4 w-4 text-amber-500" title="Low Stock" />
                                    )}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Min: {part.minimumStockLevel}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                ${part.unitCost.toFixed(2)}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${part.status === 'active'
                                        ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400'
                                    }`}>
                                    {part.status}
                                </span>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <Link href={`/parts/${part.id}`} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4">
                                    View<span className="sr-only">, {part.name}</span>
                                </Link>
                                <button onClick={() => onDelete(part.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">
                                    Delete<span className="sr-only">, {part.name}</span>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
}
