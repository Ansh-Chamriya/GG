"use client";

import { useSchedules } from './hooks/useSchedules';
import ScheduleHeader from '@/app/(dashboard)/schedules/schedules/ScheduleHeader';
import ScheduleTable from '@/app/(dashboard)/schedules/schedules/ScheduleTable';
import ScheduleEmpty from '@/app/(dashboard)/schedules/schedules/ScheduleEmpty';

export default function SchedulesPage() {
    const { schedules, isLoading, error, generateWorkOrder } = useSchedules();

    if (isLoading) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-48 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
                <div className="h-64 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 animate-pulse" />
            </div>
        );
    }

    if (error) {
        throw new Error(error);
    }

    return (
        <div className="space-y-6">
            <ScheduleHeader />

            {schedules.length === 0 ? (
                <ScheduleEmpty />
            ) : (
                <ScheduleTable
                    schedules={schedules}
                    onGenerateWorkOrder={generateWorkOrder}
                />
            )}
        </div>
    );
}
