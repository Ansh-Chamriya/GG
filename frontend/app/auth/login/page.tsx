'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Status =
    | { type: 'success'; message: string }
    | { type: 'error'; message: string }
    | null;

export default function LoginPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [status, setStatus] = useState<Status>(null);
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        if (!email) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
            return 'Invalid email address';
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const emailError = validateEmail(formData.email);
        const passwordError = !formData.password ? 'Password is required' : '';

        if (emailError || passwordError) {
            setErrors({
                email: emailError,
                password: passwordError,
            });
            return;
        }

        try {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            setStatus({
                type: 'success',
                message: 'Login successful! Redirecting...',
            });

            // router.push('/dashboard');
        } catch {
            setStatus({
                type: 'error',
                message: 'Invalid credentials. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Welcome back
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enter your credentials to access your account
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none dark:text-gray-200">
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

                {/* Password Field */}
                <div className="space-y-2">
                    <label className="text-sm font-medium leading-none dark:text-gray-200">
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
                    {loading ? 'Signing in…' : 'Sign In'}
                </button>
            </form>

            <div className="text-center text-sm">
                <span className="text-gray-500 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                </span>
                <Link
                    href="/auth/signup"
                    className="font-semibold text-black hover:underline dark:text-white"
                >
                    Sign up
                </Link>
            </div>
        </>
    );
}
