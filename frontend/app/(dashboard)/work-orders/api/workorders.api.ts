import { MOCK_WORK_ORDERS } from '../mock/workorders.mock';
import { WorkOrder, WorkOrderStatus } from '../types/workorder.types';

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

    async createWorkOrder(workOrder: Omit<WorkOrder, 'id' | 'createdAt' | 'status'> & { status?: WorkOrderStatus }): Promise<WorkOrder> {
        await delay(600);
        const newWorkOrder: WorkOrder = {
            ...workOrder,
            id: `WO-${1000 + this.workOrders.length + 1}`,
            createdAt: new Date().toISOString(),
            status: workOrder.status || 'pending',
        };
        this.workOrders.push(newWorkOrder);
        return newWorkOrder;
    }
}

export const workOrdersApi = new WorkOrdersApi();
