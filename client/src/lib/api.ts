/**
 * A reusable API helper function to make fetch requests to the backend.
 * It automatically adds the Authorization header if a token is available.
 */

// A helper to get the auth token from localStorage
const getAuthToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem('authToken');
};

// Define a generic type for API options
interface ApiOptions extends RequestInit {
  // The body will be automatically stringified if it's an object.
  body?: any;
}

/**
 * A generic API fetch function.
 * @param endpoint The API endpoint to call (e.g., '/users').
 * @param options Fetch options.
 * @returns The JSON response.
 */
export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, headers, ...rest } = options;

  const token = getAuthToken();

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    ...rest,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`/api${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
    throw new Error(errorData.message || 'An unknown API error occurred');
  }

  return response.status === 204 ? ({} as T) : (response.json() as Promise<T>);
}