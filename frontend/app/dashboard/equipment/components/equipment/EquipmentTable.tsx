"use client";

import Link from "next/link";
import { Equipment } from "../../types/equipment.types";
import { EquipmentStatusBadge } from "./EquipmentStatusBadge";
import { EquipmentEmpty } from "./EquipmentEmpty";
import {
  Eye,
  Pencil,
  Settings,
  MapPin,
  Tag,
  MoreHorizontal,
} from "lucide-react";
import { SkeletonTable } from "@/app/components/dashboard/shared";

interface EquipmentTableProps {
  equipment: Equipment[];
  isLoading: boolean;
}

export function EquipmentTable({ equipment, isLoading }: EquipmentTableProps) {
  if (isLoading) {
    return <SkeletonTable rows={5} />;
  }

  if (equipment.length === 0) {
    return <EquipmentEmpty />;
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Serial Number</th>
              <th>Category</th>
              <th>Location</th>
              <th>Status</th>
              <th>Health</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((item, index) => (
              <tr
                key={item.id}
                className="animate-fade-in hover:bg-gray-50 transition-colors"
                style={{ animationDelay: `${index * 0.03}s` }}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: "var(--primary-100)" }}
                    >
                      <Settings
                        className="w-5 h-5"
                        style={{ color: "var(--primary)" }}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/dashboard/equipment/${item.id}`}
                        className="font-medium hover:underline"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.name}
                      </Link>
                      {item.model && (
                        <p
                          className="text-xs"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {item.model}
                        </p>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {item.serialNumber || "—"}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <Tag
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--foreground-muted)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {item.categoryName || "—"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <MapPin
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--foreground-muted)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {item.locationName || "—"}
                    </span>
                  </div>
                </td>
                <td>
                  <EquipmentStatusBadge status={item.status} />
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-16 h-2 rounded-full overflow-hidden"
                      style={{ background: "var(--background-tertiary)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.healthScore || 0}%`,
                          background:
                            (item.healthScore || 0) >= 80
                              ? "var(--success)"
                              : (item.healthScore || 0) >= 50
                              ? "var(--warning)"
                              : "var(--danger)",
                        }}
                      />
                    </div>
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.healthScore || 0}%
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/dashboard/equipment/${item.id}`}
                      className="btn btn-ghost p-2"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <Link
                      href={`/dashboard/equipment/${item.id}/edit`}
                      className="btn btn-ghost p-2"
                      title="Edit Equipment"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button className="btn btn-ghost p-2">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
