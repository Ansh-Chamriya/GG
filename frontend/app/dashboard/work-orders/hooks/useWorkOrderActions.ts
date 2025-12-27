import { useState } from 'react';
import { workOrdersApi } from '../api/workorders.api';
import { WorkOrder } from '../types/workorder.types';

export function useWorkOrderActions(updateLocalWorkOrder: (wo: WorkOrder) => void) {
    const [isUpdating, setIsUpdating] = useState(false);

    const updateStatus = async (id: string, newStatus: WorkOrder['status']) => {
        try {
            setIsUpdating(true);
            const updatedWO = await workOrdersApi.updateWorkOrder(id, { status: newStatus });
            updateLocalWorkOrder(updatedWO);
            return updatedWO;
        } catch (error) {
            console.error('Failed to update status', error);
            throw error;
        } finally {
            setIsUpdating(false);
        }
    };

    return {
        updateStatus,
        isUpdating,
    };
}
