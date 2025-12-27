import { EquipmentHeader } from './components/equipment/EquipmentHeader';

export default function Loading() {
    return (
        <div className="space-y-6">
            <EquipmentHeader />
            <div className="grid gap-4 md:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="skeleton h-11 w-full" />
                ))}
            </div>
            <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="skeleton h-16 w-full" />
                ))}
            </div>
        </div>
    );
}
