"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  User,
  UserRole,
  LoginRequest,
  RegisterRequest,
  ROLE_LABELS,
} from "@/app/lib/api";
import { authService } from "@/app/lib/api/services";

// ============ TYPES ============
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasPermission: (permission: string) => boolean;
  getUserDisplayName: () => string;
}

// ============ CONTEXT ============
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============ ROLE-BASED ROUTES ============
// Maps each role to their default dashboard
const roleHomeRoutes: Record<UserRole, string> = {
  super_admin: "/dashboard/super-admin",
  admin: "/dashboard/admin",
  manager: "/dashboard/manager",
  technician: "/dashboard/technician",
  operator: "/dashboard/operator",
  viewer: "/dashboard/viewer",
};

// Routes that don't require authentication
const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/auth/verify-email",
  "/dashboard", // Redirect page
];

// ============ PROVIDER ============
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check if user is authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const accessToken = localStorage.getItem("access_token");

        if (storedUser && accessToken) {
          // Try to verify token by fetching current user
          try {
            const response = await authService.getMe();
            if (response.success && response.data) {
              setUser(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
            } else {
              // Token may be invalid, try to refresh
              await attemptTokenRefresh();
            }
          } catch {
            // Token invalid, try refresh token
            await attemptTokenRefresh();
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Attempt to refresh the access token
  const attemptTokenRefresh = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      clearAuthData();
      return;
    }

    try {
      const response = await authService.refresh({
        refresh_token: refreshToken,
      });
      if (response.success && response.data) {
        localStorage.setItem("access_token", response.data.access_token);
        // Fetch user data with new token
        const userResponse = await authService.getMe();
        if (userResponse.success && userResponse.data) {
          setUser(userResponse.data);
          localStorage.setItem("user", JSON.stringify(userResponse.data));
        }
      } else {
        clearAuthData();
      }
    } catch {
      clearAuthData();
    }
  };

  // Clear all auth data
  const clearAuthData = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  // Redirect based on auth state and role
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith("/auth/")
    );

    if (!user && !isPublicRoute) {
      // Not logged in and trying to access protected route
      router.push("/auth/login");
    } else if (
      user &&
      pathname.startsWith("/auth/") &&
      !pathname.includes("verify-email")
    ) {
      // Logged in but on auth page - redirect to role-based dashboard
      router.push(roleHomeRoutes[user.role]);
    } else if (user && pathname === "/dashboard") {
      // On generic dashboard route - redirect to role-based dashboard
      router.push(roleHomeRoutes[user.role]);
    }
  }, [user, isLoading, pathname, router]);

  const login = useCallback(
    async (credentials: LoginRequest) => {
      try {
        setIsLoading(true);
        const response = await authService.login(credentials);

        if (response.success && response.data) {
          const { access_token, refresh_token } = response.data;

          // Store tokens first
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // Now fetch user data with the new token
          const userResponse = await authService.getMe();
          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data as User;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Redirect to role-based dashboard
            router.push(roleHomeRoutes[userData.role]);
          } else {
            throw new Error("Failed to fetch user profile");
          }
        } else {
          throw new Error(response.error || "Login failed");
        }
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const register = useCallback(
    async (data: RegisterRequest) => {
      try {
        setIsLoading(true);
        const response = await authService.register(data);

        if (response.success && response.data) {
          // Backend returns tokens on successful registration
          const { access_token, refresh_token } = response.data;

          // Store tokens
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);

          // Fetch user data
          const userResponse = await authService.getMe();
          if (userResponse.success && userResponse.data) {
            const userData = userResponse.data as User;
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            // Redirect to role-based dashboard
            router.push(roleHomeRoutes[userData.role]);
          } else {
            // If we can't get user data, redirect to login
            router.push("/auth/login?registered=true");
          }
        } else {
          throw new Error(response.error || "Registration failed");
        }
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [router]
  );

  const logout = useCallback(async () => {
    try {
      // Call logout endpoint to invalidate server session
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
      router.push("/auth/login");
    }
  }, [router]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await authService.getMe();
      if (response.success && response.data) {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Refresh user error:", error);
    }
  }, []);

  // Check if user has a specific permission
  // This is a simplified check - the actual permission check happens on backend
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!user) return false;

      // Super admin has all permissions
      if (user.role === "super_admin") return true;

      // For now, we'll use a simple role-based check
      // In production, you might want to store permissions in the user object
      const rolePermissions: Record<UserRole, string[]> = {
        super_admin: ["*"],
        admin: [
          "organization:*",
          "user:*",
          "equipment:*",
          "workorder:*",
          "schedule:*",
          "parts:*",
          "report:*",
        ],
        manager: [
          "equipment:*",
          "workorder:*",
          "schedule:*",
          "parts:*",
          "report:read",
        ],
        technician: [
          "equipment:read",
          "equipment:update",
          "workorder:read",
          "workorder:update",
          "parts:read",
          "parts:use",
        ],
        operator: [
          "equipment:read",
          "equipment:report_issue",
          "workorder:create",
          "workorder:read",
        ],
        viewer: [
          "equipment:read",
          "workorder:read",
          "schedule:read",
          "parts:read",
          "report:read",
        ],
      };

      const userPermissions = rolePermissions[user.role] || [];

      // Check exact match
      if (userPermissions.includes(permission)) return true;

      // Check wildcard
      const [resource] = permission.split(":");
      if (userPermissions.includes(`${resource}:*`)) return true;
      if (userPermissions.includes("*")) return true;

      return false;
    },
    [user]
  );

  // Get user display name
  const getUserDisplayName = useCallback((): string => {
    if (!user) return "User";
    return `${user.first_name} ${user.last_name}`.trim() || user.email;
  }, [user]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
    hasPermission,
    getUserDisplayName,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============ HOOK ============
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============ HELPER HOOK FOR ROLE CHECK ============
export function useRequireRole(allowedRoles: UserRole[]) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user && !allowedRoles.includes(user.role)) {
      // User doesn't have permission - redirect to their dashboard
      router.push(roleHomeRoutes[user.role]);
    }
  }, [user, isLoading, allowedRoles, router]);

  return {
    user,
    isLoading,
    hasAccess: user ? allowedRoles.includes(user.role) : false,
  };
}

// ============ PERMISSION HOOK ============
export function usePermission(permission: string) {
  const { hasPermission, isLoading } = useAuth();
  return {
    hasPermission: hasPermission(permission),
    isLoading,
  };
}

// ============ ROLE-BASED REDIRECT HELPER ============
export function getRoleBasedRoute(role: UserRole): string {
  return roleHomeRoutes[role];
}

// ============ ROLE LABEL HELPER ============
export function getRoleLabel(role: UserRole): string {
  return ROLE_LABELS[role] || role;
}
