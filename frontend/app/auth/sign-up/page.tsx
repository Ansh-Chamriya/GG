"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";
import { Shield, Loader2, Building2, Users, Wrench, Settings, Eye, Crown } from "lucide-react";

export default function SignupPage() {
  const { register, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization_name: "", // Creates new org with user as admin
    role: "admin", // Default role
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization_name: "",
    role: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "", general: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
      organization_name: "",
      role: "",
      general: "",
    };
    let isValid = true;

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
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
    } else if (!/[A-Z]/.test(formData.password)) {
      newErrors.password = "Password must contain an uppercase letter";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.organization_name.trim()) {
      newErrors.organization_name = "Organization name is required";
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
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        organization_name: formData.organization_name,
        role: formData.role,
      } as any); // Type cast to bypass potential interface mismatch in blocked file
      // Redirect is handled by AuthContext
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

  return (
    <>
      <div className="mb-8 text-center">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--foreground)" }}
        >
          Create your account
        </h1>
        <p style={{ color: "var(--foreground-muted)" }}>
          Start managing your equipment like a pro
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              First Name
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className={`w-full h-11 px-4 rounded-xl outline-none transition-all ${errors.first_name
                ? "border-red-500 bg-red-50"
                : "bg-gray-50 border-transparent focus:bg-white focus:ring-2"
                }`}
              style={{
                border: errors.first_name
                  ? "1px solid var(--danger)"
                  : "1px solid transparent",
                boxShadow: errors.first_name ? "none" : undefined,
              }}
              placeholder="John"
            />
            {errors.first_name && (
              <p className="text-xs text-red-500">{errors.first_name}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Last Name
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className={`w-full h-11 px-4 rounded-xl outline-none transition-all ${errors.last_name
                ? "border-red-500 bg-red-50"
                : "bg-gray-50 border-transparent focus:bg-white focus:ring-2"
                }`}
              style={{
                border: errors.last_name
                  ? "1px solid var(--danger)"
                  : "1px solid transparent",
              }}
              placeholder="Doe"
            />
            {errors.last_name && (
              <p className="text-xs text-red-500">{errors.last_name}</p>
            )}
          </div>
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
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full h-11 px-4 rounded-xl outline-none transition-all ${errors.email
              ? "border-red-500 bg-red-50"
              : "bg-gray-50 border-transparent focus:bg-white focus:ring-2"
              }`}
            style={{
              border: errors.email
                ? "1px solid var(--danger)"
                : "1px solid transparent",
            }}
            placeholder="john@company.com"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email}</p>
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
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full h-11 px-4 rounded-xl outline-none transition-all ${errors.password
              ? "border-red-500 bg-red-50"
              : "bg-gray-50 border-transparent focus:bg-white focus:ring-2"
              }`}
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
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            At least 8 characters with one uppercase letter
          </p>
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

        {/* Organization Name */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Building2
              className="w-4 h-4"
              style={{ color: "var(--primary)" }}
            />
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Organization Name
            </label>
          </div>
          <input
            type="text"
            name="organization_name"
            value={formData.organization_name}
            onChange={handleChange}
            className={`w-full h-11 px-4 rounded-xl outline-none transition-all ${errors.organization_name
              ? "border-red-500 bg-red-50"
              : "bg-gray-50 border-transparent focus:bg-white focus:ring-2"
              }`}
            style={{
              border: errors.organization_name
                ? "1px solid var(--danger)"
                : "1px solid transparent",
            }}
            placeholder="My Company Ltd."
          />
          {errors.organization_name && (
            <p className="text-xs text-red-500">{errors.organization_name}</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="space-y-3 pt-2">
          <label
            className="text-sm font-medium block"
            style={{ color: "var(--foreground)" }}
          >
            Select your Role
          </label>
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            Choose the role that best describes your responsibilities
          </p>
          <div className="grid grid-cols-1 gap-3 mt-2">
            {[
              {
                id: "super_admin",
                label: "Super Admin",
                desc: "Full system access across all organizations",
                icon: <Crown className="w-5 h-5" />,
                color: "#ef4444",
                gradient: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              },
              {
                id: "admin",
                label: "Administrator",
                desc: "Full access to manage organization, users & equipment",
                icon: <Shield className="w-5 h-5" />,
                color: "#f59e0b",
                gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              },
              {
                id: "manager",
                label: "Manager",
                desc: "Manage teams, work orders & maintenance schedules",
                icon: <Users className="w-5 h-5" />,
                color: "#0d9488",
                gradient: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
              },
              {
                id: "technician",
                label: "Technician",
                desc: "Execute work orders, report issues & track tasks",
                icon: <Wrench className="w-5 h-5" />,
                color: "#10b981",
                gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              },
            ].map((role) => (
              <label
                key={role.id}
                className={`relative flex items-center p-4 rounded-xl cursor-pointer border-2 transition-all transform hover:scale-[1.01] ${formData.role === role.id
                  ? "shadow-lg"
                  : "hover:shadow-md"
                  }`}
                style={{
                  borderColor:
                    formData.role === role.id ? role.color : "var(--border)",
                  background:
                    formData.role === role.id
                      ? `${role.color}15`
                      : "var(--background)",
                }}
              >
                <input
                  type="radio"
                  name="role"
                  value={role.id}
                  checked={formData.role === role.id}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mr-4 shrink-0 transition-all"
                  style={{
                    background: formData.role === role.id ? role.gradient : `${role.color}20`,
                    color: formData.role === role.id ? "white" : role.color,
                    transform: formData.role === role.id ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  {role.icon}
                </div>
                <div className="flex-1">
                  <div
                    className="font-semibold text-sm flex items-center gap-2"
                    style={{ color: formData.role === role.id ? role.color : "var(--foreground)" }}
                  >
                    {role.label}
                    {formData.role === role.id && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: role.gradient, color: "white" }}
                      >
                        Selected
                      </span>
                    )}
                  </div>
                  <div
                    className="text-xs mt-0.5"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {role.desc}
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.role === role.id ? "scale-100" : "scale-90 opacity-40"
                    }`}
                  style={{
                    borderColor: role.color,
                    background: formData.role === role.id ? role.color : "transparent",
                  }}
                >
                  {formData.role === role.id && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </label>
            ))}
          </div>
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
