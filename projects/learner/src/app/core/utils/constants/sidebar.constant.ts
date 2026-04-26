export interface SidebarNav {
  label: string;
  icon: string;
  route?: string;
}

export interface SidebarGroup {
  label: string;
  navs: SidebarNav[];
}

export const SIDEBAR_ITEMS: SidebarGroup[] = [
  {
    label: '',
    navs: [
      { label: 'Dashboard', icon: 'pi pi-home', route: '/dashboard' },
      { label: 'Projects', icon: 'pi pi-code', route: '/dashboard' },
    ],
  },
  {
    label: 'Account',
    navs: [
      { label: 'Profile', icon: 'pi pi-user' },
      { label: 'Settings', icon: 'pi pi-cog' },
    ],
  },
];
