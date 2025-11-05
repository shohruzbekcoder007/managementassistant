// Login Page Component - Updated with RTK Query
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormInput } from '../../components/FormInput';
import { Button } from '../../components/Button';
import { useAuthForm } from '../../hooks/useAuthForm';
import { ValidationService } from '../../services/validation.service';
import { ToastService, ToastMessages } from '../../services/toast.service';
import { useLoginMutation } from '../../store/api/apiSlice';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials } from '../../store/slices/authSlice';
import type { LoginCredentials } from '../../types/auth.types';
import styles from './Login.module.scss';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    values,
    errors,
    handleChange,
    setError,
    clearErrors
  } = useAuthForm<LoginCredentials>({
    email: '',
    password: ''
  });

  const validateForm = (): boolean => {
    clearErrors();
    let isValid = true;

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

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      ToastService.warning(ToastMessages.VALIDATION.REQUIRED_FIELDS);
      return;
    }

    try {
      const response = await login(values).unwrap();
      
      // Save credentials to Redux store and localStorage
      dispatch(setCredentials({
        user: response.user,
        token: response.access_token
      }));

      // Show success toast
      ToastService.success(ToastMessages.AUTH.LOGIN_SUCCESS);

      // Navigate to home page after a short delay
      setTimeout(() => {
        navigate('/');
      }, 500);
    } catch (error: any) {
      const errorMessage = error?.data?.message || error?.message || ToastMessages.AUTH.LOGIN_ERROR;
      setError('password', errorMessage);
      ToastService.error(errorMessage);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Welcome Back</h1>
          <p className={styles.subtitle}>Please login to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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

          <div className={styles.forgotPassword}>
            <Link to="/forgot-password" className={styles.link}>
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            disabled={isLoading}
          >
            Login
          </Button>

          <div className={styles.footer}>
            <p className={styles.footerText}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.link}>
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
