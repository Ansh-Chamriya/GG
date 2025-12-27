/**
 * User Management API Helpers
 * Extended API methods for user management functionality
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

/**
 * Get auth headers from localStorage
 */
function getAuthHeaders(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
}

/**
 * Generic API request helper
 */
async function apiRequest<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<{ success: boolean; data?: T; error?: string }> {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers: {
                ...getAuthHeaders(),
                ...options.headers,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.detail || `Request failed with status ${response.status}`,
            };
        }

        // Handle 204 No Content
        if (response.status === 204) {
            return { success: true };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Network error",
        };
    }
}

/**
 * User service with role management
 */
export const userManagementService = {
    /**
     * List all users in the organization
     */
    list: async (params?: { role?: string; is_active?: boolean; search?: string }) => {
        const searchParams = new URLSearchParams();
        if (params?.role) searchParams.set("role", params.role);
        if (params?.is_active !== undefined) searchParams.set("is_active", String(params.is_active));
        if (params?.search) searchParams.set("search", params.search);

        const query = searchParams.toString();
        return apiRequest(`/users${query ? `?${query}` : ""}`);
    },

    /**
     * Get a single user by ID
     */
    get: async (userId: string) => {
        return apiRequest(`/users/${userId}`);
    },

    /**
     * Create a new user
     */
    create: async (userData: {
        email: string;
        password: string;
        first_name: string;
        last_name: string;
        phone?: string;
        role?: string;
    }) => {
        return apiRequest("/users", {
            method: "POST",
            body: JSON.stringify(userData),
        });
    },

    /**
     * Update a user's information
     */
    update: async (
        userId: string,
        userData: {
            first_name?: string;
            last_name?: string;
            phone?: string;
            is_active?: boolean;
        }
    ) => {
        return apiRequest(`/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify(userData),
        });
    },

    /**
     * Update a user's role
     */
    updateRole: async (userId: string, role: string) => {
        return apiRequest(`/users/${userId}/role`, {
            method: "PUT",
            body: JSON.stringify({ role }),
        });
    },

    /**
     * Delete (deactivate) a user
     */
    delete: async (userId: string) => {
        return apiRequest(`/users/${userId}`, {
            method: "DELETE",
        });
    },
};

export default userManagementService;
