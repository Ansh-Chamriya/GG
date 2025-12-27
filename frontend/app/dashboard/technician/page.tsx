"use client";

import React, { useState } from "react";
import {
  DashboardLayout,
  KPICard,
  SectionHeader,
  StatusBadge,
  PriorityBadge,
  Avatar,
} from "@/app/components/dashboard/shared";
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar as CalendarIcon,
  MapPin,
  Wrench,
  Timer,
  Play,
  Pause,
  Check,
  X,
  ChevronRight,
  AlertTriangle,
  FileText,
  Camera,
  MessageSquare,
  ChevronLeft,
  ArrowRight,
  Trash2,
} from "lucide-react";

// ============ TYPES ============
type TaskStatus = "pending" | "in-progress" | "completed";
type Priority = "low" | "medium" | "high" | "urgent";

interface Task {
  id: string;
  title: string;
  equipment: string;
  location: string;
  priority: Priority;
  status: TaskStatus;
  dueTime?: string;
  duration?: string;
  description?: string;
  serialNumber?: string;
  isOverdue?: boolean;
}

// ============ MOCK DATA ============
const kpiData = [
  {
    label: "Tasks Today",
    value: 6,
    icon: <ClipboardList className="w-6 h-6" />,
    color: "var(--primary)",
  },
  {
    label: "In Progress",
    value: 1,
    icon: <Clock className="w-6 h-6" />,
    color: "var(--warning)",
  },
  {
    label: "Completed",
    value: 3,
    icon: <CheckCircle2 className="w-6 h-6" />,
    color: "var(--success)",
  },
  {
    label: "Avg. Time",
    value: "1.5h",
    icon: <Timer className="w-6 h-6" />,
    color: "var(--info)",
  },
];

const todaysTasks: Task[] = [
  {
    id: "REQ-098",
    title: "Motor Replacement",
    equipment: "CNC Machine #5",
    location: "Manufacturing Floor 2",
    priority: "high",
    status: "in-progress",
    dueTime: "11:00 AM",
    duration: "02:15:34",
    description:
      "Replace the main drive motor. Parts have been pre-ordered and are in storage room B.",
    serialNumber: "CNC-5-2021-0456",
  },
  {
    id: "REQ-104",
    title: "HVAC Filter Check",
    equipment: "HVAC Unit #12",
    location: "Building A, Roof",
    priority: "medium",
    status: "pending",
    dueTime: "2:00 PM",
    description: "Routine filter inspection and replacement if necessary.",
    serialNumber: "HVAC-12-2019-0123",
  },
  {
    id: "REQ-105",
    title: "Emergency Generator Test",
    equipment: "Generator #1",
    location: "Basement, Room G-01",
    priority: "high",
    status: "pending",
    dueTime: "4:00 PM",
    description:
      "Monthly generator test run. Ensure fuel levels are adequate before testing.",
    serialNumber: "GEN-1-2020-0089",
  },
];

const upcomingTasks: Task[] = [
  {
    id: "REQ-110",
    title: "Conveyor Belt Tension",
    equipment: "Conveyor #3",
    location: "Warehouse",
    priority: "medium",
    status: "pending",
    dueTime: "Tomorrow, 9:00 AM",
  },
  {
    id: "REQ-111",
    title: "Forklift Maintenance",
    equipment: "Forklift FL-02",
    location: "Loading Dock",
    priority: "low",
    status: "pending",
    dueTime: "Tomorrow, 2:00 PM",
  },
  {
    id: "REQ-112",
    title: "Server Room Cooling",
    equipment: "AC Unit #15",
    location: "Server Room",
    priority: "high",
    status: "pending",
    dueTime: "Dec 29, 10:00 AM",
  },
];

const completedTasks: Task[] = [
  {
    id: "REQ-095",
    title: "Pump Seal Replacement",
    equipment: "Water Pump #2",
    location: "Utility Room",
    priority: "high",
    status: "completed",
    duration: "1h 45m",
  },
  {
    id: "REQ-093",
    title: "Electrical Panel Inspection",
    equipment: "Panel A-05",
    location: "Building A",
    priority: "medium",
    status: "completed",
    duration: "45m",
  },
  {
    id: "REQ-091",
    title: "Lubrication Service",
    equipment: "CNC Machine #3",
    location: "Manufacturing",
    priority: "low",
    status: "completed",
    duration: "30m",
  },
];

// ============ COMPONENTS ============
function TaskCard({
  task,
  isActive = false,
  onClick,
}: {
  task: Task;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`card p-4 cursor-pointer transition-all ${
        isActive ? "ring-2 ring-primary" : ""
      } ${task.isOverdue ? "border-l-4" : ""} animate-fade-in`}
      style={{
        borderLeftColor: task.isOverdue ? "var(--danger)" : undefined,
        ...(isActive ? { boxShadow: "0 0 0 2px var(--primary)" } : {}),
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-medium"
            style={{ color: "var(--foreground-muted)" }}
          >
            {task.id}
          </span>
          <PriorityBadge priority={task.priority} />
        </div>
        {task.status === "in-progress" && (
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-full animate-pulse"
            style={{ background: "var(--warning-light)" }}
          >
            <div
              className="w-2 h-2 rounded-full bg-warning animate-pulse"
              style={{ background: "var(--warning)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--warning)" }}
            >
              Active
            </span>
          </div>
        )}
      </div>

      <h3 className="font-semibold mb-2" style={{ color: "var(--foreground)" }}>
        {task.title}
      </h3>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-2">
          <Wrench
            className="w-4 h-4"
            style={{ color: "var(--foreground-muted)" }}
          />
          <span
            className="text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            {task.equipment}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin
            className="w-4 h-4"
            style={{ color: "var(--foreground-muted)" }}
          />
          <span
            className="text-sm"
            style={{ color: "var(--foreground-muted)" }}
          >
            {task.location}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {task.dueTime && (
          <div className="flex items-center gap-1.5">
            <Clock
              className="w-4 h-4"
              style={{
                color: task.isOverdue
                  ? "var(--danger)"
                  : "var(--foreground-subtle)",
              }}
            />
            <span
              className="text-sm font-medium"
              style={{
                color: task.isOverdue
                  ? "var(--danger)"
                  : "var(--foreground-muted)",
              }}
            >
              {task.dueTime}
            </span>
          </div>
        )}
        {task.duration && task.status === "in-progress" && (
          <div
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: "var(--background-secondary)" }}
          >
            <Timer className="w-4 h-4" style={{ color: "var(--primary)" }} />
            <span
              className="text-sm font-mono font-medium"
              style={{ color: "var(--primary)" }}
            >
              {task.duration}
            </span>
          </div>
        )}
        <ChevronRight
          className="w-4 h-4"
          style={{ color: "var(--foreground-subtle)" }}
        />
      </div>
    </div>
  );
}

function ActiveTaskDetail({ task }: { task: Task }) {
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="p-4 border-b"
        style={{
          background: "var(--primary-50)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--primary)" }}
          >
            {task.id}
          </span>
          <PriorityBadge priority={task.priority} />
        </div>
        <h2
          className="text-xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          {task.title}
        </h2>
      </div>

      {/* Timer */}
      <div
        className="p-6 text-center border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="text-4xl font-mono font-bold mb-4"
          style={{ color: "var(--foreground)" }}
        >
          {task.duration || "00:00:00"}
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`btn ${
              isTimerRunning ? "btn-secondary" : "btn-primary"
            } px-6`}
          >
            {isTimerRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Resume
              </>
            )}
          </button>
        </div>
      </div>

      {/* Equipment Info */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h3
          className="font-semibold mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Equipment Details
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Equipment
            </span>
            <p className="font-medium" style={{ color: "var(--foreground)" }}>
              {task.equipment}
            </p>
          </div>
          <div>
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Serial Number
            </span>
            <p
              className="font-medium font-mono"
              style={{ color: "var(--foreground)" }}
            >
              {task.serialNumber}
            </p>
          </div>
          <div className="col-span-2">
            <span
              className="text-xs"
              style={{ color: "var(--foreground-muted)" }}
            >
              Location
            </span>
            <p className="font-medium" style={{ color: "var(--foreground)" }}>
              {task.location}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h3
          className="font-semibold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Task Description
        </h3>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          {task.description}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b" style={{ borderColor: "var(--border)" }}>
        <h3
          className="font-semibold mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Quick Actions
        </h3>
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-secondary text-sm">
            <Camera className="w-4 h-4" />
            Add Photo
          </button>
          <button className="btn btn-secondary text-sm">
            <FileText className="w-4 h-4" />
            Add Note
          </button>
          <button className="btn btn-secondary text-sm">
            <MessageSquare className="w-4 h-4" />
            Contact Manager
          </button>
        </div>
      </div>

      {/* Completion Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            className="btn w-full py-3 text-white"
            style={{ background: "var(--success)" }}
          >
            <Check className="w-5 h-5" />
            Mark as Repaired
          </button>
          <button className="btn btn-danger w-full py-3">
            <Trash2 className="w-5 h-5" />
            Mark as Scrap
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskList({
  title,
  tasks,
  showDuration = false,
}: {
  title: string;
  tasks: Task[];
  showDuration?: boolean;
}) {
  return (
    <div className="card p-4">
      <SectionHeader
        title={title}
        subtitle={`${tasks.length} task${tasks.length !== 1 ? "s" : ""}`}
      />
      <div className="space-y-3 mt-4">
        {tasks.map((task, index) => (
          <div
            key={task.id}
            className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-gray-50 cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  task.status === "completed"
                    ? "var(--success-light)"
                    : "var(--background-secondary)",
              }}
            >
              {task.status === "completed" ? (
                <CheckCircle2
                  className="w-5 h-5"
                  style={{ color: "var(--success)" }}
                />
              ) : (
                <ClipboardList
                  className="w-5 h-5"
                  style={{ color: "var(--foreground-muted)" }}
                />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium truncate ${
                  task.status === "completed" ? "line-through opacity-60" : ""
                }`}
                style={{ color: "var(--foreground)" }}
              >
                {task.title}
              </p>
              <p
                className="text-xs truncate"
                style={{ color: "var(--foreground-muted)" }}
              >
                {task.equipment} • {task.location}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              {showDuration && task.duration ? (
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--success)" }}
                >
                  {task.duration}
                </p>
              ) : (
                <p
                  className="text-sm"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {task.dueTime}
                </p>
              )}
              <PriorityBadge priority={task.priority} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TechnicianCalendar() {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const today = new Date().getDate();
  const taskDays = [27, 28, 29, 30];

  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold" style={{ color: "var(--foreground)" }}>
          December 2024
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
        {[...Array(31)].map((_, i) => {
          const day = i + 1;
          const isToday = day === today;
          const hasTask = taskDays.includes(day);

          return (
            <div
              key={i}
              className={`calendar-day aspect-square text-sm ${
                isToday ? "today" : ""
              } ${hasTask ? "has-event" : ""}`}
              style={{ color: "var(--foreground)" }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ MAIN PAGE ============
export default function TechnicianDashboard() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(
    todaysTasks.find((t) => t.status === "in-progress") || null
  );

  return (
    <DashboardLayout title="My Tasks" notificationCount={2}>
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left - Today's Tasks */}
        <div className="space-y-4">
          <SectionHeader
            title="Today's Tasks"
            subtitle={`${todaysTasks.length} tasks assigned`}
          />
          {todaysTasks.map((task, index) => (
            <div key={task.id} style={{ animationDelay: `${index * 0.1}s` }}>
              <TaskCard
                task={task}
                isActive={selectedTask?.id === task.id}
                onClick={() => setSelectedTask(task)}
              />
            </div>
          ))}
        </div>

        {/* Center - Active Task Detail */}
        <div>
          {selectedTask ? (
            <ActiveTaskDetail task={selectedTask} />
          ) : (
            <div className="card p-8 text-center">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "var(--background-tertiary)" }}
              >
                <ClipboardList
                  className="w-8 h-8"
                  style={{ color: "var(--foreground-muted)" }}
                />
              </div>
              <h3
                className="font-semibold mb-2"
                style={{ color: "var(--foreground)" }}
              >
                No Task Selected
              </h3>
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                Select a task from the list to view details and start working
              </p>
            </div>
          )}
        </div>

        {/* Right - Calendar & Upcoming */}
        <div className="space-y-6">
          <TechnicianCalendar />
          <TaskList title="Upcoming Tasks" tasks={upcomingTasks} />
          <TaskList
            title="Completed Today"
            tasks={completedTasks}
            showDuration
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
