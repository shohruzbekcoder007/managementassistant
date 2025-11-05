// Custom hook for form state management (Separation of Concerns)
import { useState } from 'react';

export const useAuthForm = <T extends Record<string, any>>(initialValues: T) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof T) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const setError = (field: keyof T, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    setError,
    clearErrors,
    resetForm
  };
};
