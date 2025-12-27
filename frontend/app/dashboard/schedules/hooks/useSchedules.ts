import { useState, useEffect, useCallback } from 'react';
import { MaintenanceSchedule, CreateScheduleDTO, UpdateScheduleDTO } from '../types/schedule.types';

const MOCK_SCHEDULES: MaintenanceSchedule[] = [
    {
        id: '1',
        equipmentId: '1',
        equipmentName: 'Industrial HVAC Unit',
        type: 'preventive',
        frequencyType: 'monthly',
        frequencyValue: 3,
        lastPerformed: '2024-03-15T10:00:00Z',
        nextDue: '2024-06-15T10:00:00Z',
        priority: 'high',
        isActive: true
    },
    {
        id: '2',
        equipmentId: '2',
        equipmentName: 'Conveyor Belt Motor',
        type: 'predictive',
        frequencyType: 'weekly',
        frequencyValue: 2,
        lastPerformed: '2024-04-01T08:30:00Z',
        nextDue: '2024-04-15T08:30:00Z',
        priority: 'medium',
        isActive: true
    },
    {
        id: '3',
        equipmentId: '3',
        equipmentName: 'Main Switchboard',
        type: 'condition_based',
        frequencyType: 'yearly',
        frequencyValue: 1,
        lastPerformed: '2023-11-10T00:00:00Z',
        nextDue: '2024-11-10T00:00:00Z',
        priority: 'critical',
        isActive: true
    },
    {
        id: '4',
        equipmentId: '1',
        equipmentName: 'Industrial HVAC Unit',
        type: 'preventive',
        frequencyType: 'monthly',
        frequencyValue: 1,
        lastPerformed: '2024-03-01T00:00:00Z',
        nextDue: '2024-04-01T00:00:00Z',
        priority: 'low',
        isActive: false
    }
];

export function useSchedules(id?: string) {
    const [schedules, setSchedules] = useState<MaintenanceSchedule[]>([]);
    const [selectedSchedule, setSelectedSchedule] = useState<MaintenanceSchedule | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSchedules = useCallback(async () => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            setSchedules(MOCK_SCHEDULES);
        } catch (err) {
            setError('Failed to fetch schedules');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const fetchScheduleById = useCallback(async (scheduleId: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 600));
            const found = MOCK_SCHEDULES.find(s => s.id === scheduleId);
            if (found) {
                setSelectedSchedule(found);
            } else {
                setError('Schedule not found');
            }
        } catch (err) {
            setError('Failed to fetch schedule details');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            fetchScheduleById(id);
        } else {
            fetchSchedules();
        }
    }, [id, fetchSchedules, fetchScheduleById]);

    const createSchedule = async (data: CreateScheduleDTO) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const newSchedule: MaintenanceSchedule = {
                ...data,
                id: Math.random().toString(36).substr(2, 9),
                nextDue: new Date(Date.now() + 86400000 * 30).toISOString(), // Mock next due
                isActive: true,
                equipmentName: data.equipmentName || 'Unknown Equipment'
            };
            setSchedules(prev => [...prev, newSchedule]);
            return newSchedule;
        } catch (err) {
            setError('Failed to create schedule');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateSchedule = async (scheduleId: string, data: UpdateScheduleDTO) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSchedules(prev => prev.map(item =>
                item.id === scheduleId ? { ...item, ...data } : item
            ));
            if (selectedSchedule?.id === scheduleId) {
                setSelectedSchedule(prev => prev ? { ...prev, ...data } : null);
            }
        } catch (err) {
            setError('Failed to update schedule');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteSchedule = async (scheduleId: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setSchedules(prev => prev.filter(item => item.id !== scheduleId));
        } catch (err) {
            setError('Failed to delete schedule');
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const generateWorkOrder = async (scheduleId: string) => {
        setIsLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 800));
            // In real app, this would POST to /api/v1/schedules/{id}/generate-workorder
            console.log(`Generated work order for schedule ${scheduleId}`);
            return true;
        } catch (err) {
            setError('Failed to generate work order');
            throw err;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        schedules,
        selectedSchedule,
        isLoading,
        error,
        createSchedule,
        updateSchedule,
        deleteSchedule,
        generateWorkOrder,
        refresh: fetchSchedules
    };
}
