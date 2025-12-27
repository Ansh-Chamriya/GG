"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type Status =
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null;

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<Status>(null);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return "Invalid email address";
        return "";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        setError("");
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const emailError = validateEmail(email);
        if (emailError) {
            setError(emailError);
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);

        // Always show success for security
        setStatus({
            type: "success",
            message: "If an account exists for this email, we have sent a password reset link.",
        });
        setEmail("");
    };

    return (
        <>
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                >
                    Forgot your password?
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    Enter your email to receive a reset link
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {/* Email */}
                <div className="space-y-1.5">
                    <label
                        className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg px-3 text-sm outline-none bg-transparent"
                        style={{
                            border: "1px solid var(--border)",
                            color: "var(--foreground)",
                        }}
                        placeholder="name@example.com"
                        onFocus={(e) =>
                        (e.currentTarget.style.boxShadow =
                            "0 0 0 2px var(--primary-100)")
                        }
                        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                    {error && (
                        <p className="text-xs text-red-500">{error}</p>
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
                    {loading ? "Sending link..." : "Send reset link"}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm mt-6">
                <Link
                    href="/auth/login"
                    className="font-medium hover:underline inline-flex items-center gap-1"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    <ArrowLeftIcon className="h-3 w-3" />
                    Back to login
                </Link>
            </div>
        </>
    );
}
