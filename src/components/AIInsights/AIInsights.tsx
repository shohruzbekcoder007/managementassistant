// AIInsights Component - AI-powered financial insights
import React from 'react';
import type { AIInsight } from '../../types/dashboard.types';
import styles from './AIInsights.module.scss';

interface AIInsightsProps {
  insights: AIInsight[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ insights }) => {
  return (
    <div className={styles.aiInsights}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.aiIcon}>✨</span>
          AI Insights
        </h3>
        <span className={styles.badge}>Powered by AI</span>
      </div>
      <div className={styles.insightsList}>
        {insights.map((insight) => (
          <div key={insight.id} className={`${styles.insightCard} ${styles[insight.type]}`}>
            <div className={styles.iconWrapper}>
              <span className={styles.icon}>{insight.icon}</span>
            </div>
            <div className={styles.content}>
              <h4 className={styles.insightTitle}>{insight.title}</h4>
              <p className={styles.description}>{insight.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
