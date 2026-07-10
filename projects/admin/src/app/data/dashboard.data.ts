import { ActivityLog, PendingAction, StatCard, WeeklyActivePoint } from '../models/dashboard.model';

export const STAT_CARDS: StatCard[] = [
  { label: 'Active Learners', value: '8', icon: 'users', trend: '+8.2% this month', trendTone: 'positive' },
  { label: 'Published Projects', value: '8', icon: 'folder', trend: '8 total', trendTone: 'neutral' },
  { label: 'Completion Rate', value: '38%', icon: 'trending-up', trend: '+3.1pt vs last month', trendTone: 'positive' },
  { label: 'Est. Revenue', value: '$468,583', icon: 'bar-chart', trend: '+12.4% this month', trendTone: 'positive' },
];

export const WEEKLY_ACTIVE_LEARNERS: WeeklyActivePoint[] = [
  { day: 'Sun', value: 42 },
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 36 },
  { day: 'Wed', value: 64 },
  { day: 'Thu', value: 50 },
  { day: 'Fri', value: 30 },
  { day: 'Sat', value: 72 },
];

export const PENDING_ACTIONS: PendingAction[] = [
  { icon: 'alert-triangle', tone: 'warning', title: '3 learners flagged for suspicious activity' },
  { icon: 'folder', tone: 'info', title: '2 projects awaiting review before publish' },
  { icon: 'bell', tone: 'neutral', title: '1 scheduled notification going out July 10' },
];

export const RECENT_ACTIVITY: ActivityLog[] = [
  { tag: 'auth', message: 'Login succeeded', meta: 'ava.chen@mail.com', timestamp: '2 min ago' },
  { tag: 'project', message: 'Published "React Weather App"', meta: 'admin@devpath.com', timestamp: '18 min ago' },
  { tag: 'learner', message: 'New learner registered', meta: 'noah.kim@mail.com', timestamp: '41 min ago' },
  { tag: 'content', message: 'Updated curriculum for "Node API Bootcamp"', meta: 'admin@devpath.com', timestamp: '1 hr ago' },
  { tag: 'auth', message: 'Login failed — invalid password', meta: 'unknown@mail.com', timestamp: '2 hr ago' },
];
