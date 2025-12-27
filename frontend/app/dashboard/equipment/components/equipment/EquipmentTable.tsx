import Link from 'next/link';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Equipment } from '../../types/equipment.types';
import { EquipmentStatusBadge } from './EquipmentStatusBadge';
import { EquipmentEmpty } from './EquipmentEmpty';

interface EquipmentTableProps {
    equipment: Equipment[];
    isLoading: boolean;
}

export function EquipmentTable({ equipment, isLoading }: EquipmentTableProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full" />
                ))}
            </div>
        );
    }

    if (equipment.length === 0) {
        return <EquipmentEmpty />;
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Serial Number</th>
                            <th scope="col">Category</th>
                            <th scope="col">Location</th>
                            <th scope="col">Status</th>
                            <th scope="col" className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                        {equipment.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    <Link href={`/equipment/${item.id}`} className="hover:underline hover:text-indigo-600">
                                        {item.name}
                                    </Link>
                                    <div className="text-xs text-gray-500 mt-1">{item.model}</div>
                                </td>
                                <td className="whitespace-nowrap text-gray-500 font-mono text-xs dark:text-gray-400">
                                    {item.serialNumber || 'N/A'}
                                </td>
                                <td className="whitespace-nowrap text-gray-500 dark:text-gray-400">
                                    {item.categoryName || '-'}
                                </td>
                                <td className="whitespace-nowrap text-gray-500 dark:text-gray-400">
                                    {item.locationName || '-'}
                                </td>
                                <td className="whitespace-nowrap">
                                    <EquipmentStatusBadge status={item.status} />
                                </td>
                                <td className="whitespace-nowrap text-right text-sm font-medium">
                                    <Link
                                        href={`/equipment/${item.id}/edit`}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        <PencilSquareIcon className="h-5 w-5" />
                                        <span className="sr-only">Edit, {item.name}</span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
