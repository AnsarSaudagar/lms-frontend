import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../layout/auth/auth';
import { RouterOutlet } from '@angular/router';
import { Main } from '../../../layout/main/main';
import { LayoutService } from '../../../services/layout.service';
import { LAYOUT } from '../../utils/constant';

@Component({
  selector: 'app-configure-layout',
  imports: [CommonModule, Auth, RouterOutlet, Main],
  templateUrl: './configure-layout.html',
  styleUrl: './configure-layout.css',
})
export class ConfigureLayout {
  layout: string = '';
  layoutKeys = LAYOUT;
  constructor(private layoutService: LayoutService) {
    effect(() => {      
      this.layout = layoutService.selectedSignal();
    });
  }
}
