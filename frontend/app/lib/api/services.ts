import { apiClient } from "./client";
import {
  API_ENDPOINTS,
  // Auth
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
  // Super Admin
  SuperAdminDashboardData,
  OrganizationSummary,
  // Admin
  AdminDashboardData,
  EquipmentItem,
  TeamSummary,
  // Manager
  ManagerDashboardData,
  KanbanTask,
  UpdateRequestStatusPayload,
  AssignTechnicianPayload,
  CreateRequestPayload,
  // Technician
  TechnicianDashboardData,
  TechnicianTask,
  TaskNote,
} from "./config";

// ============ AUTH SERVICES ============
export const authService = {
  login: (credentials: LoginRequest) =>
    apiClient.post<LoginResponse, LoginRequest>(
      API_ENDPOINTS.auth.login,
      credentials
    ),

  logout: () => apiClient.post(API_ENDPOINTS.auth.logout),

  register: (data: RegisterRequest) =>
    apiClient.post<User, RegisterRequest>(API_ENDPOINTS.auth.register, data),

  getMe: () => apiClient.get<User>(API_ENDPOINTS.auth.me),

  refreshToken: (refreshToken: string) =>
    apiClient.post<{ accessToken: string }>(API_ENDPOINTS.auth.refreshToken, {
      refreshToken,
    }),
};

// ============ SUPER ADMIN SERVICES ============
export const superAdminService = {
  getDashboard: () =>
    apiClient.get<SuperAdminDashboardData>(API_ENDPOINTS.superAdmin.dashboard),

  getOrganizations: () =>
    apiClient.get<OrganizationSummary[]>(
      API_ENDPOINTS.superAdmin.organizations
    ),

  createOrganization: (data: { name: string; adminEmail?: string }) =>
    apiClient.post<OrganizationSummary>(
      API_ENDPOINTS.superAdmin.organizations,
      data
    ),

  getAllEquipment: () =>
    apiClient.get<EquipmentItem[]>(API_ENDPOINTS.superAdmin.allEquipment),

  getAllRequests: () =>
    apiClient.get<KanbanTask[]>(API_ENDPOINTS.superAdmin.allRequests),

  getUsers: () => apiClient.get<User[]>(API_ENDPOINTS.superAdmin.users),

  createUser: (data: RegisterRequest) =>
    apiClient.post<User>(API_ENDPOINTS.superAdmin.users, data),

  getAnalytics: (params?: { startDate?: string; endDate?: string }) =>
    apiClient.get(API_ENDPOINTS.superAdmin.analytics),

  getSystemHealth: () => apiClient.get(API_ENDPOINTS.superAdmin.systemHealth),

  getAuditLogs: () => apiClient.get(API_ENDPOINTS.superAdmin.auditLogs),

  updateSettings: (settings: Record<string, unknown>) =>
    apiClient.put(API_ENDPOINTS.superAdmin.settings, settings),
};

// ============ ADMIN SERVICES ============
export const adminService = {
  getDashboard: () =>
    apiClient.get<AdminDashboardData>(API_ENDPOINTS.admin.dashboard),

  // Equipment
  getEquipment: () =>
    apiClient.get<EquipmentItem[]>(API_ENDPOINTS.admin.equipment),

  createEquipment: (data: Partial<EquipmentItem>) =>
    apiClient.post<EquipmentItem>(API_ENDPOINTS.admin.equipment, data),

  updateEquipment: (id: string, data: Partial<EquipmentItem>) =>
    apiClient.put<EquipmentItem>(
      `${API_ENDPOINTS.admin.equipment}/${id}`,
      data
    ),

  deleteEquipment: (id: string) =>
    apiClient.delete(`${API_ENDPOINTS.admin.equipment}/${id}`),

  // Teams
  getTeams: () => apiClient.get<TeamSummary[]>(API_ENDPOINTS.admin.teams),

  createTeam: (data: { name: string; leadId?: string; type?: string }) =>
    apiClient.post<TeamSummary>(API_ENDPOINTS.admin.teams, data),

  updateTeam: (id: string, data: Partial<TeamSummary>) =>
    apiClient.put<TeamSummary>(`${API_ENDPOINTS.admin.teams}/${id}`, data),

  addTeamMember: (teamId: string, userId: string) =>
    apiClient.post(`${API_ENDPOINTS.admin.teams}/${teamId}/members`, {
      userId,
    }),

  removeTeamMember: (teamId: string, userId: string) =>
    apiClient.delete(
      `${API_ENDPOINTS.admin.teams}/${teamId}/members/${userId}`
    ),

  // Requests
  getRequests: () => apiClient.get<KanbanTask[]>(API_ENDPOINTS.admin.requests),

  // Reports
  getReports: (params?: {
    type?: string;
    startDate?: string;
    endDate?: string;
  }) => apiClient.get(API_ENDPOINTS.admin.reports),
};

// ============ MANAGER SERVICES ============
export const managerService = {
  getDashboard: () =>
    apiClient.get<ManagerDashboardData>(API_ENDPOINTS.manager.dashboard),

  // Kanban
  getKanban: () =>
    apiClient.get<ManagerDashboardData["kanban"]>(API_ENDPOINTS.manager.kanban),

  // Requests
  createRequest: (data: CreateRequestPayload) =>
    apiClient.post<KanbanTask>(API_ENDPOINTS.admin.requests, data),

  updateRequestStatus: (id: string, data: UpdateRequestStatusPayload) =>
    apiClient.patch<KanbanTask>(
      API_ENDPOINTS.manager.updateRequestStatus,
      data,
      { id }
    ),

  assignTechnician: (id: string, data: AssignTechnicianPayload) =>
    apiClient.post<KanbanTask>(API_ENDPOINTS.manager.assignTechnician, data, {
      id,
    }),

  // Calendar
  getCalendarEvents: (params?: { month?: number; year?: number }) =>
    apiClient.get(API_ENDPOINTS.manager.calendar),

  createCalendarEvent: (data: {
    equipmentId: string;
    date: string;
    task: string;
    technicianId?: string;
  }) => apiClient.post(API_ENDPOINTS.manager.calendar, data),

  // Equipment
  getEquipment: () =>
    apiClient.get<EquipmentItem[]>(API_ENDPOINTS.manager.equipment),

  // Team
  getTeamWorkload: () => apiClient.get(API_ENDPOINTS.manager.team),

  // Reports
  getReports: () => apiClient.get(API_ENDPOINTS.manager.reports),
};

// ============ TECHNICIAN SERVICES ============
export const technicianService = {
  getDashboard: () =>
    apiClient.get<TechnicianDashboardData>(API_ENDPOINTS.technician.dashboard),

  // Tasks
  getMyTasks: () =>
    apiClient.get<TechnicianTask[]>(API_ENDPOINTS.technician.myTasks),

  getTaskDetail: (id: string) =>
    apiClient.get<TechnicianTask>(API_ENDPOINTS.technician.taskDetail, { id }),

  updateTaskStatus: (
    id: string,
    status: "pending" | "in-progress" | "completed",
    notes?: string
  ) =>
    apiClient.patch<TechnicianTask>(
      API_ENDPOINTS.technician.updateTaskStatus,
      { status, notes },
      { id }
    ),

  markAsRepaired: (id: string, notes?: string) =>
    apiClient.patch<TechnicianTask>(
      API_ENDPOINTS.technician.updateTaskStatus,
      { status: "completed", outcome: "repaired", notes },
      { id }
    ),

  markAsScrap: (id: string, notes?: string) =>
    apiClient.patch<TechnicianTask>(
      API_ENDPOINTS.technician.updateTaskStatus,
      { status: "completed", outcome: "scrap", notes },
      { id }
    ),

  // Timer
  startTimer: (id: string) =>
    apiClient.post(API_ENDPOINTS.technician.startTimer, undefined, { id }),

  stopTimer: (id: string) =>
    apiClient.post(API_ENDPOINTS.technician.stopTimer, undefined, { id }),

  // Notes & Photos
  addNote: (id: string, content: string) =>
    apiClient.post<TaskNote>(
      API_ENDPOINTS.technician.addNote,
      { content },
      { id }
    ),

  addPhoto: (id: string, file: File) =>
    apiClient.uploadFile(
      API_ENDPOINTS.technician.addPhoto.replace(":id", id),
      file
    ),

  // Calendar
  getCalendar: () => apiClient.get(API_ENDPOINTS.technician.calendar),

  // History
  getHistory: () =>
    apiClient.get<TechnicianTask[]>(API_ENDPOINTS.technician.history),
};

// ============ COMMON SERVICES ============
export const commonService = {
  getNotifications: () => apiClient.get(API_ENDPOINTS.common.notifications),

  markNotificationRead: (id: string) =>
    apiClient.post(API_ENDPOINTS.common.markNotificationRead, undefined, {
      id,
    }),

  getProfile: () => apiClient.get<User>(API_ENDPOINTS.common.profile),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<User>(API_ENDPOINTS.common.updateProfile, data),
};
