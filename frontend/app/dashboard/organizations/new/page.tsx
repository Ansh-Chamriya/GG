"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    DashboardLayout,
    SectionHeader,
} from "@/app/components/dashboard/shared";
import {
    Building2,
    ArrowLeft,
    Globe,
    Mail,
    Phone,
    MapPin,
    Users,
    Loader2,
    Save,
} from "lucide-react";
import Link from "next/link";

export default function NewOrganizationPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        country: "",
        description: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // TODO: Integrate with backend API
        // For now, simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log("Creating organization:", formData);
        setIsSubmitting(false);

        // Navigate back to organizations list
        router.push("/dashboard/organizations");
    };

    const industries = [
        "Manufacturing",
        "Healthcare",
        "Energy & Utilities",
        "Transportation",
        "Hospitality",
        "Retail",
        "Technology",
        "Construction",
        "Other",
    ];

    return (
        <DashboardLayout title="Add Organization">
            <div className="max-w-3xl mx-auto">
                {/* Back Button */}
                <Link
                    href="/dashboard/organizations"
                    className="inline-flex items-center gap-2 text-sm mb-6 hover:opacity-80 transition-opacity"
                    style={{ color: "var(--foreground-muted)" }}
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Organizations
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
                            <Building2 className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-xl font-bold"
                                style={{ color: "var(--foreground)" }}
                            >
                                Create New Organization
                            </h1>
                            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
                                Add a new organization to manage its equipment and teams
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="card p-6">
                        <SectionHeader
                            title="Basic Information"
                            subtitle="Organization name and industry"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Organization Name *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter organization name"
                                    className="input w-full"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Industry
                                </label>
                                <select
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="input w-full"
                                >
                                    <option value="">Select industry</option>
                                    {industries.map((ind) => (
                                        <option key={ind} value={ind}>
                                            {ind}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Website
                                </label>
                                <div className="relative">
                                    <Globe
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                        style={{ color: "var(--foreground-muted)" }}
                                    />
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        placeholder="https://example.com"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="card p-6">
                        <SectionHeader
                            title="Contact Information"
                            subtitle="Email and phone for the organization"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Email
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
                                        placeholder="contact@organization.com"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Phone
                                </label>
                                <div className="relative">
                                    <Phone
                                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                                        style={{ color: "var(--foreground-muted)" }}
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 (555) 123-4567"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="card p-6">
                        <SectionHeader title="Location" subtitle="Address and region" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="md:col-span-2">
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Address
                                </label>
                                <div className="relative">
                                    <MapPin
                                        className="absolute left-3 top-3 w-4 h-4"
                                        style={{ color: "var(--foreground-muted)" }}
                                    />
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Street address"
                                        className="input w-full pl-10"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="input w-full"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-sm font-medium mb-2"
                                    style={{ color: "var(--foreground)" }}
                                >
                                    Country
                                </label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="input w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="card p-6">
                        <SectionHeader title="Description" subtitle="Additional notes" />
                        <div className="mt-4">
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="Brief description of the organization..."
                                className="input w-full resize-none"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href="/dashboard/organizations"
                            className="btn btn-secondary"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting || !formData.name}
                            className="btn btn-primary flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Create Organization
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
