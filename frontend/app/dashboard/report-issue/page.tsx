"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Camera, MapPin, Send } from "lucide-react";
import { DashboardLayout } from "@/app/components/dashboard/shared";

export default function ReportIssuePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        equipment: "",
        location: "",
        priority: "medium",
        description: "",
        attachments: [] as File[]
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        alert("Issue reported successfully!");
        router.push("/dashboard/my-requests");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <DashboardLayout title="Report Issue">
            <div className="max-w-2xl mx-auto">
                <div className="card p-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6 pb-6 border-b" style={{ borderColor: "var(--border)" }}>
                        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Report an Issue</h2>
                            <p className="text-sm text-gray-500">Submit a maintenance request or report equipment problems</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Issue Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                required
                                className="input"
                                placeholder="Brief description of the issue"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Equipment Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Equipment *
                            </label>
                            <select
                                name="equipment"
                                required
                                className="input"
                                value={formData.equipment}
                                onChange={handleChange}
                            >
                                <option value="">Select equipment</option>
                                <option value="pump-1">Centrifugal Pump #1</option>
                                <option value="hvac-main">Main HVAC Unit</option>
                                <option value="conveyor-a">Assembly Conveyor A</option>
                                <option value="generator">Backup Generator</option>
                                <option value="compressor">Air Compressor</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Location
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    className="input pl-10"
                                    placeholder="Building, floor, or area"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Priority */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority Level *
                            </label>
                            <div className="grid grid-cols-4 gap-2">
                                {["low", "medium", "high", "critical"].map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, priority: p }))}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${formData.priority === p
                                                ? p === "critical"
                                                    ? "bg-red-500 text-white"
                                                    : p === "high"
                                                        ? "bg-orange-500 text-white"
                                                        : p === "medium"
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-500 text-white"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                required
                                rows={4}
                                className="input resize-none"
                                placeholder="Describe the issue in detail..."
                                value={formData.description}
                                onChange={handleChange}
                                style={{ height: "auto" }}
                            />
                        </div>

                        {/* Attachments */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Attachments
                            </label>
                            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                                style={{ borderColor: "var(--border)" }}>
                                <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">
                                    Click to upload or drag and drop
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    PNG, JPG up to 10MB
                                </p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                className="btn btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="btn btn-primary flex-1"
                            >
                                {isSubmitting ? (
                                    "Submitting..."
                                ) : (
                                    <>
                                        <Send className="w-4 h-4" />
                                        Submit Report
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}
