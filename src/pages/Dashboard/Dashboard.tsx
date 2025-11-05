// Dashboard Page - AI-powered financial management
import React, { useState } from 'react';
import { StatCard } from '../../components/StatCard';
import { TransactionList } from '../../components/TransactionList';
import { AIInsights } from '../../components/AIInsights';
import { AIExpenseInput } from '../../components/AIExpenseInput';
import { mockStats, mockTransactions, mockAIInsights } from '../../data/mockData';
import { ToastService } from '../../services/toast.service';
import styles from './Dashboard.module.scss';

export const Dashboard: React.FC = () => {
  const [isSubmittingExpense, setIsSubmittingExpense] = useState(false);

  // Handle AI expense submission
  const handleExpenseSubmit = async (message: string, audioBlob?: Blob) => {
    setIsSubmittingExpense(true);
    
    try {
      // Simulate API call to process AI expense
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      if (audioBlob) {
        ToastService.success('Audio xabar muvaffaqiyatli yuborildi va AI tahlil qilmoqda');
      } else {
        ToastService.success('Xarajat AI tomonidan qayd qilindi va tahlil qilindi');
      }
      
      console.log('Expense message:', message);
      console.log('Audio blob:', audioBlob);
      
      // Here you would normally send to your API
      // const formData = new FormData();
      // formData.append('message', message);
      // if (audioBlob) formData.append('audio', audioBlob);
      // await api.post('/expenses/ai', formData);
      
    } catch (error) {
      ToastService.error('Xatolik yuz berdi. Qayta urinib ko\'ring.');
    } finally {
      setIsSubmittingExpense(false);
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Financial Dashboard</h1>
          <p className={styles.subtitle}>
            AI-powered insights for your financial management
          </p>
        </div>
        <div className={styles.actions}>
          <button className={styles.addButton}>
            <span className={styles.plusIcon}>+</span>
            Add Transaction
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <StatCard
          title="Total Income"
          value={mockStats.totalIncome}
          change={12.5}
          icon="💰"
          color="success"
        />
        <StatCard
          title="Total Expense"
          value={mockStats.totalExpense}
          change={-5.2}
          icon="💸"
          color="danger"
        />
        <StatCard
          title="Balance"
          value={mockStats.balance}
          change={8.3}
          icon="💵"
          color="primary"
        />
        <StatCard
          title="Savings Rate"
          value={`${mockStats.savingsRate}%`}
          change={3.1}
          icon="📊"
          color="warning"
        />
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Chart Section */}
          <div className={styles.chartSection}>
            <div className={styles.chartHeader}>
              <h3 className={styles.chartTitle}>Income vs Expense</h3>
              <div className={styles.chartFilters}>
                <button className={`${styles.filterBtn} ${styles.active}`}>6M</button>
                <button className={styles.filterBtn}>1Y</button>
                <button className={styles.filterBtn}>All</button>
              </div>
            </div>
            <div className={styles.chartPlaceholder}>
              <div className={styles.chartBars}>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '60%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '45%' }}></div>
                  <span className={styles.barLabel}>Jun</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '65%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '48%' }}></div>
                  <span className={styles.barLabel}>Jul</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '75%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '52%' }}></div>
                  <span className={styles.barLabel}>Aug</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '70%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '55%' }}></div>
                  <span className={styles.barLabel}>Sep</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '78%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '53%' }}></div>
                  <span className={styles.barLabel}>Oct</span>
                </div>
                <div className={styles.bar}>
                  <div className={styles.incomeBar} style={{ height: '82%' }}></div>
                  <div className={styles.expenseBar} style={{ height: '54%' }}></div>
                  <span className={styles.barLabel}>Nov</span>
                </div>
              </div>
              <div className={styles.chartLegend}>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.income}`}></span>
                  <span>Income</span>
                </div>
                <div className={styles.legendItem}>
                  <span className={`${styles.legendDot} ${styles.expense}`}></span>
                  <span>Expense</span>
                </div>
              </div>
            </div>
          </div>

          {/* Transactions */}
          <TransactionList transactions={mockTransactions} />
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* AI Expense Input */}
          <AIExpenseInput 
            onSubmit={handleExpenseSubmit} 
            isLoading={isSubmittingExpense}
          />
          
          {/* AI Insights */}
          <AIInsights insights={mockAIInsights} />

          {/* Quick Actions */}
          <div className={styles.quickActions}>
            <h3 className={styles.quickTitle}>Quick Actions</h3>
            <div className={styles.actionButtons}>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>📥</span>
                <span className={styles.actionText}>Add Income</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>📤</span>
                <span className={styles.actionText}>Add Expense</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>🎯</span>
                <span className={styles.actionText}>Set Budget</span>
              </button>
              <button className={styles.actionBtn}>
                <span className={styles.actionIcon}>📊</span>
                <span className={styles.actionText}>View Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
