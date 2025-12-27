"use client";

import React, { useState } from "react";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  StatusBadge,
  PriorityBadge,
  Avatar,
  OverdueIndicator,
} from "@/app/components/dashboard/shared";
import {
  ClipboardList,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  MoreHorizontal,
  Calendar as CalendarIcon,
  User,
  ChevronLeft,
  ChevronRight,
  Timer,
  Zap,
  ArrowRight,
  GripVertical,
  MapPin,
  Wrench,
} from "lucide-react";

// ============ TYPES ============
type RequestStatus = "new" | "in-progress" | "repaired" | "scrap";
type Priority = "low" | "medium" | "high" | "urgent";

interface KanbanTask {
  id: string;
  title: string;
  equipment: string;
  priority: Priority;
  assignee?: { name: string; avatar?: string };
  dueDate?: string;
  isOverdue?: boolean;
  duration?: string;
  location?: string;
}

// ============ MOCK DATA ============
const kpiData = [
  {
    label: "New Requests",
    value: 8,
    icon: <ClipboardList className="w-6 h-6" />,
    color: "var(--info)",
  },
  {
    label: "In Progress",
    value: 12,
    icon: <Clock className="w-6 h-6" />,
    color: "var(--warning)",
  },
  {
    label: "Overdue",
    value: 3,
    icon: <AlertTriangle className="w-6 h-6" />,
    color: "var(--danger)",
  },
  {
    label: "Completed Today",
    value: 5,
    icon: <CheckCircle2 className="w-6 h-6" />,
    trend: { value: 25, isPositive: true },
    color: "var(--success)",
  },
];

const kanbanData: Record<RequestStatus, KanbanTask[]> = {
  new: [
    {
      id: "REQ-101",
      title: "HVAC Filter Replacement",
      equipment: "HVAC Unit #12",
      priority: "high",
      location: "Building A",
    },
    {
      id: "REQ-102",
      title: "Server Cooling Issue",
      equipment: "Server Rack A",
      priority: "urgent",
      location: "Server Room",
      isOverdue: true,
    },
    {
      id: "REQ-103",
      title: "Conveyor Belt Alignment",
      equipment: "Conveyor #3",
      priority: "medium",
      location: "Floor 2",
    },
  ],
  "in-progress": [
    {
      id: "REQ-098",
      title: "Motor Replacement",
      equipment: "CNC Machine #5",
      priority: "high",
      assignee: { name: "John Smith" },
      duration: "2h 15m",
      location: "Manufacturing",
    },
    {
      id: "REQ-099",
      title: "Electrical Panel Check",
      equipment: "Panel B-12",
      priority: "medium",
      assignee: { name: "Mike Johnson" },
      duration: "45m",
      location: "Building B",
    },
    {
      id: "REQ-100",
      title: "Forklift Tire Change",
      equipment: "Forklift FL-03",
      priority: "low",
      assignee: { name: "Tom Wilson" },
      duration: "1h 30m",
      isOverdue: true,
      location: "Dock B",
    },
  ],
  repaired: [
    {
      id: "REQ-095",
      title: "Generator Service",
      equipment: "Generator #2",
      priority: "medium",
      assignee: { name: "Sarah Davis" },
      duration: "3h 45m",
      location: "Basement",
    },
    {
      id: "REQ-096",
      title: "AC Unit Repair",
      equipment: "AC Unit #8",
      priority: "high",
      assignee: { name: "John Smith" },
      duration: "1h 20m",
      location: "Floor 3",
    },
  ],
  scrap: [
    {
      id: "REQ-090",
      title: "Pump Failure",
      equipment: "Water Pump #4",
      priority: "high",
      assignee: { name: "Mike Johnson" },
      location: "Utility Room",
    },
  ],
};

const calendarEvents = [
  { id: 1, title: "HVAC Inspection", time: "09:00", type: "preventive" },
  { id: 2, title: "Generator Test", time: "11:00", type: "preventive" },
  { id: 3, title: "Safety Audit", time: "14:00", type: "scheduled" },
];

const upcomingPreventive = [
  {
    id: 1,
    equipment: "HVAC Unit #12",
    task: "Filter Replacement",
    date: "Dec 28",
    technician: "John Smith",
  },
  {
    id: 2,
    equipment: "Generator #1",
    task: "Oil Change",
    date: "Dec 29",
    technician: "Mike Johnson",
  },
  {
    id: 3,
    equipment: "CNC Machine #5",
    task: "Calibration",
    date: "Dec 30",
    technician: "Tom Wilson",
  },
  {
    id: 4,
    equipment: "Server Rack A",
    task: "Dust Cleaning",
    date: "Jan 2",
    technician: "Sarah Davis",
  },
];

// ============ KANBAN COMPONENTS ============
function KanbanCard({
  task,
  showAssignee = true,
}: {
  task: KanbanTask;
  showAssignee?: boolean;
}) {
  return (
    <div
      className={`kanban-card group animate-fade-in ${
        task.isOverdue ? "overdue" : ""
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <span
          className="text-xs font-medium"
          style={{ color: "var(--foreground-muted)" }}
        >
          {task.id}
        </span>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical
            className="w-4 h-4 cursor-grab"
            style={{ color: "var(--foreground-subtle)" }}
          />
        </div>
      </div>

      <h4
        className="font-medium text-sm mb-2"
        style={{ color: "var(--foreground)" }}
      >
        {task.title}
      </h4>

      <div className="flex items-center gap-1.5 mb-3">
        <Wrench
          className="w-3.5 h-3.5"
          style={{ color: "var(--foreground-muted)" }}
        />
        <span className="text-xs" style={{ color: "var(--foreground-muted)" }}>
          {task.equipment}
        </span>
      </div>

      {task.location && (
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin
            className="w-3.5 h-3.5"
            style={{ color: "var(--foreground-subtle)" }}
          />
          <span
            className="text-xs"
            style={{ color: "var(--foreground-subtle)" }}
          >
            {task.location}
          </span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-2">
          {task.duration && (
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              <Timer className="w-3 h-3" />
              {task.duration}
            </span>
          )}
          {showAssignee && task.assignee && (
            <Avatar name={task.assignee.name} size="sm" />
          )}
        </div>
      </div>

      {task.isOverdue && (
        <div
          className="flex items-center gap-1.5 mt-3 pt-3 border-t"
          style={{ borderColor: "var(--border-light)" }}
        >
          <AlertTriangle
            className="w-3.5 h-3.5"
            style={{ color: "var(--danger)" }}
          />
          <span
            className="text-xs font-medium"
            style={{ color: "var(--danger)" }}
          >
            Overdue
          </span>
        </div>
      )}
    </div>
  );
}

function KanbanColumn({
  title,
  status,
  tasks,
  color,
}: {
  title: string;
  status: RequestStatus;
  tasks: KanbanTask[];
  color: string;
}) {
  return (
    <div className="kanban-column flex-shrink-0">
      <div
        className="flex items-center justify-between p-3 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: color }} />
          <span
            className="font-medium text-sm"
            style={{ color: "var(--foreground)" }}
          >
            {title}
          </span>
          <span
            className="px-2 py-0.5 text-xs font-medium rounded-full"
            style={{
              background: "var(--background-tertiary)",
              color: "var(--foreground-muted)",
            }}
          >
            {tasks.length}
          </span>
        </div>
        <button className="btn btn-ghost p-1">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      <div className="p-3 space-y-0 max-h-[500px] overflow-y-auto">
        {tasks.map((task, index) => (
          <div key={task.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <KanbanCard task={task} showAssignee={status !== "new"} />
          </div>
        ))}
        {status === "new" && (
          <button
            className="w-full p-3 rounded-lg border-2 border-dashed flex items-center justify-center gap-2 text-sm transition-all hover:bg-gray-50"
            style={{
              borderColor: "var(--border)",
              color: "var(--foreground-muted)",
            }}
          >
            <Plus className="w-4 h-4" />
            Add Request
          </button>
        )}
      </div>
    </div>
  );
}

function KanbanBoard() {
  const columns: { title: string; status: RequestStatus; color: string }[] = [
    { title: "New", status: "new", color: "var(--info)" },
    { title: "In Progress", status: "in-progress", color: "var(--warning)" },
    { title: "Repaired", status: "repaired", color: "var(--success)" },
    { title: "Scrap", status: "scrap", color: "var(--foreground-subtle)" },
  ];

  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center justify-between p-4 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          Maintenance Requests
        </h3>
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary text-sm">
            <Zap className="w-4 h-4" />
            Auto-assign
          </button>
          <button className="btn btn-primary text-sm">
            <Plus className="w-4 h-4" />
            New Request
          </button>
        </div>
      </div>
      <div className="flex gap-4 p-4 overflow-x-auto">
        {columns.map((column) => (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={kanbanData[column.status]}
            color={column.color}
          />
        ))}
      </div>
    </div>
  );
}

// ============ CALENDAR COMPONENTS ============
function MiniCalendar() {
  const [currentMonth] = useState(new Date());
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date().getDate();

  // Generate calendar days
  const firstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  const eventDays = [5, 12, 15, 22, 28, 29, 30];

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h3>
        <div className="flex items-center gap-1">
          <button className="btn btn-ghost p-1.5">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="btn btn-ghost p-1.5">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium py-1"
            style={{ color: "var(--foreground-subtle)" }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, i) => (
          <div
            key={i}
            className={`calendar-day aspect-square text-sm ${
              day === today ? "today" : ""
            } ${day && eventDays.includes(day) ? "has-event" : ""}`}
            style={{ color: day ? "var(--foreground)" : "transparent" }}
          >
            {day || ""}
          </div>
        ))}
      </div>

      {/* Today's Events */}
      <div
        className="mt-4 pt-4 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <h4
          className="text-sm font-medium mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Today&apos;s Schedule
        </h4>
        <div className="space-y-2">
          {calendarEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center gap-3 p-2 rounded-lg"
              style={{ background: "var(--background-secondary)" }}
            >
              <div
                className="w-1 h-8 rounded-full"
                style={{
                  background:
                    event.type === "preventive"
                      ? "var(--success)"
                      : "var(--primary)",
                }}
              />
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{ color: "var(--foreground)" }}
                >
                  {event.title}
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UpcomingPreventive() {
  return (
    <div className="card p-4">
      <SectionHeader
        title="Upcoming Preventive"
        action={
          <button className="btn btn-ghost text-sm">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        }
      />
      <div className="space-y-3 mt-4">
        {upcomingPreventive.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-gray-50 cursor-pointer animate-fade-in-left"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "var(--success-light)" }}
            >
              <CalendarIcon
                className="w-5 h-5"
                style={{ color: "var(--success)" }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium truncate"
                style={{ color: "var(--foreground)" }}
              >
                {item.task}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: "var(--foreground-muted)" }}
              >
                {item.equipment}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                {item.date}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--foreground-muted)" }}
              >
                {item.technician}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamWorkload() {
  const workload = [
    { name: "John Smith", tasks: 4, maxTasks: 6 },
    { name: "Mike Johnson", tasks: 5, maxTasks: 6 },
    { name: "Tom Wilson", tasks: 2, maxTasks: 6 },
    { name: "Sarah Davis", tasks: 6, maxTasks: 6 },
  ];

  return (
    <div className="card p-4">
      <SectionHeader title="Team Workload" subtitle="Current assignments" />
      <div className="space-y-4 mt-4">
        {workload.map((member, index) => {
          const percentage = (member.tasks / member.maxTasks) * 100;
          const isOverloaded = percentage >= 90;

          return (
            <div
              key={member.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Avatar name={member.name} size="sm" />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--foreground)" }}
                  >
                    {member.name}
                  </span>
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: isOverloaded
                      ? "var(--danger)"
                      : "var(--foreground-muted)",
                  }}
                >
                  {member.tasks}/{member.maxTasks} tasks
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ background: "var(--background-tertiary)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percentage}%`,
                    background: isOverloaded
                      ? "var(--danger)"
                      : percentage > 60
                      ? "var(--warning)"
                      : "var(--success)",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function ManagerDashboard() {
  return (
    <DashboardLayout title="Maintenance Control Center" notificationCount={8}>
      {/* Alert for Overdue */}
      <div className="mb-6">
        <OverdueIndicator count={3} />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <div
            key={kpi.label}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <KPICard {...kpi} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kanban Board - Wide */}
        <div className="lg:col-span-2">
          <KanbanBoard />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          <MiniCalendar />
          <TeamWorkload />
          <UpcomingPreventive />
        </div>
      </div>
    </DashboardLayout>
  );
}
