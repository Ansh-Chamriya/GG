import { API_BASE_URL, ApiResponse } from "./config";

// ============ HTTP CLIENT ============
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Get auth token from localStorage
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("access_token");
  }

  // Build headers with auth token
  private buildHeaders(customHeaders?: Record<string, string>): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
      ...customHeaders,
    });

    const token = this.getAuthToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  // Replace URL parameters like :id with actual values
  private replaceUrlParams(
    url: string,
    params?: Record<string, string>
  ): string {
    if (!params) return url;

    let result = url;
    Object.entries(params).forEach(([key, value]) => {
      result = result.replace(`:${key}`, value);
    });
    return result;
  }

  // Handle response
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Clear auth data and redirect to login
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        // Only redirect if not already on auth page
        if (!window.location.pathname.startsWith("/auth")) {
          window.location.href = "/auth/login";
        }
      }
      return {
        success: false,
        data: null as T,
        error: "Session expired. Please log in again.",
      };
    }

    // Handle 403 Forbidden
    if (response.status === 403) {
      return {
        success: false,
        data: null as T,
        error: "You do not have permission to perform this action.",
      };
    }

    // Handle 404 Not Found
    if (response.status === 404) {
      return {
        success: false,
        data: null as T,
        error: "Resource not found.",
      };
    }

    // Handle 422 Validation Error (FastAPI)
    if (response.status === 422) {
      const errorData = await response.json();
      const detail = errorData.detail;

      // FastAPI returns validation errors as array
      if (Array.isArray(detail)) {
        const messages = detail.map(
          (err: { loc: string[]; msg: string }) =>
            `${err.loc.join(".")}: ${err.msg}`
        );
        return {
          success: false,
          data: null as T,
          error: messages.join(", "),
        };
      }

      return {
        success: false,
        data: null as T,
        error: typeof detail === "string" ? detail : "Validation error",
      };
    }

    // Handle 5xx Server Errors
    if (response.status >= 500) {
      return {
        success: false,
        data: null as T,
        error: "Server error. Please try again later.",
      };
    }

    // Handle other error status codes
    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          data: null as T,
          error: errorData.detail || errorData.message || "An error occurred",
        };
      } catch {
        return {
          success: false,
          data: null as T,
          error: `Error: ${response.status} ${response.statusText}`,
        };
      }
    }

    // Handle successful response
    try {
      // Handle empty responses (204 No Content)
      if (response.status === 204) {
        return {
          success: true,
          data: null as T,
        };
      }

      const data = await response.json();

      // If the response already has success/data format, return it
      if (typeof data === "object" && "success" in data) {
        return data as ApiResponse<T>;
      }

      // Otherwise wrap it in our standard format
      return {
        success: true,
        data: data as T,
      };
    } catch {
      return {
        success: true,
        data: null as T,
      };
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    urlParams?: Record<string, string>,
    queryParams?: Record<string, string | number | boolean | undefined>
  ): Promise<ApiResponse<T>> {
    try {
      let url = `${this.baseUrl}${this.replaceUrlParams(endpoint, urlParams)}`;

      // Add query parameters
      if (queryParams) {
        const searchParams = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      const response = await fetch(url, {
        method: "GET",
        headers: this.buildHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("GET request error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // POST request
  async post<T, D = unknown>(
    endpoint: string,
    data?: D,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const response = await fetch(url, {
        method: "POST",
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("POST request error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // PUT request
  async put<T, D = unknown>(
    endpoint: string,
    data?: D,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("PUT request error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // PATCH request
  async patch<T, D = unknown>(
    endpoint: string,
    data?: D,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const response = await fetch(url, {
        method: "PATCH",
        headers: this.buildHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("PATCH request error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // DELETE request
  async delete<T = void>(
    endpoint: string,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const response = await fetch(url, {
        method: "DELETE",
        headers: this.buildHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("DELETE request error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Network error",
      };
    }
  }

  // File upload
  async uploadFile<T>(
    endpoint: string,
    file: File,
    fieldName: string = "file",
    additionalData?: Record<string, string>,
    urlParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const formData = new FormData();
      formData.append(fieldName, file);

      if (additionalData) {
        Object.entries(additionalData).forEach(([key, value]) => {
          formData.append(key, value);
        });
      }

      // Don't set Content-Type for FormData - browser will set it with boundary
      const headers = new Headers();
      const token = this.getAuthToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error("File upload error:", error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  // Download file
  async downloadFile(
    endpoint: string,
    filename: string,
    urlParams?: Record<string, string>
  ): Promise<boolean> {
    try {
      const url = `${this.baseUrl}${this.replaceUrlParams(
        endpoint,
        urlParams
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: this.buildHeaders(),
      });

      if (!response.ok) {
        return false;
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      return true;
    } catch (error) {
      console.error("Download error:", error);
      return false;
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient(API_BASE_URL);
