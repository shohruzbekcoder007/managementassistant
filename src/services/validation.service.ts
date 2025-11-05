// Single Responsibility Principle: Validation logic separated
import type { ValidationError } from '../types/auth.types';

export class ValidationService {
  static validateEmail(email: string): ValidationError | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
      return { field: 'email', message: 'Email is required' };
    }
    
    if (!emailRegex.test(email)) {
      return { field: 'email', message: 'Invalid email format' };
    }
    
    return null;
  }

  static validatePassword(password: string): ValidationError | null {
    if (!password) {
      return { field: 'password', message: 'Password is required' };
    }
    
    if (password.length < 6) {
      return { field: 'password', message: 'Password must be at least 6 characters' };
    }
    
    return null;
  }

  static validateConfirmPassword(password: string, confirmPassword: string): ValidationError | null {
    if (!confirmPassword) {
      return { field: 'confirmed_password', message: 'Please confirm your password' };
    }
    
    if (password !== confirmPassword) {
      return { field: 'confirmed_password', message: 'Passwords do not match' };
    }
    
    return null;
  }

  static validateName(name: string, fieldName: string = 'name'): ValidationError | null {
    if (!name) {
      return { field: fieldName, message: `${fieldName.replace('_', ' ')} is required` };
    }
    
    if (name.length < 2) {
      return { field: fieldName, message: `${fieldName.replace('_', ' ')} must be at least 2 characters` };
    }
    
    return null;
  }

  static validateUsername(username: string): ValidationError | null {
    if (!username) {
      return { field: 'username', message: 'Username is required' };
    }
    
    if (username.length < 3) {
      return { field: 'username', message: 'Username must be at least 3 characters' };
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { field: 'username', message: 'Username can only contain letters, numbers and underscores' };
    }
    
    return null;
  }

  static validatePhoneNumber(phoneNumber: string): ValidationError | null {
    if (!phoneNumber) {
      return { field: 'phone_number', message: 'Phone number is required' };
    }
    
    // Basic phone number validation (adjust regex based on requirements)
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    
    if (!phoneRegex.test(phoneNumber)) {
      return { field: 'phone_number', message: 'Invalid phone number format' };
    }
    
    return null;
  }

  static validateFullName(fullName: string): ValidationError | null {
    if (!fullName) {
      return { field: 'fullName', message: 'Full name is required' };
    }
    
    if (fullName.length < 2) {
      return { field: 'fullName', message: 'Full name must be at least 2 characters' };
    }
    
    return null;
  }
}
