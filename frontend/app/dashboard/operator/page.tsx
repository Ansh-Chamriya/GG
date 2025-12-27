"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  DashboardLayout,
  SectionHeader,
  EmptyState,
  SkeletonTable,
} from "@/app/components/dashboard/shared";
import { equipmentService, workorderService } from "@/app/lib/api/services";
import { Equipment, WorkOrder, EquipmentStatus } from "@/app/lib/api/config";
import {
  Settings,
  AlertTriangle,
  Clock,
  RefreshCw,
  MapPin,
  AlertCircle,
  Search,
  Plus,
  CheckCircle2,
  Wrench,
  Send,
} from "lucide-react";

// ============ HOOKS ============
function useEquipment() {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEquipment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await equipmentService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : (response.data as unknown as { items: Equipment[] }).items || [];
        setEquipment(items);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch equipment"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return { equipment, isLoading, error, refetch: fetchEquipment };
}

function useMyWorkOrders() {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkOrders = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await workorderService.list();
      if (response.success && response.data) {
        const items = Array.isArray(response.data)
          ? response.data
          : (response.data as unknown as { items: WorkOrder[] }).items || [];
        setWorkOrders(items);
      }
    } catch (err) {
      console.error("Failed to fetch work orders:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkOrders();
  }, [fetchWorkOrders]);

  return { workOrders, isLoading, refetch: fetchWorkOrders };
}

// ============ COMPONENTS ============
function ReportIssueModal({
  isOpen,
  onClose,
  equipment,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  onSubmit: (data: { description: string; priority: string }) => Promise<void>;
}) {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({ description, priority });
      setDescription("");
      setPriority("medium");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !equipment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div
        className="relative w-full max-w-md rounded-2xl p-6 animate-scale-in"
        style={{
          background: "var(--background)",
          boxShadow: "var(--shadow-xl)",
        }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          Report Issue
        </h2>
        <p
          className="text-sm mb-4"
          style={{ color: "var(--foreground-muted)" }}
        >
          Equipment: <strong>{equipment.name}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full mt-1 p-3 rounded-lg text-sm resize-none"
              style={{
                border: "1px solid var(--border)",
                background: "var(--background)",
              }}
              placeholder="Describe the issue..."
              required
            />
          </div>

          <div>
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full mt-1 h-10 px-3 rounded-lg text-sm"
              style={{
                border: "1px solid var(--border)",
                background: "var(--background)",
              }}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-lg font-medium"
              style={{
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !description.trim()}
              className="flex-1 py-2.5 rounded-lg font-medium text-white flex items-center justify-center gap-2"
              style={{ background: "var(--primary)" }}
            >
              {isSubmitting ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EquipmentGrid({
  equipment,
  isLoading,
  error,
  onRefresh,
  onReportIssue,
}: {
  equipment: Equipment[];
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
  onReportIssue: (eq: Equipment) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = equipment.filter(
    (eq) =>
      eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eq.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: EquipmentStatus) => {
    switch (status) {
      case "operational":
        return { bg: "var(--success-light)", text: "var(--success)" };
      case "maintenance":
        return { bg: "var(--warning-light)", text: "var(--warning)" };
      case "breakdown":
        return { bg: "var(--danger-light)", text: "var(--danger)" };
      default:
        return {
          bg: "var(--background-secondary)",
          text: "var(--foreground-muted)",
        };
    }
  };

  if (error) {
    return (
      <div className="card p-8">
        <EmptyState
          icon={
            <AlertCircle
              className="w-8 h-8"
              style={{ color: "var(--danger)" }}
            />
          }
          title="Failed to load equipment"
          description={error}
          action={
            <button onClick={onRefresh} className="btn btn-primary text-sm">
              <RefreshCw className="w-4 h-4" /> Retry
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <SectionHeader
          title="Equipment"
          subtitle="View equipment status and report issues"
        />
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: "var(--background)",
              border: "1px solid var(--border)",
            }}
          >
            <Search
              className="w-4 h-4"
              style={{ color: "var(--foreground-muted)" }}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-40"
            />
          </div>
          <button
            onClick={onRefresh}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card h-40 rounded-xl" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-8">
          <EmptyState
            icon={<Settings className="w-8 h-8" />}
            title="No equipment found"
            description={
              searchQuery
                ? "Try adjusting your search"
                : "No equipment available"
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((eq, index) => {
            const statusStyle = getStatusColor(eq.status);
            return (
              <div
                key={eq.id}
                className="card p-4 animate-fade-in hover:shadow-md transition-all"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ background: "var(--primary-100)" }}
                  >
                    <Settings
                      className="w-6 h-6"
                      style={{ color: "var(--primary)" }}
                    />
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-medium capitalize"
                    style={{
                      background: statusStyle.bg,
                      color: statusStyle.text,
                    }}
                  >
                    {eq.status}
                  </span>
                </div>

                <h4
                  className="font-semibold mb-1"
                  style={{ color: "var(--foreground)" }}
                >
                  {eq.name}
                </h4>
                {eq.code && (
                  <p
                    className="text-xs font-mono mb-2"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {eq.code}
                  </p>
                )}

                {eq.location && (
                  <div className="flex items-center gap-1.5 mb-3">
                    <MapPin
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--foreground-muted)" }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {eq.location.name}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => onReportIssue(eq)}
                  disabled={eq.status === "retired"}
                  className="w-full py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors hover:opacity-90 disabled:opacity-50"
                  style={{
                    background: "var(--danger-light)",
                    color: "var(--danger)",
                  }}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Report Issue
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function MyRequests({
  workOrders,
  isLoading,
}: {
  workOrders: WorkOrder[];
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="card p-4">
        <SectionHeader title="My Requests" />
        <div className="space-y-3 mt-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card h-16 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (workOrders.length === 0) {
    return (
      <div className="card p-4">
        <SectionHeader title="My Requests" />
        <div className="mt-4">
          <EmptyState
            icon={<AlertTriangle className="w-8 h-8" />}
            title="No requests"
            description="Report an issue to create a request"
          />
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <CheckCircle2
            className="w-4 h-4"
            style={{ color: "var(--success)" }}
          />
        );
      case "in_progress":
        return (
          <Wrench className="w-4 h-4" style={{ color: "var(--warning)" }} />
        );
      default:
        return (
          <Clock className="w-4 h-4" style={{ color: "var(--primary)" }} />
        );
    }
  };

  return (
    <div className="card p-4">
      <SectionHeader title="My Requests" />
      <div className="space-y-3 mt-4">
        {workOrders.slice(0, 5).map((wo, index) => (
          <div
            key={wo.id}
            className="flex items-center gap-3 p-3 rounded-xl animate-fade-in"
            style={{
              background: "var(--background-secondary)",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "var(--background)" }}
            >
              {getStatusIcon(wo.status)}
            </div>
            <div className="flex-1 min-w-0">
              <span
                className="font-medium text-sm block truncate"
                style={{ color: "var(--foreground)" }}
              >
                {wo.title}
              </span>
              <span
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {wo.work_order_number}
              </span>
            </div>
            <span
              className="px-2 py-1 rounded-full text-xs font-medium capitalize"
              style={{
                background:
                  wo.status === "completed"
                    ? "var(--success-light)"
                    : wo.status === "in_progress"
                    ? "var(--warning-light)"
                    : "var(--primary-100)",
                color:
                  wo.status === "completed"
                    ? "var(--success)"
                    : wo.status === "in_progress"
                    ? "var(--warning)"
                    : "var(--primary)",
              }}
            >
              {wo.status.replace("_", " ")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function OperatorDashboard() {
  const {
    equipment,
    isLoading: eqLoading,
    error: eqError,
    refetch: refetchEquipment,
  } = useEquipment();
  const {
    workOrders,
    isLoading: woLoading,
    refetch: refetchWO,
  } = useMyWorkOrders();

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(
    null
  );

  const handleReportIssue = (eq: Equipment) => {
    setSelectedEquipment(eq);
    setReportModalOpen(true);
  };

  const handleSubmitIssue = async (data: {
    description: string;
    priority: string;
  }) => {
    if (!selectedEquipment) return;

    try {
      await equipmentService.reportIssue(selectedEquipment.id, {
        title: `Issue with ${selectedEquipment.name}`,
        description: data.description,
        priority: data.priority as "low" | "medium" | "high" | "critical",
      });
      refetchWO();
    } catch (err) {
      console.error("Failed to report issue:", err);
      throw err;
    }
  };

  const stats = {
    totalEquipment: equipment.length,
    operational: equipment.filter((e) => e.status === "operational").length,
    issues: equipment.filter(
      (e) => e.status === "breakdown" || e.status === "maintenance"
    ).length,
    myRequests: workOrders.length,
  };

  return (
    <DashboardLayout
      title="Operator Dashboard"
      notificationCount={stats.issues}
    >
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="card p-4">
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
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.totalEquipment}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Total Equipment
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--success-light)" }}
            >
              <CheckCircle2
                className="w-5 h-5"
                style={{ color: "var(--success)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.operational}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Operational
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--danger-light)" }}
            >
              <AlertTriangle
                className="w-5 h-5"
                style={{ color: "var(--danger)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.issues}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                Issues
              </p>
            </div>
          </div>
        </div>
        <div className="card p-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ background: "var(--info-light)" }}
            >
              <Clock className="w-5 h-5" style={{ color: "var(--info)" }} />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {stats.myRequests}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                My Requests
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <EquipmentGrid
            equipment={equipment}
            isLoading={eqLoading}
            error={eqError}
            onRefresh={refetchEquipment}
            onReportIssue={handleReportIssue}
          />
        </div>
        <div>
          <MyRequests workOrders={workOrders} isLoading={woLoading} />
        </div>
      </div>

      {/* Report Modal */}
      <ReportIssueModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        equipment={selectedEquipment}
        onSubmit={handleSubmitIssue}
      />
    </DashboardLayout>
  );
}
