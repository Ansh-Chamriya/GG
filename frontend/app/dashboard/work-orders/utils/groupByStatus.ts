import { WorkOrder, WorkOrderStatus } from '../types/workorder.types';
import { STATUS_ORDER } from './statusConfig';

export const groupWorkOrdersByStatus = (workOrders: WorkOrder[]) => {
    const groups: Record<WorkOrderStatus, WorkOrder[]> = {
        pending: [],
        'in-progress': [],
        'in-review': [],
        completed: [],
    };

    workOrders.forEach((wo) => {
        if (groups[wo.status]) {
            groups[wo.status].push(wo);
        }
    });

    return groups;
};
