import { useState, useEffect, useCallback } from 'react';
import { WorkOrder } from '../types/workorder.types';
import { workOrdersApi } from '../api/workorders.api';

export function useWorkOrders() {
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWorkOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await workOrdersApi.getWorkOrders();
            setWorkOrders(data);
        } catch (err) {
            setError('Failed to fetch work orders');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkOrders();
    }, [fetchWorkOrders]);

    const updateLocalWorkOrder = useCallback((updatedWorkOrder: WorkOrder) => {
        setWorkOrders((prev) =>
            prev.map((wo) => (wo.id === updatedWorkOrder.id ? updatedWorkOrder : wo))
        );
    }, []);

    return {
        workOrders,
        isLoading,
        error,
        refresh: fetchWorkOrders,
        updateLocalWorkOrder,
    };
}
