'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Status =
    | { type: 'success'; message: string }
    | { type: 'error'; message: string }
    | null;

/**
 * IMPORTANT:
 * Values now match DB role IDs exactly
 */
const ROLE_OPTIONS = [
    { value: 'role_super_admin', label: 'Super Admin' },
    { value: 'role_admin', label: 'Admin' },
    { value: 'role_manager', label: 'Manager' },
    { value: 'role_technician', label: 'Technician' },
];


export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
    });

    const [status, setStatus] = useState<Status>(null);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return 'Invalid email address';
        return '';
    };

    const validatePassword = (password: string) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain a number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
            return 'Password must contain a special character';
        return '';
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const newErrors = {
            fullName: !formData.fullName ? 'Full name is required' : '',
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword:
                formData.password !== formData.confirmPassword
                    ? 'Passwords do not match'
                    : '',
            role: !formData.role ? 'Please select a role' : '',
        };

        if (Object.values(newErrors).some(Boolean)) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setStatus({
                type: 'success',
                message: 'Account created successfully! Redirecting to login...',
            });

            setTimeout(() => router.push('/auth/login'), 1500);
        } catch {
            setStatus({
                type: 'error',
                message: 'Failed to create account. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Create an account
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your details below to create your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">
                        Full Name
                    </label>
                    <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 ${errors.fullName
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-black dark:focus:ring-white'
                            }`}
                    />
                    {errors.fullName && (
                        <p className="text-xs text-red-500">{errors.fullName}</p>
                    )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">
                        Email
                    </label>
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 ${errors.email
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-black dark:focus:ring-white'
                            }`}
                    />
                    {errors.email && (
                        <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* Role */}
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">
                        Role
                    </label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:focus:ring-offset-gray-900 ${errors.role
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-black dark:focus:ring-white'
                            }`}
                    >
                        <option value="" disabled>
                            Select a role
                        </option>
                        {ROLE_OPTIONS.map((r) => (
                            <option key={r.value} value={r.value}>
                                {r.label}
                            </option>
                        ))}
                    </select>
                    {errors.role && (
                        <p className="text-xs text-red-500">{errors.role}</p>
                    )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">
                        Password
                    </label>
                    <input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 ${errors.password
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-black dark:focus:ring-white'
                            }`}
                    />
                    {errors.password && (
                        <p className="text-xs text-red-500">{errors.password}</p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label className="text-sm font-medium dark:text-gray-200">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:border-gray-700 dark:text-white dark:focus:ring-offset-gray-900 ${errors.confirmPassword
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-black dark:focus:ring-white'
                            }`}
                    />
                    {errors.confirmPassword && (
                        <p className="text-xs text-red-500">{errors.confirmPassword}</p>
                    )}
                </div>

                {status && (
                    <div
                        className={`rounded-md p-3 text-sm ${status.type === 'success'
                            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            }`}
                    >
                        {status.message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-md bg-black py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                    {loading ? 'Creating account...' : 'Create Account'}
                </button>
            </form>

            <div className="text-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                    Already have an account?{' '}
                </span>
                <Link
                    href="/auth/login"
                    className="font-semibold text-black hover:underline dark:text-white"
                >
                    Sign in
                </Link>
            </div>
        </>
    );
}
