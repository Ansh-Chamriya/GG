"use client";

import { Search, Filter, X } from "lucide-react";
import { Category } from "../../types/category.types";
import { Location } from "../../types/location.types";

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
  locations,
}: EquipmentFiltersProps) {
  const hasFilters = category || location || status;

  const clearFilters = () => {
    onCategoryChange("");
    onLocationChange("");
    onStatusChange("");
  };

  return (
    <div className="card p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4">
        {/* Search */}
        <div className="flex-1">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{ background: "var(--background-secondary)" }}
          >
            <Search
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none text-sm"
              placeholder="Search by name or serial number..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ color: "var(--foreground)" }}
            />
            {search && (
              <button
                onClick={() => onSearchChange("")}
                className="p-1 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X
                  className="w-3 h-3"
                  style={{ color: "var(--foreground-muted)" }}
                />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
            <span
              className="text-sm font-medium hidden sm:inline"
              style={{ color: "var(--foreground-muted)" }}
            >
              Filters:
            </span>
          </div>

          {/* Category Filter */}
          <select
            className="filter-select"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              background: "var(--background-secondary)",
              border: "none",
              color: "var(--foreground)",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
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
            className="filter-select"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              background: "var(--background-secondary)",
              border: "none",
              color: "var(--foreground)",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
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
            className="filter-select"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              background: "var(--background-secondary)",
              border: "none",
              color: "var(--foreground)",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            <option value="">All Statuses</option>
            <option value="operational">Operational</option>
            <option value="maintenance">Maintenance</option>
            <option value="down">Down</option>
            <option value="scrapped">Scrapped</option>
          </select>

          {/* Clear Filters */}
          {hasFilters && (
            <button
              onClick={clearFilters}
              className="btn btn-ghost text-sm"
              style={{ color: "var(--primary)" }}
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
