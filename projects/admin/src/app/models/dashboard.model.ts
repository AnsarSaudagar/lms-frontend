export interface StatCard {
  label: string;
  value: string;
  icon: string;
  trend: string;
  trendTone: 'positive' | 'negative' | 'neutral';
}

export interface WeeklyActivePoint {
  day: string;
  value: number;
}

export interface PendingAction {
  icon: string;
  tone: 'warning' | 'info' | 'neutral';
  title: string;
}

export interface ActivityLog {
  tag: string;
  message: string;
  meta: string;
  timestamp: string;
}
