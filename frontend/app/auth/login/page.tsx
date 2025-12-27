"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

type Status =
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null;

export default function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [status, setStatus] = useState<Status>(null);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Invalid email address";
        return "";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const emailError = validateEmail(formData.email);
        const passwordError = !formData.password ? "Password is required" : "";

        if (emailError || passwordError) {
            setErrors({ email: emailError, password: passwordError });
            return;
        }

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);

        setStatus({
            type: "success",
            message: "Login successful! Redirecting...",
        });
    };

    return (
        <>
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                >
                    Welcome back
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    Access your GearGuard workspace
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
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
                        value={formData.email}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent"
                        style={{
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                        onFocus={(e) =>
                        (e.currentTarget.style.boxShadow =
                            "0 0 0 2px var(--primary-100)")
                        }
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
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
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent"
                        style={{
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                        onFocus={(e) =>
                        (e.currentTarget.style.boxShadow =
                            "0 0 0 2px var(--primary-100)")
                        }
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                </div>

                {/* Status */}
                {status && (
                    <div
                        className="rounded-lg p-3 text-sm"
                        style={
                            status.type === "success"
                                ? {
                                    backgroundColor: "var(--primary-50)",
                                    color: "var(--primary)",
                                    border: "1px solid var(--primary-100)",
                                }
                                : {
                                    backgroundColor: "#fee2e2",
                                    color: "#b91c1c",
                                }
                        }
                    >
                        {status.message}
                    </div>
                )}

                {/* Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl py-2.5 font-medium transition-all disabled:opacity-50"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                        color: "white",
                    }}
                >
                    {loading ? "Signing in…" : "Sign In"}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm">
                <span style={{ color: "var(--foreground-muted)" }}>
                    Don&apos;t have an account?{" "}
                </span>
                <Link
                    href="/auth/signup"
                    className="font-semibold hover:underline"
                    style={{ color: "var(--primary)" }}
                >
                    Sign up
                </Link>
            </div>
        </>
    );
}
