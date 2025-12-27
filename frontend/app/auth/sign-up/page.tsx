"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { useAuth } from "@/app/lib/auth";
import { Shield, Loader2, Building2 } from "lucide-react";

export default function SignupPage() {
  const { register, isLoading: authLoading } = useAuth();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization_name: "", // Creates new org with user as admin
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization_name: "",
    general: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      });
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
        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          {/* First Name */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              First Name
            </label>
            <input
              name="first_name"
              type="text"
              value={formData.first_name}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
              style={{
                border: errors.first_name
                  ? "1px solid var(--danger)"
                  : "1px solid var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="John"
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--primary-100)")
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            />
            {errors.first_name && (
              <p className="text-xs" style={{ color: "var(--danger)" }}>
                {errors.first_name}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Last Name
            </label>
            <input
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent disabled:opacity-50"
              style={{
                border: errors.last_name
                  ? "1px solid var(--danger)"
                  : "1px solid var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="Smith"
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--primary-100)")
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            />
            {errors.last_name && (
              <p className="text-xs" style={{ color: "var(--danger)" }}>
                {errors.last_name}
              </p>
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

        {/* Organization Name */}
        <div className="space-y-1.5">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Organization Name
          </label>
          <div className="relative">
            <Building2
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: "var(--foreground-muted)" }}
            />
            <input
              name="organization_name"
              type="text"
              value={formData.organization_name}
              onChange={handleChange}
              disabled={isLoading}
              className="h-11 w-full rounded-lg pl-10 pr-3 text-sm outline-none bg-transparent disabled:opacity-50"
              style={{
                border: errors.organization_name
                  ? "1px solid var(--danger)"
                  : "1px solid var(--border)",
                color: "var(--foreground)",
              }}
              placeholder="Your Company Inc."
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 0 2px var(--primary-100)")
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            />
          </div>
          <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
            You&apos;ll be the admin of this organization
          </p>
          {errors.organization_name && (
            <p className="text-xs" style={{ color: "var(--danger)" }}>
              {errors.organization_name}
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
