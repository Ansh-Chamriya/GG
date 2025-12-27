export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical';
export type WorkOrderStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'completed';
export type WorkOrderType = 'maintenance' | 'repair' | 'installation' | 'inspection';

export interface WorkOrder {
    id: string;
    title: string;
    description: string;
    status: WorkOrderStatus;
    priority: WorkOrderPriority;
    type: WorkOrderType;
    assignee?: {
        name: string;
        avatar?: string;
    };
    dueDate: string; // ISO string
    createdAt: string;
}
