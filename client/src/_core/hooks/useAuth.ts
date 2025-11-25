// This is the new code for your useAuth.ts file.
// You can replace the old content entirely with this.

import { useState, useEffect, useCallback, useMemo } from 'react';

// Define a type for the user object for better type safety.
// This should match the user object returned by Supabase.
interface AuthUser {
  id: string;
  email?: string;
  name?: string; // Added for consistency with login page data
  role: string;
  businessId?: string | null; // Add businessId, optional for clients
  // Add any other user properties you need
}

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
  redirectPath?: string;
};

export function useAuth(options?: UseAuthOptions) {
  // Default to the login page path. Adjust if your login route is different.
  const { redirectOnUnauthenticated = false, redirectPath = '/login' } = options ?? {};

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('authToken');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        // This means the token is invalid or expired.
        throw new Error('Authentication failed');
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      // Clean up invalid token from storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Handle redirection logic
  useEffect(() => {
    if (!redirectOnUnauthenticated || loading) return;
    if (user) return;
    if (typeof window !== 'undefined' && window.location.pathname !== redirectPath) {
      window.location.href = redirectPath;
    }
  }, [user, loading, redirectOnUnauthenticated, redirectPath]);

  const logout = useCallback(() => {
    // Clear user state and remove token from storage
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    // Redirect to login page after logout
    window.location.href = redirectPath;
  }, [redirectPath]);

  // Function to handle successful login
  const login = useCallback(async (token: string, userData: AuthUser) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', userData.role); // Store role explicitly
    setUser(userData);
  }, []); // Dependencies for useCallback. If setUser and localStorage are stable, empty array is fine.

  // Memoize the returned state to prevent unnecessary re-renders
  const state = useMemo(() => ({
    user,
    loading,
    isAuthenticated: !!user,
  }), [user, loading]);

  return {
    ...state,
    logout,
    login, // Expose the login function
    refresh: fetchUser, // Provide a function to manually re-fetch user data
  };
}
