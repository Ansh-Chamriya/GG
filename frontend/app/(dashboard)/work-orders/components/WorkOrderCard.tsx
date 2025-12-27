import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { WorkOrder } from '../types/workorder.types';

interface WorkOrderCardProps {
    workOrder: WorkOrder;
    isOverlay?: boolean;
    onClick?: () => void;
}

export function WorkOrderCard({ workOrder, isOverlay, onClick }: WorkOrderCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: workOrder.id,
        data: {
            type: 'WorkOrder',
            workOrder,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="h-[140px] w-full rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 opacity-50 dark:border-gray-800 dark:bg-gray-800/20"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="group relative flex cursor-grab flex-col gap-3 touch-none"
            onClick={onClick}
        >
            <WorkOrderCardInner workOrder={workOrder} />
        </div>
    );
}

export function WorkOrderCardInner({ workOrder }: { workOrder: WorkOrder }) {
    const priorityColors = {
        low: 'bg-blue-100/50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
        medium: 'bg-yellow-100/50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
        high: 'bg-orange-100/50 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
        critical: 'bg-red-100/50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="flex flex-col gap-3 rounded-xl border border-gray-200/60 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:border-primary/20 hover:shadow-lg dark:border-gray-800/60 dark:bg-gray-900/80 dark:hover:border-primary/20">
            <div className="flex items-start justify-between gap-2">
                <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium capitalize ${priorityColors[workOrder.priority]}`}
                >
                    {workOrder.priority}
                </span>
                <span className="text-[10px] font-medium text-gray-400 opacity-60 transition-opacity group-hover:opacity-100">
                    {workOrder.id}
                </span>
            </div>

            <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {workOrder.title}
                </h4>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                    {workOrder.description}
                </p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-gray-100/60 pt-3 dark:border-gray-800/60">
                <div className="flex items-center gap-2">
                    {workOrder.assignee ? (
                        <div
                            title={workOrder.assignee.name}
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white dark:from-gray-800 dark:to-gray-900 dark:text-gray-300 dark:ring-gray-950"
                        >
                            {workOrder.assignee.name.charAt(0)}
                        </div>
                    ) : (
                        <div className="h-6 w-6 rounded-full border border-dashed border-gray-300 dark:border-gray-700" />
                    )}
                    {workOrder.assignee && (
                        <span className="text-xs text-gray-500">{workOrder.assignee.name}</span>
                    )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(workOrder.dueDate)}
                </div>
            </div>
        </div>
    );
}
