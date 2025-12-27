import { WorkOrder } from '../types/workorder.types';

export const MOCK_WORK_ORDERS: WorkOrder[] = [
    {
        id: 'WO-1001',
        title: 'HVAC System Maintenance',
        description: 'Quarterly maintenance check for the main building HVAC system.',
        status: 'pending',
        priority: 'high',
        type: 'maintenance',
        assignee: {
            name: 'Alex Johnson',
        },
        dueDate: '2025-01-15T09:00:00Z',
        createdAt: '2025-01-01T10:00:00Z',
        tasks: [
            { id: 't1', text: 'Inspect filters', completed: true },
            { id: 't2', text: 'Clean coils', completed: false },
            { id: 't3', text: 'Check refrigerant levels', completed: false },
        ],
        comments: [
            { id: 'c1', author: 'System', message: 'Work order created', createdAt: '2025-01-01T10:00:00Z' },
            { id: 'c2', author: 'Alex Johnson', message: 'Will start this tomorrow morning.', createdAt: '2025-01-01T14:30:00Z' },
        ],
    },
    {
        id: 'WO-1002',
        title: 'Replace Printer Cartridges',
        description: 'Replace toner in the 2nd floor marketing office printer.',
        status: 'pending',
        priority: 'low',
        type: 'maintenance',
        dueDate: '2025-01-20T17:00:00Z',
        createdAt: '2025-01-02T11:30:00Z',
    },
    {
        id: 'WO-1003',
        title: 'Server Room Overheating',
        description: 'Investigate temperature alerts in Server Room B.',
        status: 'in-progress',
        priority: 'critical',
        type: 'repair',
        assignee: {
            name: 'Sarah Connor',
        },
        dueDate: '2025-01-10T12:00:00Z',
        createdAt: '2025-01-03T08:15:00Z',
    },
    {
        id: 'WO-1004',
        title: 'Install New Security Cameras',
        description: 'Mount and configure 3 new cameras in the loading dock area.',
        status: 'pending',
        priority: 'medium',
        type: 'installation',
        assignee: {
            name: 'Mike Smith',
        },
        dueDate: '2025-01-25T15:00:00Z',
        createdAt: '2025-01-04T09:45:00Z',
    },
    {
        id: 'WO-1005',
        title: 'Safety Inspection',
        description: 'Annual fire safety equipment inspection.',
        status: 'completed',
        priority: 'high',
        type: 'inspection',
        assignee: {
            name: 'Jane Doe',
        },
        dueDate: '2025-01-01T10:00:00Z',
        createdAt: '2024-12-20T14:00:00Z',
    },
    {
        id: 'WO-1006',
        title: 'Leaking Faucet in Kitchen',
        description: 'Repair the dripping faucet in the break room kitchenette.',
        status: 'in-review',
        priority: 'low',
        type: 'repair',
        assignee: {
            name: 'Tom Wilson',
        },
        dueDate: '2025-01-12T16:00:00Z',
        createdAt: '2025-01-05T13:20:00Z',
    },
];
