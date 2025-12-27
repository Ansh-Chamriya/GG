import { EquipmentStatus } from '../../types/equipment.types';
import { clsx } from 'clsx'; // Assuming clsx is available or valid in standard react env, if not standard string interpolation will be used, but since we use tailwind, conditional classes are common. I will use standard template literals to be safe.

const STATUS_CONFIG: Record<EquipmentStatus, { label: string; className: string }> = {
    operational: {
        label: 'Operational',
        className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
    },
    maintenance: {
        label: 'Maintenance',
        className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
    },
    down: {
        label: 'Down',
        className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
    },
    scrapped: {
        label: 'Scrapped',
        className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
    }
};

export function EquipmentStatusBadge({ status }: { status: EquipmentStatus }) {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.scrapped;

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    );
}
