import { MOCK_WORK_ORDERS } from '../mock/workorders.mock';
import { WorkOrder } from '../types/workorder.types';

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class WorkOrdersApi {
    private workOrders: WorkOrder[] = [...MOCK_WORK_ORDERS];

    async getWorkOrders(): Promise<WorkOrder[]> {
        await delay(800);
        return [...this.workOrders];
    }

    async updateWorkOrder(id: string, updates: Partial<WorkOrder>): Promise<WorkOrder> {
        await delay(500);
        const index = this.workOrders.findIndex((wo) => wo.id === id);
        if (index === -1) {
            throw new Error('Work order not found');
        }

        this.workOrders[index] = { ...this.workOrders[index], ...updates };
        return this.workOrders[index];
    }

    async getWorkOrder(id: string): Promise<WorkOrder> {
        await delay(400);
        const wo = this.workOrders.find(w => w.id === id);
        if (!wo) throw new Error('Not found');
        return wo;
    }
}

export const workOrdersApi = new WorkOrdersApi();
