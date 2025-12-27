export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse dark:bg-gray-800" />
            <div className="h-64 bg-white rounded-lg border border-gray-200 shadow-sm dark:bg-gray-900 dark:border-gray-700 animate-pulse" />
        </div>
    );
}
