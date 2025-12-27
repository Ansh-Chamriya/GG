"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ApiResponse,
  DashboardData,
  Equipment,
  WorkOrder,
  MaintenanceSchedule,
  Part,
  Team,
  Notification,
} from "@/app/lib/api/config";
import {
  reportService,
  equipmentService,
  workorderService,
  scheduleService,
  partsService,
  teamService,
  notificationService,
} from "@/app/lib/api/services";

// ============ GENERIC API DATA HOOK ============
export function useApiData<T>(
  fetchFn: () => Promise<ApiResponse<T>>,
  deps: unknown[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchFn();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ DASHBOARD DATA HOOK ============
export function useDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await reportService.getDashboard();
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch dashboard data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ EQUIPMENT HOOKS ============
export function useEquipmentList(params?: {
  status?: string;
  category_id?: string;
  location_id?: string;
  criticality?: string;
}) {
  const [data, setData] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await equipmentService.list(params);
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch equipment");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useEquipment(id: string) {
  const [data, setData] = useState<Equipment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await equipmentService.get(id);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch equipment details");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ WORK ORDER HOOKS ============
export function useWorkOrderList(params?: {
  status?: string;
  priority?: string;
  type?: string;
  assigned_to?: string;
  equipment_id?: string;
}) {
  const [data, setData] = useState<WorkOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await workorderService.list(params);
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch work orders");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useWorkOrder(id: string) {
  const [data, setData] = useState<WorkOrder | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      setError(null);
      const response = await workorderService.get(id);
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || "Failed to fetch work order details");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ SCHEDULE HOOKS ============
export function useScheduleList(params?: {
  equipment_id?: string;
  is_active?: boolean;
}) {
  const [data, setData] = useState<MaintenanceSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await scheduleService.list(params);
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch schedules");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useUpcomingMaintenance(days?: number) {
  const [data, setData] = useState<MaintenanceSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await scheduleService.getUpcoming(days);
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch upcoming maintenance");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useOverdueMaintenance() {
  const [data, setData] = useState<MaintenanceSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await scheduleService.getOverdue();
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch overdue maintenance");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ PARTS HOOKS ============
export function usePartsList(params?: {
  category?: string;
  location_id?: string;
  low_stock?: boolean;
}) {
  const [data, setData] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partsService.list(params);
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch parts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

export function useLowStockParts() {
  const [data, setData] = useState<Part[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await partsService.getLowStock();
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch low stock parts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ TEAM HOOKS ============
export function useTeamList() {
  const [data, setData] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await teamService.list();
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch teams");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, error, refetch: fetchData };
}

// ============ NOTIFICATION HOOKS ============
export function useNotifications(unreadOnly?: boolean) {
  const [data, setData] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await notificationService.list({
        unread_only: unreadOnly,
      });
      if (response.success) {
        setData(response.data || []);
      } else {
        setError(response.error || "Failed to fetch notifications");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [unreadOnly]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const markAsRead = async (id: string) => {
    await notificationService.markRead(id);
    fetchData();
  };

  const markAllAsRead = async () => {
    await notificationService.markAllRead();
    fetchData();
  };

  return {
    data,
    isLoading,
    error,
    refetch: fetchData,
    markAsRead,
    markAllAsRead,
    unreadCount: data.filter((n) => !n.is_read).length,
  };
}

// ============ INTERVAL REFRESH HOOK ============
export function useRefreshInterval(
  refetchFn: () => void,
  intervalMs: number = 30000
) {
  useEffect(() => {
    const interval = setInterval(refetchFn, intervalMs);
    return () => clearInterval(interval);
  }, [refetchFn, intervalMs]);
}
