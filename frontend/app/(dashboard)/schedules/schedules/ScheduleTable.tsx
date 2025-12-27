import Link from 'next/link';
import { MaintenanceSchedule } from '../types/schedule.types';
import ScheduleStatusBadge from './ScheduleStatusBadge';
import ScheduleFrequencyTag from './ScheduleFrequencyTag';
import { EyeIcon, PencilIcon, BoltIcon } from '@heroicons/react/20/solid';

interface ScheduleTableProps {
    schedules: MaintenanceSchedule[];
    onGenerateWorkOrder: (id: string) => void;
}

export default function ScheduleTable({ schedules, onGenerateWorkOrder }: ScheduleTableProps) {
    const isOverdue = (dateString: string) => {
        return new Date(dateString) <= new Date();
    };

    return (
        <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg dark:bg-gray-900 dark:ring-gray-800">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                    <thead className="bg-gray-50 dark:bg-gray-800/50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Equipment</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Frequency</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Next Due</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Priority</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Status</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900">
                        {schedules.map((schedule) => {
                            const overdue = isOverdue(schedule.nextDue) && schedule.isActive;
                            return (
                                <tr key={schedule.id} className={overdue ? 'bg-red-50 dark:bg-red-900/10' : ''}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">
                                        {schedule.equipmentName || 'Unknown Equipment'}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                        {schedule.type.replace('_', ' ')}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <ScheduleFrequencyTag type={schedule.frequencyType} value={schedule.frequencyValue} />
                                    </td>
                                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${overdue ? 'text-red-600 font-medium dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}>
                                        {new Date(schedule.nextDue).toLocaleDateString()}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400 capitalize">
                                        {schedule.priority}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        <ScheduleStatusBadge isActive={schedule.isActive} />
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => onGenerateWorkOrder(schedule.id)}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                title="Generate Work Order"
                                            >
                                                <BoltIcon className="h-4 w-4" />
                                            </button>
                                            <Link
                                                href={`/schedules/${schedule.id}`}
                                                className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                                title="View Details"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={`/schedules/${schedule.id}/edit`}
                                                className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                                title="Edit Schedule"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
