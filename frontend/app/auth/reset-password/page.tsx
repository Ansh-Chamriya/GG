"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

type Status =
    | { type: "success"; message: string }
    | { type: "error"; message: string }
    | null;

function ResetPasswordForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [status, setStatus] = useState<Status>(null);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Validation state
    const [validations, setValidations] = useState({
        length: false,
        upper: false,
        lower: false,
        number: false,
        special: false,
        match: false,
    });

    useEffect(() => {
        if (!token) {
            setStatus({ type: "error", message: "Invalid or missing reset token." });
        }
    }, [token]);

    const validatePassword = (pwd: string, confirm: string) => {
        setValidations({
            length: pwd.length >= 8,
            upper: /[A-Z]/.test(pwd),
            lower: /[a-z]/.test(pwd),
            number: /[0-9]/.test(pwd),
            special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
            match: pwd === confirm && pwd !== "",
        });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newData = { ...formData, [name]: value };
        setFormData(newData);
        validatePassword(newData.password, newData.confirmPassword);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!token) return;

        const allValid = Object.values(validations).every(Boolean);
        if (!allValid) {
            return;
        }

        setLoading(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 2000));
        setLoading(false);

        setStatus({
            type: "success",
            message: "Password reset successfully. Redirecting to login...",
        });

        setTimeout(() => {
            router.push("/auth/login");
        }, 2000);
    };

    const ValidationItem = ({ valid, text }: { valid: boolean; text: string }) => (
        <div className="flex items-center gap-2 text-xs">
            {valid ? (
                <CheckCircleIcon className="h-4 w-4 text-green-500" />
            ) : (
                <XCircleIcon className="h-4 w-4 text-gray-400" />
            )}
            <span className={valid ? "text-green-600" : "text-gray-500"}>
                {text}
            </span>
        </div>
    );

    return (
        <>
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                >
                    Reset your password
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    Create a strong new password for your account
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                {/* New Password */}
                <div className="space-y-1.5">
                    <label
                        className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                        htmlFor="password"
                    >
                        New Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            className="h-11 w-full rounded-lg px-3 pr-10 text-sm outline-none bg-transparent"
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
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? (
                                <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                                <EyeIcon className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <label
                        className="text-sm font-medium"
                        style={{ color: "var(--foreground)" }}
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.confirmPassword}
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
                </div>

                {/* Validation Rules */}
                <div className="grid grid-cols-1 gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
                    <ValidationItem valid={validations.length} text="At least 8 characters" />
                    <div className="grid grid-cols-2 gap-2">
                        <ValidationItem valid={validations.upper} text="Uppercase letter" />
                        <ValidationItem valid={validations.lower} text="Lowercase letter" />
                        <ValidationItem valid={validations.number} text="Number" />
                        <ValidationItem valid={validations.special} text="Special character" />
                    </div>
                    <ValidationItem valid={validations.match} text="Passwords match" />
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
                    disabled={loading || !Object.values(validations).every(Boolean) || !token}
                    className="w-full rounded-xl py-2.5 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                        background:
                            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                        color: "white",
                    }}
                >
                    {loading ? "Resetting password..." : "Reset password"}
                </button>
            </form>
        </>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading...</div>}>
            <ResetPasswordForm />
        </Suspense>
    );
}
