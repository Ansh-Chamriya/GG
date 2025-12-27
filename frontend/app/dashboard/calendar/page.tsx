"use client";

import React from "react";
import { DashboardLayout } from "@/app/components/dashboard/shared";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() &&
    currentDate.getMonth() === today.getMonth() &&
    currentDate.getFullYear() === today.getFullYear();

  return (
    <DashboardLayout title="Calendar" notificationCount={0}>
      <div className="card p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ background: "var(--primary-100)" }}
            >
              <CalendarIcon
                className="w-6 h-6"
                style={{ color: "var(--primary)" }}
              />
            </div>
            <div>
              <h2
                className="text-xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <p
                className="text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                Maintenance schedule calendar
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() - 1,
                    1
                  )
                )
              }
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft
                className="w-5 h-5"
                style={{ color: "var(--foreground-muted)" }}
              />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--primary)", color: "white" }}
            >
              Today
            </button>
            <button
              onClick={() =>
                setCurrentDate(
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 1,
                    1
                  )
                )
              }
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronRight
                className="w-5 h-5"
                style={{ color: "var(--foreground-muted)" }}
              />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div
          className="grid grid-cols-7 gap-px"
          style={{ background: "var(--border)" }}
        >
          {/* Day Headers */}
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium"
              style={{
                background: "var(--background-secondary)",
                color: "var(--foreground-muted)",
              }}
            >
              {day}
            </div>
          ))}

          {/* Empty cells for days before the month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="p-3 min-h-[100px]"
              style={{ background: "var(--background-secondary)" }}
            />
          ))}

          {/* Calendar Days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            return (
              <div
                key={day}
                className="p-3 min-h-[100px] cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ background: "var(--background)" }}
              >
                <span
                  className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    isToday(day) ? "text-white" : ""
                  }`}
                  style={{
                    background: isToday(day) ? "var(--primary)" : "transparent",
                    color: isToday(day) ? "white" : "var(--foreground)",
                  }}
                >
                  {day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
