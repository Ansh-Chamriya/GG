"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";
import { UserRole } from "@/app/lib/api";
import { Shield, Loader2 } from "lucide-react";

export default function SignupPage() {
  const { register, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "" as UserRole | "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "", general: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      general: "",
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
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
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role as UserRole,
      });
      // Redirect to login is handled by AuthContext
    } catch (error) {
      setErrors((p) => ({
        ...p,
        general:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoading = isSubmitting || authLoading;

  const roleOptions: { value: UserRole; label: string; description: string }[] =
    [
      {
        value: "super-admin",
        label: "Super Admin",
        description: "Platform-level access",
      },
      {
        value: "admin",
        label: "Admin",
        description: "Organization management",
      },
      {
        value: "manager",
        label: "Manager",
        description: "Team & workflow management",
      },
      {
        value: "technician",
        label: "Technician",
        description: "Task execution",
      },
    ];

  return (
    <>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
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
          Create your account
        </h1>
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          Start managing maintenance with GearGuard
        </p>
      </div>

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
        {/* Full Name */}
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Full Name
          </label>
          <input
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
            style={{
              border: errors.fullName
                ? "1px solid var(--danger)"
                : "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            placeholder="John Smith"
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 2px var(--primary-100)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          {errors.fullName && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.fullName}
            </p>
          )}
        </div>

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
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Password
          </label>
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

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
            style={{
              border: errors.confirmPassword
                ? "1px solid var(--danger)"
                : "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            placeholder="••••••••"
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 2px var(--primary-100)")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
          {errors.confirmPassword && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Role
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={isLoading}
            className="h-11 w-full rounded-lg px-3 text-sm bg-transparent outline-none disabled:opacity-50"
            style={{
              border: errors.role
                ? "1px solid var(--danger)"
                : "1px solid var(--border)",
              color: formData.role
                ? "var(--foreground)"
                : "var(--foreground-muted)",
            }}
          >
            <option value="">Select your role</option>
            {roleOptions.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label} - {role.description}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.role}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl py-3 font-medium transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          style={{
            background:
              "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
            color: "white",
          }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="text-center text-sm mt-6">
        <span style={{ color: "var(--foreground-muted)" }}>
          Already have an account?{" "}
        </span>
        <Link
          href="/auth/login"
          className="font-semibold hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Sign in
        </Link>
      </div>
    </>
  );
}
