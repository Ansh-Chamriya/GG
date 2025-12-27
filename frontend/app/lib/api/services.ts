import { apiClient } from "./client";
import {
  API_ENDPOINTS,
  // Auth
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
  // Organization
  Organization,
  OrganizationStats,
  // Location
  Location,
  // Equipment
  Equipment,
  EquipmentCategory,
  MeterReading,
  CreateEquipmentPayload,
  ReportIssuePayload,
  AddMeterReadingPayload,
  // Schedule
  MaintenanceSchedule,
  CreateSchedulePayload,
  // Work Order
  WorkOrder,
  WorkOrderTask,
  WorkOrderComment,
  WorkOrderChecklist,
  CreateWorkOrderPayload,
  UpdateWorkOrderStatusPayload,
  AssignWorkOrderPayload,
  CompleteWorkOrderPayload,
  // Team
  Team,
  TeamMember,
  // Parts
  Part,
  PartUsage,
  AdjustStockPayload,
  // Checklist
  ChecklistTemplate,
  // Notification
  Notification,
  // Reports
  DashboardData,
  // Maintenance History
  MaintenanceHistory,
  // Audit
  AuditLog,
} from "./config";

// ============ AUTH SERVICES ============
export const authService = {
  register: (data: RegisterRequest) =>
    apiClient.post<LoginResponse, RegisterRequest>(
      API_ENDPOINTS.auth.register,
      data
    ),

  login: (credentials: LoginRequest) =>
    apiClient.post<LoginResponse, LoginRequest>(
      API_ENDPOINTS.auth.login,
      credentials
    ),

  logout: () => apiClient.post(API_ENDPOINTS.auth.logout),

  refresh: (data: RefreshTokenRequest) =>
    apiClient.post<RefreshTokenResponse, RefreshTokenRequest>(
      API_ENDPOINTS.auth.refresh,
      data
    ),

  forgotPassword: (email: string) =>
    apiClient.post(API_ENDPOINTS.auth.forgotPassword, { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post(API_ENDPOINTS.auth.resetPassword, { token, password }),

  verifyEmail: (token: string) =>
    apiClient.get(API_ENDPOINTS.auth.verifyEmail, { token }),

  getMe: () => apiClient.get<User>(API_ENDPOINTS.auth.me),

  updateMe: (data: Partial<User>) =>
    apiClient.put<User>(API_ENDPOINTS.auth.updateMe, data),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.put(API_ENDPOINTS.auth.changePassword, {
      current_password: currentPassword,
      new_password: newPassword,
    }),
};

// ============ ORGANIZATION SERVICES ============
export const organizationService = {
  list: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Organization[]>(API_ENDPOINTS.organizations.list),

  create: (data: Partial<Organization>) =>
    apiClient.post<Organization>(API_ENDPOINTS.organizations.create, data),

  get: (id: string) =>
    apiClient.get<Organization>(API_ENDPOINTS.organizations.get, { id }),

  update: (id: string, data: Partial<Organization>) =>
    apiClient.put<Organization>(API_ENDPOINTS.organizations.update, data, {
      id,
    }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.organizations.delete, { id }),

  getStats: (id: string) =>
    apiClient.get<OrganizationStats>(API_ENDPOINTS.organizations.stats, { id }),
};

// ============ USER SERVICES ============
export const userService = {
  list: (params?: { page?: number; limit?: number; role?: string }) =>
    apiClient.get<User[]>(API_ENDPOINTS.users.list),

  create: (data: RegisterRequest) =>
    apiClient.post<User>(API_ENDPOINTS.users.create, data),

  get: (id: string) => apiClient.get<User>(API_ENDPOINTS.users.get, { id }),

  update: (id: string, data: Partial<User>) =>
    apiClient.put<User>(API_ENDPOINTS.users.update, data, { id }),

  delete: (id: string) => apiClient.delete(API_ENDPOINTS.users.delete, { id }),

  changeRole: (id: string, roleId: string) =>
    apiClient.put(API_ENDPOINTS.users.changeRole, { role_id: roleId }, { id }),

  getWorkorders: (id: string) =>
    apiClient.get<WorkOrder[]>(API_ENDPOINTS.users.workorders, { id }),

  getActivity: (id: string) =>
    apiClient.get<AuditLog[]>(API_ENDPOINTS.users.activity, { id }),
};

// ============ LOCATION SERVICES ============
export const locationService = {
  list: (params?: { type?: string }) =>
    apiClient.get<Location[]>(API_ENDPOINTS.locations.list),

  create: (data: Partial<Location>) =>
    apiClient.post<Location>(API_ENDPOINTS.locations.create, data),

  get: (id: string) =>
    apiClient.get<Location>(API_ENDPOINTS.locations.get, { id }),

  update: (id: string, data: Partial<Location>) =>
    apiClient.put<Location>(API_ENDPOINTS.locations.update, data, { id }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.locations.delete, { id }),

  getEquipment: (id: string) =>
    apiClient.get<Equipment[]>(API_ENDPOINTS.locations.equipment, { id }),
};

// ============ EQUIPMENT SERVICES ============
export const equipmentService = {
  list: (params?: {
    status?: string;
    category_id?: string;
    location_id?: string;
    criticality?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get<Equipment[]>(API_ENDPOINTS.equipment.list),

  create: (data: CreateEquipmentPayload) =>
    apiClient.post<Equipment>(API_ENDPOINTS.equipment.create, data),

  get: (id: string) =>
    apiClient.get<Equipment>(API_ENDPOINTS.equipment.get, { id }),

  update: (id: string, data: Partial<Equipment>) =>
    apiClient.put<Equipment>(API_ENDPOINTS.equipment.update, data, { id }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.equipment.delete, { id }),

  getHistory: (id: string) =>
    apiClient.get<MaintenanceHistory[]>(API_ENDPOINTS.equipment.history, {
      id,
    }),

  getWorkorders: (id: string) =>
    apiClient.get<WorkOrder[]>(API_ENDPOINTS.equipment.workorders, { id }),

  getSchedules: (id: string) =>
    apiClient.get<MaintenanceSchedule[]>(API_ENDPOINTS.equipment.schedules, {
      id,
    }),

  getParts: (id: string) =>
    apiClient.get<Part[]>(API_ENDPOINTS.equipment.parts, { id }),

  addMeterReading: (id: string, data: AddMeterReadingPayload) =>
    apiClient.post<MeterReading>(
      API_ENDPOINTS.equipment.addMeterReading,
      data,
      { id }
    ),

  getMeterReadings: (id: string) =>
    apiClient.get<MeterReading[]>(API_ENDPOINTS.equipment.meterReadings, {
      id,
    }),

  reportIssue: (id: string, data: ReportIssuePayload) =>
    apiClient.post<WorkOrder>(API_ENDPOINTS.equipment.reportIssue, data, {
      id,
    }),

  getQrCode: (id: string) =>
    apiClient.get<{ qr_code_url: string }>(API_ENDPOINTS.equipment.qrCode, {
      id,
    }),
};

// ============ CATEGORY SERVICES ============
export const categoryService = {
  list: () => apiClient.get<EquipmentCategory[]>(API_ENDPOINTS.categories.list),

  create: (data: Partial<EquipmentCategory>) =>
    apiClient.post<EquipmentCategory>(API_ENDPOINTS.categories.create, data),

  get: (id: string) =>
    apiClient.get<EquipmentCategory>(API_ENDPOINTS.categories.get, { id }),

  update: (id: string, data: Partial<EquipmentCategory>) =>
    apiClient.put<EquipmentCategory>(API_ENDPOINTS.categories.update, data, {
      id,
    }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.categories.delete, { id }),
};

// ============ SCHEDULE SERVICES ============
export const scheduleService = {
  list: (params?: { equipment_id?: string; is_active?: boolean }) =>
    apiClient.get<MaintenanceSchedule[]>(API_ENDPOINTS.schedules.list),

  create: (data: CreateSchedulePayload) =>
    apiClient.post<MaintenanceSchedule>(API_ENDPOINTS.schedules.create, data),

  get: (id: string) =>
    apiClient.get<MaintenanceSchedule>(API_ENDPOINTS.schedules.get, { id }),

  update: (id: string, data: Partial<MaintenanceSchedule>) =>
    apiClient.put<MaintenanceSchedule>(API_ENDPOINTS.schedules.update, data, {
      id,
    }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.schedules.delete, { id }),

  generateWorkorder: (id: string) =>
    apiClient.post<WorkOrder>(
      API_ENDPOINTS.schedules.generateWorkorder,
      undefined,
      { id }
    ),

  getUpcoming: (days?: number) =>
    apiClient.get<MaintenanceSchedule[]>(API_ENDPOINTS.schedules.upcoming),

  getOverdue: () =>
    apiClient.get<MaintenanceSchedule[]>(API_ENDPOINTS.schedules.overdue),
};

// ============ WORK ORDER SERVICES ============
export const workorderService = {
  list: (params?: {
    status?: string;
    priority?: string;
    type?: string;
    assigned_to?: string;
    equipment_id?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get<WorkOrder[]>(API_ENDPOINTS.workorders.list),

  create: (data: CreateWorkOrderPayload) =>
    apiClient.post<WorkOrder>(API_ENDPOINTS.workorders.create, data),

  get: (id: string) =>
    apiClient.get<WorkOrder>(API_ENDPOINTS.workorders.get, { id }),

  update: (id: string, data: Partial<WorkOrder>) =>
    apiClient.put<WorkOrder>(API_ENDPOINTS.workorders.update, data, { id }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.workorders.delete, { id }),

  updateStatus: (id: string, data: UpdateWorkOrderStatusPayload) =>
    apiClient.put<WorkOrder>(API_ENDPOINTS.workorders.updateStatus, data, {
      id,
    }),

  assign: (id: string, data: AssignWorkOrderPayload) =>
    apiClient.put<WorkOrder>(API_ENDPOINTS.workorders.assign, data, { id }),

  start: (id: string) =>
    apiClient.post<WorkOrder>(API_ENDPOINTS.workorders.start, undefined, {
      id,
    }),

  complete: (id: string, data?: CompleteWorkOrderPayload) =>
    apiClient.post<WorkOrder>(API_ENDPOINTS.workorders.complete, data, { id }),

  hold: (id: string, reason?: string) =>
    apiClient.post<WorkOrder>(
      API_ENDPOINTS.workorders.hold,
      { reason },
      { id }
    ),

  cancel: (id: string, reason?: string) =>
    apiClient.post<WorkOrder>(
      API_ENDPOINTS.workorders.cancel,
      { reason },
      { id }
    ),

  // Tasks
  getTasks: (id: string) =>
    apiClient.get<WorkOrderTask[]>(API_ENDPOINTS.workorders.tasks, { id }),

  updateTask: (id: string, taskId: string, data: Partial<WorkOrderTask>) =>
    apiClient.put<WorkOrderTask>(API_ENDPOINTS.workorders.updateTask, data, {
      id,
      taskId,
    }),

  // Comments
  getComments: (id: string) =>
    apiClient.get<WorkOrderComment[]>(API_ENDPOINTS.workorders.comments, {
      id,
    }),

  addComment: (id: string, comment: string, isInternal?: boolean) =>
    apiClient.post<WorkOrderComment>(
      API_ENDPOINTS.workorders.addComment,
      {
        comment,
        is_internal: isInternal,
      },
      { id }
    ),

  // Parts
  addParts: (id: string, parts: { part_id: string; quantity: number }[]) =>
    apiClient.post<PartUsage[]>(
      API_ENDPOINTS.workorders.addParts,
      { parts },
      { id }
    ),

  // Checklist
  getChecklist: (id: string) =>
    apiClient.get<WorkOrderChecklist>(API_ENDPOINTS.workorders.checklist, {
      id,
    }),

  updateChecklist: (id: string, responses: WorkOrderChecklist["responses"]) =>
    apiClient.put<WorkOrderChecklist>(
      API_ENDPOINTS.workorders.checklist,
      { responses },
      { id }
    ),
};

// ============ TEAM SERVICES ============
export const teamService = {
  list: () => apiClient.get<Team[]>(API_ENDPOINTS.teams.list),

  create: (data: Partial<Team>) =>
    apiClient.post<Team>(API_ENDPOINTS.teams.create, data),

  get: (id: string) => apiClient.get<Team>(API_ENDPOINTS.teams.get, { id }),

  update: (id: string, data: Partial<Team>) =>
    apiClient.put<Team>(API_ENDPOINTS.teams.update, data, { id }),

  delete: (id: string) => apiClient.delete(API_ENDPOINTS.teams.delete, { id }),

  addMember: (id: string, userId: string, role?: "leader" | "member") =>
    apiClient.post<TeamMember>(
      API_ENDPOINTS.teams.addMember,
      { user_id: userId, role },
      { id }
    ),

  removeMember: (id: string, userId: string) =>
    apiClient.delete(API_ENDPOINTS.teams.removeMember, { id, userId }),

  getWorkorders: (id: string) =>
    apiClient.get<WorkOrder[]>(API_ENDPOINTS.teams.workorders, { id }),
};

// ============ PARTS SERVICES ============
export const partsService = {
  list: (params?: {
    category?: string;
    location_id?: string;
    low_stock?: boolean;
    page?: number;
    limit?: number;
  }) => apiClient.get<Part[]>(API_ENDPOINTS.parts.list),

  create: (data: Partial<Part>) =>
    apiClient.post<Part>(API_ENDPOINTS.parts.create, data),

  get: (id: string) => apiClient.get<Part>(API_ENDPOINTS.parts.get, { id }),

  update: (id: string, data: Partial<Part>) =>
    apiClient.put<Part>(API_ENDPOINTS.parts.update, data, { id }),

  delete: (id: string) => apiClient.delete(API_ENDPOINTS.parts.delete, { id }),

  adjustStock: (id: string, data: AdjustStockPayload) =>
    apiClient.post<Part>(API_ENDPOINTS.parts.adjustStock, data, { id }),

  getUsageHistory: (id: string) =>
    apiClient.get<PartUsage[]>(API_ENDPOINTS.parts.usageHistory, { id }),

  getLowStock: () => apiClient.get<Part[]>(API_ENDPOINTS.parts.lowStock),

  linkEquipment: (id: string, equipmentId: string, quantityRequired?: number) =>
    apiClient.post(
      API_ENDPOINTS.parts.linkEquipment,
      {
        equipment_id: equipmentId,
        quantity_required: quantityRequired,
      },
      { id }
    ),
};

// ============ CHECKLIST SERVICES ============
export const checklistService = {
  list: (params?: { category?: string }) =>
    apiClient.get<ChecklistTemplate[]>(API_ENDPOINTS.checklists.list),

  create: (data: Partial<ChecklistTemplate>) =>
    apiClient.post<ChecklistTemplate>(API_ENDPOINTS.checklists.create, data),

  get: (id: string) =>
    apiClient.get<ChecklistTemplate>(API_ENDPOINTS.checklists.get, { id }),

  update: (id: string, data: Partial<ChecklistTemplate>) =>
    apiClient.put<ChecklistTemplate>(API_ENDPOINTS.checklists.update, data, {
      id,
    }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.checklists.delete, { id }),
};

// ============ NOTIFICATION SERVICES ============
export const notificationService = {
  list: (params?: { unread_only?: boolean }) =>
    apiClient.get<Notification[]>(API_ENDPOINTS.notifications.list),

  markRead: (id: string) =>
    apiClient.put(API_ENDPOINTS.notifications.markRead, undefined, { id }),

  markAllRead: () => apiClient.put(API_ENDPOINTS.notifications.markAllRead),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.notifications.delete, { id }),

  getSettings: () => apiClient.get(API_ENDPOINTS.notifications.settings),

  updateSettings: (settings: Record<string, boolean>) =>
    apiClient.put(API_ENDPOINTS.notifications.settings, settings),
};

// ============ REPORT SERVICES ============
export const reportService = {
  getDashboard: () =>
    apiClient.get<DashboardData>(API_ENDPOINTS.reports.dashboard),

  getEquipmentHealth: (params?: {
    location_id?: string;
    category_id?: string;
  }) => apiClient.get(API_ENDPOINTS.reports.equipmentHealth),

  getWorkorderSummary: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.reports.workorderSummary),

  getMaintenanceCosts: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.reports.maintenanceCosts),

  getTechnicianPerformance: (params?: { team_id?: string }) =>
    apiClient.get(API_ENDPOINTS.reports.technicianPerformance),

  getDowntime: (params?: {
    equipment_id?: string;
    start_date?: string;
    end_date?: string;
  }) => apiClient.get(API_ENDPOINTS.reports.downtime),

  getPartsUsage: (params?: { start_date?: string; end_date?: string }) =>
    apiClient.get(API_ENDPOINTS.reports.partsUsage),

  generateCustom: (config: Record<string, unknown>) =>
    apiClient.post(API_ENDPOINTS.reports.custom, config),

  getSaved: () => apiClient.get(API_ENDPOINTS.reports.saved),

  saveReport: (report: {
    name: string;
    type: string;
    parameters: Record<string, unknown>;
  }) => apiClient.post(API_ENDPOINTS.reports.saved, report),

  export: (
    format: "pdf" | "excel",
    reportType: string,
    params?: Record<string, unknown>
  ) => apiClient.get(API_ENDPOINTS.reports.export, { format }),
};

// ============ AUDIT SERVICES ============
export const auditService = {
  list: (params?: {
    resource_type?: string;
    user_id?: string;
    action?: string;
    start_date?: string;
    end_date?: string;
    page?: number;
    limit?: number;
  }) => apiClient.get<AuditLog[]>(API_ENDPOINTS.audit.list),

  getResourceHistory: (resource: string, id: string) =>
    apiClient.get<AuditLog[]>(API_ENDPOINTS.audit.resource, { resource, id }),
};

// ============ DASHBOARD SERVICES ============
export const dashboardService = {
  list: () => apiClient.get(API_ENDPOINTS.dashboards.list),

  create: (data: {
    name: string;
    layout: Record<string, unknown>;
    is_public?: boolean;
  }) => apiClient.post(API_ENDPOINTS.dashboards.create, data),

  get: (id: string) => apiClient.get(API_ENDPOINTS.dashboards.get, { id }),

  update: (
    id: string,
    data: { name?: string; layout?: Record<string, unknown> }
  ) => apiClient.put(API_ENDPOINTS.dashboards.update, data, { id }),

  delete: (id: string) =>
    apiClient.delete(API_ENDPOINTS.dashboards.delete, { id }),
};
