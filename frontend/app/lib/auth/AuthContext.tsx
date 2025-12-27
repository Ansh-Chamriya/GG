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
  authService,
} from "@/app/lib/api";

// ============ TYPES ============
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// ============ CONTEXT ============
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ============ ROLE-BASED ROUTES ============
const roleHomeRoutes: Record<UserRole, string> = {
  "super-admin": "/dashboard/super-admin",
  admin: "/dashboard/admin",
  manager: "/dashboard/manager",
  technician: "/dashboard/technician",
};

const publicRoutes = [
  "/",
  "/auth/login",
  "/auth/sign-up",
  "/auth/forgot-password",
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
        const accessToken = localStorage.getItem("accessToken");

        if (storedUser && accessToken) {
          // Verify token is still valid by fetching user
          try {
            const response = await authService.getMe();
            if (response.success && response.data) {
              setUser(response.data);
              localStorage.setItem("user", JSON.stringify(response.data));
            }
          } catch {
            // Token invalid, use stored user data for now
            // In production, you might want to refresh the token
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        // Clear invalid auth data
        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Redirect based on auth state and role
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith("/auth/")
    );

    if (!user && !isPublicRoute) {
      // Not logged in and trying to access protected route
      router.push("/auth/login");
    } else if (user && pathname.startsWith("/auth/")) {
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
          const { user: userData, accessToken, refreshToken } = response.data;

          // Store auth data
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          setUser(userData);

          // Redirect to role-based dashboard
          router.push(roleHomeRoutes[userData.role]);
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

        if (response.success) {
          // After registration, redirect to login
          router.push("/auth/login?registered=true");
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
      // Call logout endpoint
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
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

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
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

// ============ ROLE-BASED REDIRECT HELPER ============
export function getRoleBasedRoute(role: UserRole): string {
  return roleHomeRoutes[role];
}
