// ============ API CONFIGURATION ============
// Update this BASE_URL to point to your backend server
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// ============ API ENDPOINTS ============
// Simply update the endpoint paths below to match your backend routes

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    me: "/auth/me",
    refreshToken: "/auth/refresh",
  },

  // Super Admin endpoints
  superAdmin: {
    dashboard: "/super-admin/dashboard",
    organizations: "/super-admin/organizations",
    allEquipment: "/super-admin/equipment",
    allRequests: "/super-admin/requests",
    users: "/super-admin/users",
    analytics: "/super-admin/analytics",
    systemHealth: "/super-admin/system-health",
    auditLogs: "/super-admin/audit-logs",
    settings: "/super-admin/settings",
  },

  // Admin endpoints
  admin: {
    dashboard: "/admin/dashboard",
    equipment: "/admin/equipment",
    teams: "/admin/teams",
    requests: "/admin/requests",
    reports: "/admin/reports",
    settings: "/admin/settings",
  },

  // Manager endpoints
  manager: {
    dashboard: "/manager/dashboard",
    kanban: "/manager/kanban",
    calendar: "/manager/calendar",
    equipment: "/manager/equipment",
    team: "/manager/team",
    reports: "/manager/reports",
    updateRequestStatus: "/manager/requests/:id/status",
    assignTechnician: "/manager/requests/:id/assign",
  },

  // Technician endpoints
  technician: {
    dashboard: "/technician/dashboard",
    myTasks: "/technician/tasks",
    taskDetail: "/technician/tasks/:id",
    updateTaskStatus: "/technician/tasks/:id/status",
    startTimer: "/technician/tasks/:id/timer/start",
    stopTimer: "/technician/tasks/:id/timer/stop",
    addNote: "/technician/tasks/:id/notes",
    addPhoto: "/technician/tasks/:id/photos",
    calendar: "/technician/calendar",
    history: "/technician/history",
  },

  // Common endpoints
  common: {
    notifications: "/notifications",
    markNotificationRead: "/notifications/:id/read",
    profile: "/profile",
    updateProfile: "/profile/update",
  },
};

// ============ API RESPONSE TYPES ============
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ============ AUTH TYPES ============
export type UserRole = "super-admin" | "admin" | "manager" | "technician";

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  organizationId?: string;
  organizationName?: string;
  teamId?: string;
  teamName?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: string;
  teamId?: string;
}

// ============ DASHBOARD DATA TYPES ============

// Super Admin Types
export interface SuperAdminDashboardData {
  kpis: {
    totalOrganizations: number;
    totalEquipment: number;
    activeRequests: number;
    systemUptime: number;
  };
  trends: {
    organizationsChange: number;
    equipmentChange: number;
    requestsChange: number;
  };
  organizations: OrganizationSummary[];
  requestsChart: { month: string; count: number }[];
  teamPerformance: { type: string; requests: number; completion: number }[];
  systemHealth: {
    apiResponseTime: string;
    databaseLoad: string;
    activeSessions: number;
    errorRate: string;
  };
  recentActivity: ActivityItem[];
}

export interface OrganizationSummary {
  id: string;
  name: string;
  equipmentCount: number;
  activeRequests: number;
  teamsCount: number;
  status: "active" | "pending" | "inactive";
}

export interface ActivityItem {
  id: string;
  type: "org" | "user" | "request" | "equipment" | "system";
  action: string;
  name: string;
  timestamp: string;
}

// Admin Types
export interface AdminDashboardData {
  kpis: {
    totalEquipment: number;
    activeRequests: number;
    overdueRequests: number;
    preventiveThisWeek: number;
  };
  trends: {
    equipmentChange: number;
    requestsChange: number;
  };
  equipment: EquipmentItem[];
  teams: TeamSummary[];
  recentRequests: RequestItem[];
  categoryBreakdown: { category: string; count: number; percentage: number }[];
  maintenanceRatio: { corrective: number; preventive: number };
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  department: string;
  location: string;
  status: "operational" | "maintenance" | "scrap";
  activeRequests: number;
  serialNumber?: string;
  warrantyExpiry?: string;
}

export interface TeamSummary {
  id: string;
  name: string;
  leadName: string;
  membersCount: number;
  activeRequests: number;
  avgResponseTime: string;
}

// Manager Types
export interface ManagerDashboardData {
  kpis: {
    newRequests: number;
    inProgress: number;
    overdue: number;
    completedToday: number;
  };
  kanban: {
    new: KanbanTask[];
    inProgress: KanbanTask[];
    repaired: KanbanTask[];
    scrap: KanbanTask[];
  };
  calendarEvents: CalendarEvent[];
  upcomingPreventive: PreventiveTask[];
  teamWorkload: WorkloadItem[];
}

export interface KanbanTask {
  id: string;
  title: string;
  equipment: string;
  equipmentId: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "in-progress" | "repaired" | "scrap";
  assignee?: {
    id: string;
    name: string;
    avatar?: string;
  };
  dueDate?: string;
  duration?: string;
  location?: string;
  isOverdue?: boolean;
  createdAt: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: "preventive" | "corrective" | "scheduled";
  equipmentId?: string;
}

export interface PreventiveTask {
  id: string;
  equipment: string;
  equipmentId: string;
  task: string;
  scheduledDate: string;
  technicianId?: string;
  technicianName?: string;
}

export interface WorkloadItem {
  id: string;
  name: string;
  avatar?: string;
  currentTasks: number;
  maxTasks: number;
}

// Technician Types
export interface TechnicianDashboardData {
  kpis: {
    tasksToday: number;
    inProgress: number;
    completed: number;
    avgTime: string;
  };
  todaysTasks: TechnicianTask[];
  upcomingTasks: TechnicianTask[];
  completedTasks: TechnicianTask[];
  activeTask?: TechnicianTask;
}

export interface TechnicianTask {
  id: string;
  title: string;
  equipment: string;
  equipmentId: string;
  serialNumber?: string;
  location: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "pending" | "in-progress" | "completed";
  dueTime?: string;
  duration?: string;
  description?: string;
  isOverdue?: boolean;
  notes?: TaskNote[];
  photos?: string[];
}

export interface TaskNote {
  id: string;
  content: string;
  createdAt: string;
  authorId: string;
  authorName: string;
}

// Request Types
export interface RequestItem {
  id: string;
  equipment: string;
  equipmentId: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "new" | "in-progress" | "repaired" | "scrap";
  team?: string;
  teamId?: string;
  assignee?: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateRequestPayload {
  equipmentId: string;
  type: "corrective" | "preventive";
  priority: "low" | "medium" | "high" | "urgent";
  description: string;
  scheduledDate?: string;
}

export interface UpdateRequestStatusPayload {
  status: "new" | "in-progress" | "repaired" | "scrap";
  notes?: string;
}

export interface AssignTechnicianPayload {
  technicianId: string;
}
