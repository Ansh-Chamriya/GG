"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    DashboardLayout,
    SectionHeader,
    RoleBadge,
    roleConfig,
} from "@/app/components/dashboard/shared";
import { UserRole } from "@/app/lib/api";
import {
    UserPlus,
    ArrowLeft,
    Mail,
    User,
    Shield,
    Users,
    Wrench,
    Crown,
    Loader2,
    Send,
} from "lucide-react";
import Link from "next/link";

export default function InviteUserPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "technician" as UserRole,
        department: "",
        sendInvite: true,
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleRoleSelect = (role: UserRole) => {
        setFormData((prev) => ({ ...prev, role }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Integrate with backend API
        // For now, simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Inviting user:", formData);
        setIsSubmitting(false);

        // Navigate back to users list
        router.push("/dashboard/users");
    };

    const roles: { id: UserRole; icon: React.ReactNode }[] = [
        { id: "super_admin", icon: <Crown className="w-5 h-5" /> },
        { id: "admin", icon: <Shield className="w-5 h-5" /> },
        { id: "manager", icon: <Users className="w-5 h-5" /> },
        { id: "technician", icon: <Wrench className="w-5 h-5" /> },
    ];

    const departments = [
        "Engineering",
        "Maintenance",
        "Operations",
        "Facilities",
        "IT",
        "Management",
        "Other",
    ];

    return (
        <DashboardLayout title="Invite User">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/dashboard/users"
                    className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Users
                </Link>

                {/* Header */}
                <div className="card p-6 mb-6">
                    <div className="flex items-center gap-4">
                        <div
                            className="w-14 h-14 rounded-2xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
                            }}
                        >
                            <UserPlus className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-xl font-bold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Invite New User
                            </h1>
                            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                                Add a team member and assign their role and permissions
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="card p-6">
                        <SectionHeader
                            title="User Information"
                            subtitle="Name and email for the new user"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    First Name *
                                </label>
                                <div className="relative">
                                    <User
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                        style={{ color: "var(--foreground-muted)" }}
                                    />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Last Name *
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Doe"
                                    className="input w-full"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Email Address *
                                </label>
                                <div className="relative">
                                    <Mail
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                        style={{ color: "var(--foreground-muted)" }}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="john.doe@company.com"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Department
                                </label>
                                <select
                                    name="department"
                                    value={formData.department}
                                    onChange={handleChange}
                                    className="input w-full"
                                >
                                    <option value="">Select department</option>
                                    {departments.map((dept) => (
                                        <option key={dept} value={dept}>
                                            {dept}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className="card p-6">
                        <SectionHeader
                            title="Assign Role"
                            subtitle="Select the user's role and access level"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            {roles.map((role) => {
                                const config = roleConfig[role.id];
                                const isSelected = formData.role === role.id;

                                return (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => handleRoleSelect(role.id)}
                                        className={`p-4 rounded-xl border-2 text-left transition-all ${isSelected ? "shadow-lg" : "hover:shadow-md"
                                            }`}
                                        style={{
                                            borderColor: isSelected ? config.color : "var(--border)",
                                            background: isSelected ? `${config.color}10` : "var(--background)",
                                        }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center"
                                                style={{
                                                    background: isSelected ? config.gradient : `${config.color}20`,
                                                    color: isSelected ? "white" : config.color,
                                                }}
                                            >
                                                {role.icon}
                                            </div>
                                            <div className="flex-1">
                                                <div
                                                    className="font-semibold text-sm flex items-center gap-2"
                                                    style={{ color: isSelected ? config.color : "var(--foreground)" }}
                                                >
                                                    {config.label}
                                                    {isSelected && (
                                                        <span
                                                            className="text-xs px-2 py-0.5 rounded-full"
                                                            style={{ background: config.gradient, color: "white" }}
                                                        >
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>
                                                <p
                                                    className="text-xs mt-0.5"
                                                    style={{ color: "var(--foreground-muted)" }}
                                                >
                                                    {config.description}
                                                </p>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Invitation Options */}
                    <div className="card p-6">
                        <SectionHeader
                            title="Invitation"
                            subtitle="Send email invitation to the user"
                        />
                        <div className="mt-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="sendInvite"
                                    checked={formData.sendInvite}
                                    onChange={handleChange}
                                    className="w-5 h-5 rounded accent-teal-600"
                                />
                                <div>
                                    <span
                                        className="font-medium text-sm"
                                        style={{ color: "var(--foreground)" }}
                                    >
                                        Send invitation email
                                    </span>
                                    <p
                                        className="text-xs"
                                        style={{ color: "var(--foreground-muted)" }}
                                    >
                                        User will receive an email with login instructions
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Link href="/dashboard/users" className="btn btn-secondary">
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.firstName || !formData.email}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    Send Invitation
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
