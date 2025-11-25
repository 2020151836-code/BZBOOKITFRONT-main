import { api } from '../lib/api';

/**
 * An axios-like API client built on top of the base `api` function.
 * This provides convenience methods like .get(), .post(), etc.
 */
export const apiClient = {
  get: <T>(url: string) => {
    return api<T>(url, { method: 'GET' });
  },

  post: <T>(url:string, data: any) => {
    return api<T>(url, { method: 'POST', body: data });
  },

  patch: <T>(url: string, data: any) => {
    return api<T>(url, { method: 'PATCH', body: data });
  },

  delete: <T>(url: string) => {
    return api<T>(url, { method: 'DELETE' });
  },
};