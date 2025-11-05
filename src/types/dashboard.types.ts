// Dashboard types and interfaces
export interface FinancialStats {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  savingsRate: number;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
  isAIRecommended?: boolean;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
  budget?: number;
  spent?: number;
}

export interface ChartDataPoint {
  month: string;
  income: number;
  expense: number;
}

export interface AIInsight {
  id: string;
  type: 'warning' | 'tip' | 'success';
  title: string;
  description: string;
  icon: string;
}

export interface Budget {
  category: string;
  limit: number;
  spent: number;
  percentage: number;
}
