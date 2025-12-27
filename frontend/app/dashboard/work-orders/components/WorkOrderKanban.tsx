import React, { useState, useCallback } from 'react';
import {
    DndContext,
    DragOverlay,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    defaultDropAnimationSideEffects,
    DragStartEvent,
    DragOverEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { useWorkOrders } from '../hooks/useWorkOrders';
import { groupWorkOrdersByStatus } from '../utils/groupByStatus';
import { STATUS_ORDER } from '../utils/statusConfig';
import { KanbanColumn } from './KanbanColumn';
import { WorkOrderEmpty } from './WorkOrderEmpty';
import { WorkOrderCardInner } from './WorkOrderCard';
import { WorkOrder, WorkOrderStatus } from '../types/workorder.types';
import { WorkOrderDrawer } from './drawer/WorkOrderDrawer';

export function WorkOrderKanban() {
    const { workOrders, isLoading, error, updateLocalWorkOrder } = useWorkOrders();
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const findWorkOrder = (id: string) => workOrders.find((w) => w.id === id);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as string);
    }, []);

    const handleDragOver = useCallback((event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeWorkOrder = workOrders.find((w) => w.id === active.id);
        if (!activeWorkOrder) return;

        // If hovering over a column
        if (STATUS_ORDER.includes(over.id as unknown as WorkOrderStatus)) {
            const newStatus = over.id as WorkOrderStatus;
            if (activeWorkOrder.status !== newStatus) {
                updateLocalWorkOrder({
                    ...activeWorkOrder,
                    status: newStatus,
                });
            }
        }
        // If hovering over another card
        else {
            const overWorkOrder = workOrders.find((w) => w.id === over.id);
            if (overWorkOrder && activeWorkOrder.status !== overWorkOrder.status) {
                updateLocalWorkOrder({
                    ...activeWorkOrder,
                    status: overWorkOrder.status,
                });
            }
        }
    }, [workOrders, updateLocalWorkOrder]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        setActiveId(null);
        // Persist change to backend here if needed
        // For now, we rely on the optimistic update in DragOver
        // Integration Point: Call API to update status
    }, []);

    const activeWorkOrder = activeId ? findWorkOrder(activeId) : null;

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    const groupedWorkOrders = groupWorkOrdersByStatus(workOrders);

    if (isLoading) {
        return (
            <div className="flex h-64 w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black dark:border-gray-800 dark:border-t-white" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-center text-red-600 dark:bg-red-900/20 dark:text-red-400">
                <p>{error}</p>
            </div>
        );
    }

    if (!workOrders.length) {
        return <WorkOrderEmpty />;
    }



    const handleWorkOrderClick = (workOrder: WorkOrder) => {
        setSelectedWorkOrder(workOrder);
    };

    const handleCloseDrawer = () => {
        setSelectedWorkOrder(null);
    };

    const handleUpdateWorkOrder = (updatedWorkOrder: WorkOrder) => {
        updateLocalWorkOrder(updatedWorkOrder);
        setSelectedWorkOrder(updatedWorkOrder);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-[calc(100vh-200px)] w-full gap-4 pb-6">
                {STATUS_ORDER.map((status) => (
                    <div key={status} className="flex-1 min-w-0">
                        <KanbanColumn
                            status={status}
                            workOrders={groupedWorkOrders[status]}
                            onWorkOrderClick={handleWorkOrderClick}
                        />
                    </div>
                ))}
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeWorkOrder ? (
                    <div className="cursor-grabbing rotate-3 scale-105">
                        <WorkOrderCardInner workOrder={activeWorkOrder} />
                    </div>
                ) : null}
            </DragOverlay>

            <WorkOrderDrawer
                workOrder={selectedWorkOrder}
                open={!!selectedWorkOrder}
                onClose={handleCloseDrawer}
                onUpdate={handleUpdateWorkOrder}
            />
        </DndContext>
    );
}
