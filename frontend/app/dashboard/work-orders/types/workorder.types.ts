export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'critical';
export type WorkOrderStatus = 'pending' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled';
export type WorkOrderType = 'maintenance' | 'repair' | 'installation' | 'inspection';

export interface WorkOrderTask {
    id: string;
    text: string;
    completed: boolean;
}

export interface WorkOrderComment {
    id: string;
    author: string;
    message: string;
    createdAt: string;
}

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
    tasks?: WorkOrderTask[];
    comments?: WorkOrderComment[];
}
