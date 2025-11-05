// StatCard Component - Reusable financial stat display
import React from 'react';
import styles from './StatCard.module.scss';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: string;
  color?: 'primary' | 'success' | 'danger' | 'warning';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon,
  color = 'primary'
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('uz-UZ', {
        style: 'currency',
        currency: 'UZS',
        minimumFractionDigits: 0,
      }).format(val).replace('UZS', 'UZS');
    }
    return val;
  };

  return (
    <div className={`${styles.statCard} ${styles[color]}`}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.value}>{formatValue(value)}</div>
      {change !== undefined && (
        <div className={`${styles.change} ${change >= 0 ? styles.positive : styles.negative}`}>
          <span>{change >= 0 ? '↑' : '↓'}</span>
          <span>{Math.abs(change)}%</span>
          <span className={styles.changeText}>vs last month</span>
        </div>
      )}
    </div>
  );
};
