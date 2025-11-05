// TransactionList Component
import React from 'react';
import type { Transaction } from '../../types/dashboard.types';
import styles from './TransactionList.module.scss';

interface TransactionListProps {
  transactions: Transaction[];
  title?: string;
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, title = 'Recent Transactions' }) => {
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('uz-UZ', {
      style: 'currency',
      currency: 'UZS',
      minimumFractionDigits: 0,
    }).format(amount).replace('UZS', 'UZS');
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      'Salary': '💰',
      'Freelance': '💼',
      'Groceries': '🛒',
      'Transport': '🚗',
      'Bills': '📄',
      'Entertainment': '🎬',
      'Food': '🍔',
      'Shopping': '🛍️',
    };
    return icons[category] || '💳';
  };

  return (
    <div className={styles.transactionList}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <button className={styles.viewAll}>View All</button>
      </div>
      <div className={styles.list}>
        {transactions.map((transaction) => (
          <div key={transaction.id} className={styles.transactionItem}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{getCategoryIcon(transaction.category)}</span>
            </div>
            <div className={styles.details}>
              <div className={styles.info}>
                <span className={styles.category}>{transaction.category}</span>
                {transaction.isAIRecommended && (
                  <span className={styles.aiBadge}>
                    <span className={styles.aiIcon}>✨</span>
                    AI
                  </span>
                )}
              </div>
              <span className={styles.description}>{transaction.description}</span>
            </div>
            <div className={styles.amountWrapper}>
              <span className={`${styles.amount} ${styles[transaction.type]}`}>
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </span>
              <span className={styles.date}>{formatDate(transaction.date)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
