"use client";

import React from "react";
import { DashboardLayout, EmptyState } from "@/app/components/dashboard/shared";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <DashboardLayout title="Settings" notificationCount={0}>
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary-100)" }}
        >
          <Settings className="w-6 h-6" style={{ color: "var(--primary)" }} />
        </div>
        <div>
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--foreground)" }}
          >
            Settings
          </h2>
          <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
            Manage your account and organization settings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <div className="card p-6">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Profile Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Display Name
                </label>
                <input
                  type="text"
                  className="w-full mt-1 h-10 px-3 rounded-lg text-sm"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                  }}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--foreground)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  className="w-full mt-1 h-10 px-3 rounded-lg text-sm"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--background)",
                  }}
                  placeholder="your@email.com"
                />
              </div>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="card p-6">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Notification Preferences
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Email notifications",
                  description: "Receive email for important updates",
                },
                {
                  label: "Work order assignments",
                  description: "Get notified when assigned to a work order",
                },
                {
                  label: "Maintenance reminders",
                  description: "Upcoming scheduled maintenance alerts",
                },
                {
                  label: "Low stock alerts",
                  description: "Parts inventory warnings",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between p-3 rounded-xl"
                  style={{ background: "var(--background-secondary)" }}
                >
                  <div>
                    <span
                      className="font-medium text-sm"
                      style={{ color: "var(--foreground)" }}
                    >
                      {item.label}
                    </span>
                    <p
                      className="text-xs"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-5 h-5 accent-teal-600"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <div className="card p-6">
            <h3
              className="font-semibold mb-4"
              style={{ color: "var(--foreground)" }}
            >
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button className="btn btn-secondary w-full text-left justify-start">
                Change Password
              </button>
              <button className="btn btn-secondary w-full text-left justify-start">
                Two-Factor Authentication
              </button>
              <button className="btn btn-secondary w-full text-left justify-start">
                Connected Devices
              </button>
              <button
                className="btn w-full text-left justify-start"
                style={{
                  background: "var(--danger-light)",
                  color: "var(--danger)",
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
