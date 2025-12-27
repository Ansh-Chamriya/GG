"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Link from "next/link";

export default function SignupPage() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [errors, setErrors] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
        setErrors((p) => ({ ...p, [name]: "" }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setLoading(false);
    };

    return (
        <>
            {/* Header */}
            <div className="space-y-2 text-center">
                <h1
                    className="text-3xl font-bold"
                    style={{ color: "var(--foreground)" }}
                >
                    Create your account
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    Start managing maintenance with GearGuard
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {[
                    { label: "Full Name", name: "fullName", type: "text" },
                    { label: "Email", name: "email", type: "email" },
                    { label: "Password", name: "password", type: "password" },
                    { label: "Confirm Password", name: "confirmPassword", type: "password" },
                ].map((field) => (
                    <div key={field.name} className="space-y-1.5">
                        <label
                            className="text-sm font-medium"
                            style={{ color: "var(--foreground)" }}
                        >
                            {field.label}
                        </label>
                        <input
                            name={field.name}
                            type={field.type}
                            value={(formData as any)[field.name]}
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
                        {(errors as any)[field.name] && (
                            <p className="text-xs text-red-500">
                                {(errors as any)[field.name]}
                            </p>
                        )}
                    </div>
                ))}

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
                        className="h-11 w-full rounded-lg px-3 text-sm bg-transparent outline-none"
                        style={{ border: "1px solid var(--border)" }}
                    >
                        <option value="">Select role</option>
                        <option>Super Admin</option>
                        <option>Admin</option>
                        <option>Manager</option>
                        <option>Technician</option>
                    </select>
                </div>

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
                    {loading ? "Creating account…" : "Create Account"}
                </button>
            </form>

            {/* Footer */}
            <div className="text-center text-sm">
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
