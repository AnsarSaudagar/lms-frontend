export interface SidebarNav {
  label: string;
  icon: string;
  route: string;
}

export interface SidebarGroup {
  label: string;
  navs: SidebarNav[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    label: '',
    navs: [{ label: 'Dashboard', icon: 'grid', route: '/dashboard' }],
  },
  {
    label: 'Manage',
    navs: [
      { label: 'Learners', icon: 'users', route: '/learners' },
      { label: 'Projects', icon: 'folder', route: '/projects' },
      { label: 'Content', icon: 'file', route: '/content' },
    ],
  },
  {
    label: 'Insights',
    navs: [
      { label: 'Analytics', icon: 'bar-chart', route: '/analytics' },
      { label: 'Notifications', icon: 'bell', route: '/notifications' },
      { label: 'System Logs', icon: 'list', route: '/system-logs' },
    ],
  },
];

export const SIDEBAR_FOOTER_ITEMS: SidebarNav[] = [
  { label: 'Settings', icon: 'settings', route: '/settings' },
];
