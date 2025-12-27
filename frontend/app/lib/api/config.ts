// ============ API CONFIGURATION ============
// Update this BASE_URL to point to your FastAPI backend server
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

// ============ API ENDPOINTS ============
// Matches the FastAPI backend routes exactly

export const API_ENDPOINTS = {
  // Authentication
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    verifyEmail: "/auth/verify-email/:token",
    me: "/auth/me",
    updateMe: "/auth/me",
    changePassword: "/auth/me/password",
  },

  // Organizations
  organizations: {
    list: "/organizations",
    create: "/organizations",
    get: "/organizations/:id",
    update: "/organizations/:id",
    delete: "/organizations/:id",
    stats: "/organizations/:id/stats",
  },

  // Users
  users: {
    list: "/users",
    create: "/users",
    get: "/users/:id",
    update: "/users/:id",
    delete: "/users/:id",
    changeRole: "/users/:id/role",
    workorders: "/users/:id/workorders",
    activity: "/users/:id/activity",
  },

  // Locations
  locations: {
    list: "/locations",
    create: "/locations",
    get: "/locations/:id",
    update: "/locations/:id",
    delete: "/locations/:id",
    equipment: "/locations/:id/equipment",
  },

  // Equipment
  equipment: {
    list: "/equipment",
    create: "/equipment",
    get: "/equipment/:id",
    update: "/equipment/:id",
    delete: "/equipment/:id",
    history: "/equipment/:id/history",
    workorders: "/equipment/:id/workorders",
    schedules: "/equipment/:id/schedules",
    parts: "/equipment/:id/parts",
    addMeterReading: "/equipment/:id/meter-reading",
    meterReadings: "/equipment/:id/meter-readings",
    reportIssue: "/equipment/:id/report-issue",
    qrCode: "/equipment/:id/qr",
  },

  // Equipment Categories
  categories: {
    list: "/categories",
    create: "/categories",
    get: "/categories/:id",
    update: "/categories/:id",
    delete: "/categories/:id",
  },

  // Maintenance Schedules
  schedules: {
    list: "/schedules",
    create: "/schedules",
    get: "/schedules/:id",
    update: "/schedules/:id",
    delete: "/schedules/:id",
    generateWorkorder: "/schedules/:id/generate-workorder",
    upcoming: "/schedules/upcoming",
    overdue: "/schedules/overdue",
  },

  // Work Orders
  workorders: {
    list: "/workorders",
    create: "/workorders",
    get: "/workorders/:id",
    update: "/workorders/:id",
    delete: "/workorders/:id",
    updateStatus: "/workorders/:id/status",
    assign: "/workorders/:id/assign",
    start: "/workorders/:id/start",
    complete: "/workorders/:id/complete",
    hold: "/workorders/:id/hold",
    cancel: "/workorders/:id/cancel",
    tasks: "/workorders/:id/tasks",
    updateTask: "/workorders/:id/tasks/:taskId",
    comments: "/workorders/:id/comments",
    addComment: "/workorders/:id/comments",
    addParts: "/workorders/:id/parts",
    checklist: "/workorders/:id/checklist",
  },

  // Teams
  teams: {
    list: "/teams",
    create: "/teams",
    get: "/teams/:id",
    update: "/teams/:id",
    delete: "/teams/:id",
    addMember: "/teams/:id/members",
    removeMember: "/teams/:id/members/:userId",
    workorders: "/teams/:id/workorders",
  },

  // Parts Inventory
  parts: {
    list: "/parts",
    create: "/parts",
    get: "/parts/:id",
    update: "/parts/:id",
    delete: "/parts/:id",
    adjustStock: "/parts/:id/adjust-stock",
    usageHistory: "/parts/:id/usage-history",
    lowStock: "/parts/low-stock",
    linkEquipment: "/parts/:id/equipment",
  },

  // Checklist Templates
  checklists: {
    list: "/checklists",
    create: "/checklists",
    get: "/checklists/:id",
    update: "/checklists/:id",
    delete: "/checklists/:id",
  },

  // Notifications
  notifications: {
    list: "/notifications",
    markRead: "/notifications/:id/read",
    markAllRead: "/notifications/read-all",
    delete: "/notifications/:id",
    settings: "/notifications/settings",
  },

  // Reports & Analytics
  reports: {
    dashboard: "/reports/dashboard",
    equipmentHealth: "/reports/equipment-health",
    workorderSummary: "/reports/workorder-summary",
    maintenanceCosts: "/reports/maintenance-costs",
    technicianPerformance: "/reports/technician-performance",
    downtime: "/reports/downtime",
    partsUsage: "/reports/parts-usage",
    custom: "/reports/custom",
    saved: "/reports/saved",
    export: "/reports/export/:format",
  },

  // Audit Logs
  audit: {
    list: "/audit-logs",
    resource: "/audit-logs/:resource/:id",
  },

  // Dashboards
  dashboards: {
    list: "/dashboards",
    create: "/dashboards",
    get: "/dashboards/:id",
    update: "/dashboards/:id",
    delete: "/dashboards/:id",
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
    total_pages: number;
  };
}

// ============ USER ROLES ============
// Matches backend role definitions
export type UserRole =
  | "super_admin"
  | "admin"
  | "manager"
  | "technician"
  | "operator"
  | "viewer";

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  super_admin: 1,
  admin: 2,
  manager: 3,
  technician: 4,
  operator: 5,
  viewer: 6,
};

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin",
  admin: "Organization Admin",
  manager: "Manager",
  technician: "Technician",
  operator: "Operator",
  viewer: "Viewer",
};

// ============ AUTH TYPES ============
export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  profile_image_url?: string;
  role_id: string;
  role: UserRole;
  organization_id: string;
  organization_name?: string;
  is_active: boolean;
  is_verified: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// TokenResponse from FastAPI - used for both login and register
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
  organization_name?: string; // Creates new org if provided
  organization_id?: string; // Joins existing org if provided
}

export interface RefreshTokenRequest {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

// ============ ORGANIZATION TYPES ============
export interface Organization {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  phone?: string;
  email?: string;
  website?: string;
  subscription_tier: "free" | "basic" | "pro" | "enterprise";
  subscription_expires_at?: string;
  is_active: boolean;
  settings?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface OrganizationStats {
  total_equipment: number;
  total_users: number;
  total_locations: number;
  active_workorders: number;
  overdue_workorders: number;
  completed_this_month: number;
  equipment_health_avg: number;
}

// ============ LOCATION TYPES ============
export interface Location {
  id: string;
  organization_id: string;
  name: string;
  code?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  parent_location_id?: string;
  type?: "site" | "building" | "floor" | "room" | "area";
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// ============ EQUIPMENT TYPES ============
export type EquipmentStatus =
  | "operational"
  | "maintenance"
  | "breakdown"
  | "retired";
export type Criticality = "low" | "medium" | "high" | "critical";

export interface EquipmentCategory {
  id: string;
  organization_id: string;
  name: string;
  code?: string;
  description?: string;
  parent_category_id?: string;
  icon?: string;
  color?: string;
  created_at: string;
}

export interface Equipment {
  id: string;
  organization_id: string;
  location_id?: string;
  location?: Location;
  category_id?: string;
  category?: EquipmentCategory;
  name: string;
  code?: string;
  serial_number?: string;
  model?: string;
  manufacturer?: string;
  description?: string;
  image_url?: string;
  purchase_date?: string;
  purchase_cost?: number;
  warranty_expiry?: string;
  expected_lifespan_years?: number;
  status: EquipmentStatus;
  health_score: number;
  criticality: Criticality;
  qr_code?: string;
  specifications?: Record<string, unknown>;
  documents?: string[];
  custom_fields?: Record<string, unknown>;
  last_maintenance_date?: string;
  next_maintenance_date?: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface MeterReading {
  id: string;
  equipment_id: string;
  meter_type: "hours" | "km" | "cycles" | "units_produced";
  reading_value: number;
  reading_unit?: string;
  recorded_by: string;
  recorded_at: string;
  notes?: string;
}

// ============ MAINTENANCE SCHEDULE TYPES ============
export type ScheduleType = "preventive" | "predictive" | "condition_based";
export type FrequencyType =
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "meter_based"
  | "custom";

export interface MaintenanceSchedule {
  id: string;
  organization_id: string;
  equipment_id: string;
  equipment?: Equipment;
  name: string;
  description?: string;
  type: ScheduleType;
  frequency_type: FrequencyType;
  frequency_value?: number;
  frequency_unit?: string;
  meter_threshold?: number;
  last_performed?: string;
  next_due?: string;
  estimated_duration_minutes?: number;
  priority: Priority;
  assigned_to?: string;
  assigned_user?: User;
  checklist_template_id?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

// ============ WORK ORDER TYPES ============
export type WorkOrderType =
  | "preventive"
  | "corrective"
  | "emergency"
  | "inspection";
export type WorkOrderStatus =
  | "pending"
  | "in_progress"
  | "on_hold"
  | "completed"
  | "cancelled";
export type Priority = "low" | "medium" | "high" | "critical";

export interface WorkOrder {
  id: string;
  organization_id: string;
  equipment_id: string;
  equipment?: Equipment;
  schedule_id?: string;
  work_order_number: string;
  title: string;
  description?: string;
  type: WorkOrderType;
  status: WorkOrderStatus;
  priority: Priority;
  requested_by?: string;
  requested_by_user?: User;
  assigned_to?: string;
  assigned_user?: User;
  assigned_team_id?: string;
  assigned_team?: Team;
  due_date?: string;
  started_at?: string;
  completed_at?: string;
  estimated_hours?: number;
  actual_hours?: number;
  estimated_cost?: number;
  actual_cost?: number;
  failure_code?: string;
  root_cause?: string;
  resolution_notes?: string;
  checklist_template_id?: string;
  attachments?: string[];
  custom_fields?: Record<string, unknown>;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface WorkOrderTask {
  id: string;
  work_order_id: string;
  task_order: number;
  title: string;
  description?: string;
  status: "pending" | "in_progress" | "completed" | "skipped";
  is_required: boolean;
  completed_by?: string;
  completed_at?: string;
  notes?: string;
  time_spent_minutes?: number;
  created_at: string;
}

export interface WorkOrderComment {
  id: string;
  work_order_id: string;
  user_id: string;
  user?: User;
  comment: string;
  attachments?: string[];
  is_internal: boolean;
  created_at: string;
  updated_at: string;
}

// ============ TEAM TYPES ============
export interface Team {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  leader_id?: string;
  leader?: User;
  location_id?: string;
  location?: Location;
  is_active: boolean;
  members_count?: number;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  user?: User;
  role: "leader" | "member";
  joined_at: string;
}

// ============ PARTS INVENTORY TYPES ============
export interface Part {
  id: string;
  organization_id: string;
  location_id?: string;
  location?: Location;
  name: string;
  part_number?: string;
  description?: string;
  category?: string;
  manufacturer?: string;
  unit: string;
  quantity_in_stock: number;
  minimum_stock_level: number;
  reorder_quantity?: number;
  unit_cost?: number;
  last_restock_date?: string;
  storage_location?: string;
  image_url?: string;
  specifications?: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PartUsage {
  id: string;
  work_order_id: string;
  part_id: string;
  part?: Part;
  quantity_used: number;
  unit_cost_at_time?: number;
  used_by: string;
  used_by_user?: User;
  used_at: string;
  notes?: string;
}

// ============ CHECKLIST TYPES ============
export interface ChecklistItem {
  order: number;
  title: string;
  type: "checkbox" | "text" | "number" | "select" | "photo";
  options?: string[];
  required: boolean;
}

export interface ChecklistTemplate {
  id: string;
  organization_id: string;
  name: string;
  description?: string;
  category?: string;
  items: ChecklistItem[];
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface ChecklistResponse {
  item_order: number;
  value: string | number | boolean;
  notes?: string;
  photo_url?: string;
}

export interface WorkOrderChecklist {
  id: string;
  work_order_id: string;
  template_id?: string;
  responses: ChecklistResponse[];
  completed_by?: string;
  completed_at?: string;
  created_at: string;
}

// ============ NOTIFICATION TYPES ============
export type NotificationType =
  | "work_order"
  | "maintenance_due"
  | "low_stock"
  | "system"
  | "assignment"
  | "completion"
  | "overdue";

export interface Notification {
  id: string;
  user_id: string;
  organization_id: string;
  type: NotificationType;
  title: string;
  message: string;
  reference_type?: string;
  reference_id?: string;
  priority: "low" | "normal" | "high" | "urgent";
  is_read: boolean;
  read_at?: string;
  action_url?: string;
  created_at: string;
  expires_at?: string;
}

// ============ MAINTENANCE HISTORY TYPES ============
export interface MaintenanceHistory {
  id: string;
  equipment_id: string;
  work_order_id?: string;
  action_type: "maintenance" | "repair" | "inspection" | "replacement";
  summary: string;
  details?: string;
  performed_by?: string;
  performed_by_user?: User;
  performed_at: string;
  cost?: number;
  downtime_minutes?: number;
  parts_used?: PartUsage[];
  before_status?: EquipmentStatus;
  after_status?: EquipmentStatus;
  before_health_score?: number;
  after_health_score?: number;
}

// ============ REPORT TYPES ============
export interface DashboardData {
  // Super Admin specific
  total_organizations?: number;
  organizations_growth?: number;

  // Common across roles
  total_equipment: number;
  equipment_by_status: Record<EquipmentStatus, number>;
  equipment_health_avg: number;

  active_workorders: number;
  pending_workorders: number;
  overdue_workorders: number;
  completed_today: number;
  completed_this_week: number;
  completed_this_month: number;

  upcoming_maintenance: MaintenanceSchedule[];
  overdue_maintenance: MaintenanceSchedule[];

  recent_workorders: WorkOrder[];
  recent_activity: AuditLog[];

  // Manager/Technician specific
  my_assigned_workorders?: number;
  team_workload?: TeamWorkload[];

  // Parts
  low_stock_parts?: Part[];

  // Charts data
  workorders_by_month?: { month: string; count: number }[];
  workorders_by_type?: Record<WorkOrderType, number>;
  workorders_by_priority?: Record<Priority, number>;
}

export interface TeamWorkload {
  user_id: string;
  user_name: string;
  avatar_url?: string;
  assigned_count: number;
  in_progress_count: number;
  completed_today: number;
  avg_completion_time_hours: number;
}

// ============ AUDIT LOG TYPES ============
export interface AuditLog {
  id: string;
  organization_id: string;
  user_id?: string;
  user?: User;
  action:
    | "create"
    | "update"
    | "delete"
    | "login"
    | "logout"
    | "status_change"
    | "assignment";
  resource_type: string;
  resource_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

// ============ REQUEST PAYLOADS ============
export interface CreateWorkOrderPayload {
  equipment_id: string;
  title: string;
  description?: string;
  type: WorkOrderType;
  priority: Priority;
  assigned_to?: string;
  assigned_team_id?: string;
  due_date?: string;
  estimated_hours?: number;
  checklist_template_id?: string;
}

export interface UpdateWorkOrderStatusPayload {
  status: WorkOrderStatus;
  notes?: string;
}

export interface AssignWorkOrderPayload {
  assigned_to?: string;
  assigned_team_id?: string;
}

export interface CompleteWorkOrderPayload {
  resolution_notes?: string;
  actual_hours?: number;
  actual_cost?: number;
  parts_used?: { part_id: string; quantity: number }[];
}

export interface CreateEquipmentPayload {
  name: string;
  code?: string;
  serial_number?: string;
  model?: string;
  manufacturer?: string;
  description?: string;
  location_id?: string;
  category_id?: string;
  purchase_date?: string;
  purchase_cost?: number;
  warranty_expiry?: string;
  criticality?: Criticality;
  specifications?: Record<string, unknown>;
}

export interface ReportIssuePayload {
  title: string;
  description: string;
  priority: Priority;
  type?: WorkOrderType;
}

export interface AddMeterReadingPayload {
  meter_type: "hours" | "km" | "cycles" | "units_produced";
  reading_value: number;
  notes?: string;
}

export interface AdjustStockPayload {
  adjustment: number; // Positive to add, negative to subtract
  reason: string;
}

export interface CreateSchedulePayload {
  equipment_id: string;
  name: string;
  description?: string;
  type: ScheduleType;
  frequency_type: FrequencyType;
  frequency_value?: number;
  frequency_unit?: string;
  estimated_duration_minutes?: number;
  priority?: Priority;
  assigned_to?: string;
  checklist_template_id?: string;
}
