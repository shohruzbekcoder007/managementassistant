// Axios instance configuration - Dependency Inversion Principle
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { env } from './env.config';

// Import ToastService for notifications
let ToastService: any = null;

// Lazy load ToastService to avoid circular dependency
const getToastService = async () => {
  if (!ToastService) {
    const module = await import('../services/toast.service');
    ToastService = module.ToastService;
  }
  return ToastService;
};

// Custom error class for API errors
export class ApiError extends Error {
  status: number;
  data?: any;

  constructor(
    status: number,
    message: string,
    data?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

// Axios instance factory
class AxiosConfig {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: env.fullApiUrl,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - add auth token
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle errors
    this.instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const status = error.response?.status || 500;
        const message = (error.response?.data as any)?.message || error.message;
        const data = error.response?.data;

        // Get toast service
        const toast = await getToastService();

        // Handle 401 - Unauthorized
        if (status === 401) {
          localStorage.removeItem('authToken');
          if (toast) {
            toast.error('Session expired. Please login again.');
          }
          // Delay redirect to show toast
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
        }

        // Handle other errors
        if (status === 500 && toast) {
          toast.error('Server error. Please try again later.');
        } else if (status === 404 && toast) {
          toast.error('Resource not found.');
        } else if (!error.response && toast) {
          toast.error('Network error. Please check your connection.');
        }

        return Promise.reject(new ApiError(status, message, data));
      }
    );
  }

  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

// Export singleton instance
export const apiClient = new AxiosConfig().getInstance();

// Generic request function with type safety
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  const response = await apiClient.request<T>(config);
  return response.data;
}
