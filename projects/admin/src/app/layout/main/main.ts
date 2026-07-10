import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { Topbar } from '../../core/components/topbar/topbar';

@Component({
  selector: 'app-main-layout',
  imports: [Sidebar, Topbar, RouterOutlet],
  templateUrl: './main.html',
})
export class MainLayout {}
