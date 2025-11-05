// Reusable Button Component
import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  size = 'medium',
  className = '',
}) => {
  const sizeClass = size ? styles[size] : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${sizeClass} ${className}`.trim()}
    >
      {isLoading ? (
        <span className={styles.loader}>Loading...</span>
      ) : (
        children
      )}
    </button>
  );
};
