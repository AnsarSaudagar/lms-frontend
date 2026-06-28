import { Component } from '@angular/core';
import { Navbar } from '../../core/components/navbar/navbar';
import { Sidebar } from '../../core/components/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, Sidebar, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class MainLayout {}
