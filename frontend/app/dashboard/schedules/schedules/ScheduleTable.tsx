"use client";

import Link from "next/link";
import { MaintenanceSchedule } from "../types/schedule.types";
import ScheduleStatusBadge from "./ScheduleStatusBadge";
import ScheduleFrequencyTag from "./ScheduleFrequencyTag";
import { Eye, Pencil, Zap, Settings, AlertTriangle } from "lucide-react";
import { PriorityBadge } from "@/app/components/dashboard/shared";

interface ScheduleTableProps {
  schedules: MaintenanceSchedule[];
  onGenerateWorkOrder: (id: string) => void;
}

export default function ScheduleTable({
  schedules,
  onGenerateWorkOrder,
}: ScheduleTableProps) {
  const isOverdue = (dateString: string) => {
    return new Date(dateString) <= new Date();
  };

  const getPriorityFromString = (
    priority: string
  ): "low" | "medium" | "high" | "critical" => {
    if (priority === "critical") return "critical";
    if (priority === "high") return "high";
    if (priority === "medium") return "medium";
    return "low";
  };

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Type</th>
              <th>Frequency</th>
              <th>Next Due</th>
              <th>Priority</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule, index) => {
              const overdue = isOverdue(schedule.nextDue) && schedule.isActive;
              return (
                <tr
                  key={schedule.id}
                  className={`animate-fade-in hover:bg-gray-50 transition-colors ${
                    overdue ? "bg-red-50" : ""
                  }`}
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
                        <span
                          className="font-medium"
                          style={{ color: "var(--foreground)" }}
                        >
                          {schedule.equipmentName || "Unknown Equipment"}
                        </span>
                        <p
                          className="text-xs capitalize"
                          style={{ color: "var(--foreground-muted)" }}
                        >
                          {schedule.type.replace("_", " ")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-neutral capitalize">
                      {schedule.type.replace("_", " ")}
                    </span>
                  </td>
                  <td>
                    <ScheduleFrequencyTag
                      type={schedule.frequencyType}
                      value={schedule.frequencyValue}
                    />
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {overdue && (
                        <AlertTriangle
                          className="w-4 h-4"
                          style={{ color: "var(--danger)" }}
                        />
                      )}
                      <span
                        className={`text-sm ${overdue ? "font-semibold" : ""}`}
                        style={{
                          color: overdue
                            ? "var(--danger)"
                            : "var(--foreground-muted)",
                        }}
                      >
                        {new Date(schedule.nextDue).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <PriorityBadge
                      priority={getPriorityFromString(schedule.priority)}
                    />
                  </td>
                  <td>
                    <ScheduleStatusBadge isActive={schedule.isActive} />
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onGenerateWorkOrder(schedule.id)}
                        className="btn btn-ghost p-2"
                        title="Generate Work Order"
                      >
                        <Zap
                          className="w-4 h-4"
                          style={{ color: "var(--warning)" }}
                        />
                      </button>
                      <Link
                        href={`/dashboard/schedules/${schedule.id}`}
                        className="btn btn-ghost p-2"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        href={`/dashboard/schedules/${schedule.id}/edit`}
                        className="btn btn-ghost p-2"
                        title="Edit Schedule"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
