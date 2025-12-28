import { Component } from '@angular/core';
import { Layout } from '../../../services/layout.service';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../layout/auth/auth';
import { RouterOutlet } from '@angular/router';
import { Main } from '../../../layout/main/main';

@Component({
  selector: 'app-configure-layout',
  imports: [CommonModule, Auth, RouterOutlet, Main],
  templateUrl: './configure-layout.html',
  styleUrl: './configure-layout.css',
})
export class ConfigureLayout {
  layout: string = '';
  constructor(private layoutService: Layout) {
    this.layout = layoutService.selectedSignal();
  }
}
