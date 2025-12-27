'use client';

import React from 'react';
import { WorkOrderHeader } from './components/WorkOrderHeader';
import { WorkOrderKanban } from './components/WorkOrderKanban';

export default function WorkOrdersPage() {
    return (
        <div className="flex h-screen flex-col overflow-hidden bg-white p-6 dark:bg-black">
            <WorkOrderHeader />
            <div className="flex-1 overflow-hidden">
                <WorkOrderKanban />
            </div>
        </div>
    );
}
