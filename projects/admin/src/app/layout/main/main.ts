import { Component } from '@angular/core';
import { Navbar } from '../../core/components/navbar/navbar';
import { Sidebar } from '../../core/components/sidebar/sidebar';

@Component({
  selector: 'app-main',
  imports: [Navbar, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
