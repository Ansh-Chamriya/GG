import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { WorkOrder } from '../../types/workorder.types';
import { WorkOrderDrawerHeader } from './WorkOrderDrawerHeader';
import { WorkOrderDrawerOverview } from './WorkOrderDrawerOverview';
import { WorkOrderDrawerActions } from './WorkOrderDrawerActions';
import { WorkOrderDrawerTasks } from './WorkOrderDrawerTasks';
import { WorkOrderDrawerComments } from './WorkOrderDrawerComments';

interface WorkOrderDrawerProps {
    workOrder: WorkOrder | null;
    open: boolean;
    onClose: () => void;
    onUpdate: (updatedWorkOrder: WorkOrder) => void;
}

export function WorkOrderDrawer({ workOrder, open, onClose, onUpdate }: WorkOrderDrawerProps) {
    if (!workOrder) return null;

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500/75 transition-opacity backdrop-blur-sm dark:bg-gray-900/80" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl dark:divide-gray-800 dark:bg-gray-950">

                                        <WorkOrderDrawerHeader
                                            workOrder={workOrder}
                                            onClose={onClose}
                                        />

                                        <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                                            <div className="px-4 sm:px-6">
                                                <WorkOrderDrawerOverview workOrder={workOrder} />
                                            </div>
                                            <div className="relative mt-6 flex-1 px-4 sm:px-6">
                                                <div className="flex flex-col gap-8">
                                                    <WorkOrderDrawerTasks
                                                        workOrder={workOrder}
                                                        onUpdate={onUpdate}
                                                    />
                                                    <WorkOrderDrawerComments
                                                        workOrder={workOrder}
                                                        onUpdate={onUpdate}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-shrink-0 justify-end px-4 py-4">
                                            <WorkOrderDrawerActions
                                                workOrder={workOrder}
                                                onUpdate={onUpdate}
                                                onClose={onClose}
                                            />
                                        </div>

                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
