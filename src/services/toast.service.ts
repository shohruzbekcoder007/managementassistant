// Toast notification service - Single Responsibility Principle
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Toast Notification Service
 * Centralized notification management
 */
export class ToastService {
  /**
   * Success notification
   */
  static success(message: string, options?: ToastOptions): void {
    toast.success(message, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Error notification
   */
  static error(message: string, options?: ToastOptions): void {
    toast.error(message, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Info notification
   */
  static info(message: string, options?: ToastOptions): void {
    toast.info(message, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Warning notification
   */
  static warning(message: string, options?: ToastOptions): void {
    toast.warning(message, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Loading notification
   */
  static loading(message: string = 'Loading...', options?: ToastOptions): void {
    toast.loading(message, {
      ...defaultOptions,
      ...options,
    });
  }

  /**
   * Dismiss all toasts
   */
  static dismiss(): void {
    toast.dismiss();
  }

  /**
   * Dismiss specific toast
   */
  static dismissById(toastId: string | number): void {
    toast.dismiss(toastId);
  }
}

/**
 * Pre-configured toast messages for common scenarios
 */
export const ToastMessages = {
  // Auth messages
  AUTH: {
    LOGIN_SUCCESS: 'Welcome back! Login successful.',
    LOGIN_ERROR: 'Login failed. Please check your credentials.',
    SIGNUP_SUCCESS: 'Account created successfully! Welcome aboard.',
    SIGNUP_ERROR: 'Registration failed. Please try again.',
    LOGOUT_SUCCESS: 'You have been logged out successfully.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
  },
  // Validation messages
  VALIDATION: {
    REQUIRED_FIELDS: 'Please fill in all required fields.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
    WEAK_PASSWORD: 'Password must be at least 6 characters.',
  },
  // Network messages
  NETWORK: {
    ERROR: 'Network error. Please check your connection.',
    TIMEOUT: 'Request timed out. Please try again.',
    SERVER_ERROR: 'Server error. Please try again later.',
  },
  // Generic messages
  GENERIC: {
    SUCCESS: 'Operation completed successfully!',
    ERROR: 'An error occurred. Please try again.',
    LOADING: 'Processing...',
  },
} as const;
