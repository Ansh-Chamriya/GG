import { useState, useEffect } from 'react';
import { MaintenanceSchedule } from '../types/schedule.types';
import { useSchedules } from './useSchedules';

export function useUpcomingSchedules(days: number = 7) {
    const { schedules, isLoading: isLoadingSchedules } = useSchedules();
    const [upcoming, setUpcoming] = useState<MaintenanceSchedule[]>([]);
    const [overdue, setOverdue] = useState<MaintenanceSchedule[]>([]);

    useEffect(() => {
        if (isLoadingSchedules) return;

        const now = new Date();
        const futureDate = new Date();
        futureDate.setDate(now.getDate() + days);

        const upcomingSchedules = schedules.filter(s => {
            if (!s.isActive) return false;
            const dueDate = new Date(s.nextDue);
            return dueDate > now && dueDate <= futureDate;
        });

        const overdueSchedules = schedules.filter(s => {
            if (!s.isActive) return false;
            const dueDate = new Date(s.nextDue);
            return dueDate <= now;
        });

        setUpcoming(upcomingSchedules);
        setOverdue(overdueSchedules);
    }, [schedules, isLoadingSchedules, days]);

    return { upcoming, overdue, isLoading: isLoadingSchedules };
}
