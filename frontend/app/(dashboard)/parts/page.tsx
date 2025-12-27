"use client";

import { PartHeader } from './components/PartHeader';
import { PartList } from './components/PartList';
import { useParts } from './hooks/useParts';

export default function PartsPage() {
    const { parts, isLoading, deletePart } = useParts();

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this part?')) {
            await deletePart(id);
        }
    };

    return (
        <div className="space-y-6">
            <PartHeader />
            <PartList
                parts={parts}
                isLoading={isLoading}
                onDelete={handleDelete}
            />
        </div>
    );
}
