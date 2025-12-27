"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/app/lib/auth";
import { Shield, Loader2, CheckCircle2, Users, Wrench, Settings, Crown } from "lucide-react";

function LoginForm() {
  const { login, isLoading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Show success message if just registered
  useEffect(() => {
    if (justRegistered) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [justRegistered]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((p) => ({ ...p, [name]: "", general: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors = { email: "", password: "", general: "" };
    let isValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((p) => ({ ...p, general: "" }));

    try {
      await login({
        email: formData.email,
        password: formData.password,
      });
      // Redirect is handled by AuthContext based on user role
    } catch (error) {
      setErrors((p) => ({
        ...p,
        general:
          error instanceof Error
            ? error.message
            : "Invalid email or password. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  return (
    <>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
          }}
        >
          <Shield className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Header */}
      <div className="space-y-2 text-center">
        <h1
          className="text-3xl font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          Sign in to your GearGuard account
        </p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl mt-4 animate-fade-in"
          style={{ background: "var(--success-light)" }}
        >
          <CheckCircle2
            className="w-5 h-5 shrink-0"
            style={{ color: "var(--success)" }}
          />
          <p className="text-sm" style={{ color: "var(--success)" }}>
            Account created successfully! Please sign in.
          </p>
        </div>
      )}

      {/* Error Message */}
      {errors.general && (
        <div
          className="p-4 rounded-xl mt-4"
          style={{ background: "var(--danger-light)" }}
        >
          <p className="text-sm" style={{ color: "var(--danger)" }}>
            {errors.general}
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        {/* Email */}
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
            style={{
              border: errors.email
                ? "1px solid var(--danger)"
                : "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            placeholder="you@company.com"
            autoComplete="email"
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 2px var(--primary-100)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          {errors.email && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Password
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-medium hover:underline"
              style={{ color: "var(--primary)" }}
            >
              Forgot password?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
            style={{
              border: errors.password
                ? "1px solid var(--danger)"
                : "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            placeholder="••••••••"
            autoComplete="current-password"
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 2px var(--primary-100)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary py-3 rounded-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm mt-6">
        <span style={{ color: "var(--foreground-muted)" }}>
          Don&apos;t have an account?{" "}
        </span>
        <Link
          href="/auth/sign-up"
          className="font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Create account
        </Link>
      </div>

      {/* Role-Based Demo Accounts */}
      <div
        className="mt-6 p-4 rounded-xl"
        style={{ background: "var(--background-secondary)" }}
      >
        <p className="text-xs font-semibold mb-3" style={{ color: "var(--foreground)" }}>
          Role-Based Access Control
        </p>
        <div className="space-y-2">
          {[
            {
              role: "Super Admin",
              icon: <Crown className="w-4 h-4" />,
              desc: "Full system access",
              color: "#ef4444",
            },
            {
              role: "Admin",
              icon: <Shield className="w-4 h-4" />,
              desc: "Organization access",
              color: "#f59e0b",
            },
            {
              role: "Manager",
              icon: <Users className="w-4 h-4" />,
              desc: "Team & schedules",
              color: "#0d9488",
            },
            {
              role: "Technician",
              icon: <Wrench className="w-4 h-4" />,
              desc: "Task execution",
              color: "#10b981",
            },
          ].map((item) => (
            <div
              key={item.role}
              className="flex items-center gap-2 p-2 rounded-lg transition-all cursor-default"
              style={{ background: `${item.color}10` }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <div className="flex-1">
                <span
                  className="text-xs font-medium"
                  style={{ color: item.color }}
                >
                  {item.role}
                </span>
                <span
                  className="text-xs ml-2"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  • {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: "var(--foreground-subtle)" }}>
          Register with your preferred role to explore
        </p>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
