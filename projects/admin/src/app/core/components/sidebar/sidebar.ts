import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SIDEBAR_ITEMS } from '../../utils/constants/sidebar.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  activeItem = 'courses';
  sidebarItems = SIDEBAR_ITEMS;
  router = inject(Router);

  setActive(item: string, route: any) {
    this.activeItem = item;

    if(route){
      this.router.navigate([route]);
    }
  }
}
