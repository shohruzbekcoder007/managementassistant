// Register Page Component - Updated with RTK Query
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../components/FormInput';
import { Button } from '../../components/Button';
import { ValidationService } from '../../services/validation.service';
import { ToastService, ToastMessages } from '../../services/toast.service';
import { useSignupMutation } from '../../store/api/apiSlice';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import type { SignupRequest } from '../../types/auth.types';
import styles from './Register.module.scss';

// Custom hook for register form
const useRegisterForm = () => {
  const [values, setValues] = React.useState<SignupRequest>({
    first_name: '',
    last_name: '',
    username: '',
    phone_number: '',
    email: '',
    password: '',
    confirmed_password: ''
  });

  const [errors, setErrors] = React.useState<Partial<Record<keyof SignupRequest, string>>>({});

  const handleChange = (field: keyof SignupRequest) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const setError = (field: keyof SignupRequest, message: string) => {
    setErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  const clearErrors = () => {
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    setError,
    clearErrors
  };
};

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    values,
    errors,
    handleChange,
    setError,
    clearErrors
  } = useRegisterForm();

  const validateForm = (): boolean => {
    clearErrors();
    let isValid = true;

    const firstNameError = ValidationService.validateName(values.first_name, 'first_name');
    if (firstNameError) {
      setError('first_name', firstNameError.message);
      isValid = false;
    }

    const lastNameError = ValidationService.validateName(values.last_name, 'last_name');
    if (lastNameError) {
      setError('last_name', lastNameError.message);
      isValid = false;
    }

    const usernameError = ValidationService.validateUsername(values.username);
    if (usernameError) {
      setError('username', usernameError.message);
      isValid = false;
    }

    const phoneError = ValidationService.validatePhoneNumber(values.phone_number);
    if (phoneError) {
      setError('phone_number', phoneError.message);
      isValid = false;
    }

    const emailError = ValidationService.validateEmail(values.email);
    if (emailError) {
      setError('email', emailError.message);
      isValid = false;
    }

    const passwordError = ValidationService.validatePassword(values.password);
    if (passwordError) {
      setError('password', passwordError.message);
      isValid = false;
    }

    const confirmPasswordError = ValidationService.validateConfirmPassword(
      values.password,
      values.confirmed_password
    );
    if (confirmPasswordError) {
      setError('confirmed_password', confirmPasswordError.message);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      ToastService.warning(ToastMessages.VALIDATION.REQUIRED_FIELDS);
      return;
    }

    try {
      const response = await signup(values).unwrap();
      
      // Save credentials to Redux store and localStorage
      dispatch(setCredentials({
        user: response.user,
        token: response.access_token
      }));

      // Show success toast
      ToastService.success(ToastMessages.AUTH.SIGNUP_SUCCESS);

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || ToastMessages.AUTH.SIGNUP_ERROR;
      setError('confirmed_password', errorMessage);
      ToastService.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <FormInput
            label="First Name"
            type="text"
            value={values.first_name}
            onChange={handleChange('first_name')}
            error={errors.first_name}
            placeholder="Enter your first name"
            required
          />

          <FormInput
            label="Last Name"
            type="text"
            value={values.last_name}
            onChange={handleChange('last_name')}
            error={errors.last_name}
            placeholder="Enter your last name"
            required
          />

          <FormInput
            label="Username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            error={errors.username}
            placeholder="Choose a username"
            required
          />

          <FormInput
            label="Phone Number"
            type="text"
            value={values.phone_number}
            onChange={handleChange('phone_number')}
            error={errors.phone_number}
            placeholder="+998 90 123 45 67"
            required
          />

          <FormInput
            label="Email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            error={errors.email}
            placeholder="Enter your email"
            required
          />

          <FormInput
            label="Password"
            type="password"
            value={values.password}
            onChange={handleChange('password')}
            error={errors.password}
            placeholder="Enter your password"
            required
          />

          <FormInput
            label="Confirm Password"
            type="password"
            value={values.confirmed_password}
            onChange={handleChange('confirmed_password')}
            error={errors.confirmed_password}
            placeholder="Confirm your password"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Register
          </Button>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Already have an account?{' '}
              <Link to="/login" className={styles.link}>
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
