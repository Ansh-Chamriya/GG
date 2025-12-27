import React from 'react';

interface LocationHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export function LocationHeader({ title, description, children }: LocationHeaderProps) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h2>
                {description && (
                    <p className="text-sm text-muted-foreground mt-1">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center space-x-2">
                    {children}
                </div>
            )}
        </div>
    );
}
