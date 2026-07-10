import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Icon } from '../ui/icon/icon';
import { SIDEBAR_FOOTER_ITEMS, SIDEBAR_ITEMS } from '../../utils/constants/sidebar.constant';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  sidebarItems = SIDEBAR_ITEMS;
  footerItems = SIDEBAR_FOOTER_ITEMS;

  collapsed = signal(false);

  toggleCollapse() {
    this.collapsed.update(v => !v);
  }
}
