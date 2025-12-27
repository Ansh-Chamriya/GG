export interface MaintenanceSchedule {
    id: string;
    equipmentId: string;
    equipmentName?: string;
    type: 'preventive' | 'predictive' | 'condition_based';
    frequencyType: 'daily' | 'weekly' | 'monthly' | 'yearly';
    frequencyValue: number;
    lastPerformed?: string;
    nextDue: string;
    priority: 'low' | 'medium' | 'high' | 'critical';
    isActive: boolean;
}

export interface CreateScheduleDTO extends Omit<MaintenanceSchedule, 'id' | 'lastPerformed' | 'nextDue' | 'equipmentName'> {
    equipmentName?: string; // Optional for optimistic updates
}

export interface UpdateScheduleDTO extends Partial<CreateScheduleDTO> {
    isActive?: boolean;
}
