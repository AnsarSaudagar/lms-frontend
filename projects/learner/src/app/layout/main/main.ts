import { Component } from '@angular/core';
import { Navbar } from '../../core/components/navbar/navbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [Navbar, RouterOutlet],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class MainLayout {}
