"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, getRoleBasedRoute } from "@/app/lib/auth";
import { Shield, Loader2 } from "lucide-react";

// This page immediately redirects to the appropriate role-based dashboard
// It only shows a loading state while determining the user's role

export default function DashboardRedirect() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated && user) {
        // Redirect to role-specific dashboard
        router.replace(getRoleBasedRoute(user.role));
      } else {
        // Not authenticated - redirect to login
        router.replace("/auth/login");
      }
    }
  }, [user, isLoading, isAuthenticated, router]);

  // Show loading state while redirecting
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: "var(--background-secondary)" }}
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse"
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
        }}
      >
        <Shield className="w-10 h-10 text-white" />
      </div>
      <div className="flex items-center gap-3">
        <Loader2
          className="w-5 h-5 animate-spin"
          style={{ color: "var(--primary)" }}
        />
        <span
          className="text-lg font-medium"
          style={{ color: "var(--foreground-muted)" }}
        >
          Loading your dashboard...
        </span>
      </div>
    </div>
  );
}
