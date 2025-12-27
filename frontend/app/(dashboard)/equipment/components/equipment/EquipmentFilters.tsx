import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Category } from '../../types/category.types';
import { Location } from '../../types/location.types';

interface EquipmentFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    location: string;
    onLocationChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    categories: Category[];
    locations: Location[];
}

export function EquipmentFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    location,
    onLocationChange,
    status,
    onStatusChange,
    categories,
    locations
}: EquipmentFiltersProps) {
    return (
        <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    className="input pl-10 w-full"
                    placeholder="Search by name or serial..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Category Filter */}
            <select
                className="input w-full"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">All Categories</option>
                {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                        {c.name}
                    </option>
                ))}
            </select>

            {/* Location Filter */}
            <select
                className="input w-full"
                value={location}
                onChange={(e) => onLocationChange(e.target.value)}
            >
                <option value="">All Locations</option>
                {locations.map((l) => (
                    <option key={l.id} value={l.id}>
                        {l.name}
                    </option>
                ))}
            </select>

            {/* Status Filter */}
            <select
                className="input w-full"
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
            >
                <option value="">All Statuses</option>
                <option value="operational">Operational</option>
                <option value="maintenance">Maintenance</option>
                <option value="down">Down</option>
                <option value="scrapped">Scrapped</option>
            </select>
        </div>
    );
}
