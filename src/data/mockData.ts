// Mock data for dashboard
import type { FinancialStats, Transaction, ChartDataPoint, AIInsight, Category, Budget } from '../types/dashboard.types';

export const mockStats: FinancialStats = {
  totalIncome: 45000000,
  totalExpense: 32500000,
  balance: 12500000,
  savingsRate: 27.8,
};

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    category: 'Salary',
    amount: 25000000,
    description: 'Monthly salary',
    date: '2025-11-01',
  },
  {
    id: '2',
    type: 'expense',
    category: 'Groceries',
    amount: 1500000,
    description: 'Weekly shopping',
    date: '2025-11-03',
  },
  {
    id: '3',
    type: 'expense',
    category: 'Transport',
    amount: 500000,
    description: 'Taxi and fuel',
    date: '2025-11-04',
    isAIRecommended: true,
  },
  {
    id: '4',
    type: 'income',
    category: 'Freelance',
    amount: 5000000,
    description: 'Web development project',
    date: '2025-11-04',
  },
  {
    id: '5',
    type: 'expense',
    category: 'Bills',
    amount: 2000000,
    description: 'Electricity and water',
    date: '2025-11-05',
  },
];

export const mockChartData: ChartDataPoint[] = [
  { month: 'Jun', income: 35000000, expense: 28000000 },
  { month: 'Jul', income: 38000000, expense: 30000000 },
  { month: 'Aug', income: 42000000, expense: 31000000 },
  { month: 'Sep', income: 40000000, expense: 33000000 },
  { month: 'Oct', income: 43000000, expense: 32000000 },
  { month: 'Nov', income: 45000000, expense: 32500000 },
];

export const mockAIInsights: AIInsight[] = [
  {
    id: '1',
    type: 'warning',
    title: 'High spending detected',
    description: 'Your grocery spending is 25% higher than last month. Consider reviewing your shopping list.',
    icon: '⚠️',
  },
  {
    id: '2',
    type: 'tip',
    title: 'Savings opportunity',
    description: 'You can save an extra 15% by switching to a different internet provider.',
    icon: '💡',
  },
  {
    id: '3',
    type: 'success',
    title: 'Great progress!',
    description: 'You\'re on track to meet your savings goal for this month.',
    icon: '🎯',
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Salary', type: 'income', icon: '💰', color: '#10b981' },
  { id: '2', name: 'Freelance', type: 'income', icon: '💼', color: '#3b82f6' },
  { id: '3', name: 'Groceries', type: 'expense', icon: '🛒', color: '#ef4444' },
  { id: '4', name: 'Transport', type: 'expense', icon: '🚗', color: '#f59e0b' },
  { id: '5', name: 'Bills', type: 'expense', icon: '📄', color: '#8b5cf6' },
  { id: '6', name: 'Entertainment', type: 'expense', icon: '🎬', color: '#ec4899' },
];

export const mockBudgets: Budget[] = [
  { category: 'Groceries', limit: 3000000, spent: 1500000, percentage: 50 },
  { category: 'Transport', limit: 1000000, spent: 500000, percentage: 50 },
  { category: 'Bills', limit: 2500000, spent: 2000000, percentage: 80 },
  { category: 'Entertainment', limit: 1500000, spent: 800000, percentage: 53 },
];
