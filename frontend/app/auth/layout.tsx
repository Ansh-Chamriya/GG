import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 dark:from-gray-900 dark:to-black">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-900/5 transition-all dark:bg-gray-900 dark:ring-white/10">
        {children}
      </div>
    </div>
  );
}
