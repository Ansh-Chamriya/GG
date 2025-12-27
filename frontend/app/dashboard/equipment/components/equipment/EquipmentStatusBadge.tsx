"use client";

import { EquipmentStatus } from "../../types/equipment.types";

const STATUS_CONFIG: Record<
  EquipmentStatus,
  { label: string; className: string }
> = {
  operational: {
    label: "Operational",
    className: "badge-success",
  },
  maintenance: {
    label: "Maintenance",
    className: "badge-warning",
  },
  down: {
    label: "Down",
    className: "badge-danger",
  },
  scrapped: {
    label: "Scrapped",
    className: "badge-neutral",
  },
};

export function EquipmentStatusBadge({ status }: { status: EquipmentStatus }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.scrapped;

  return <span className={`badge ${config.className}`}>{config.label}</span>;
}
