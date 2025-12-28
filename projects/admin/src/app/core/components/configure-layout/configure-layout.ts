import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth } from '../../../layout/auth/auth';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Main } from '../../../layout/main/main';
import { LayoutService } from '../../../services/layout.service';
import { LAYOUT } from '../../utils/constant';
import { filter } from 'rxjs/operators';
import { Test } from '../../../pages/test/test';
import { TestLayout } from '../../../layout/test-layout/test-layout';

@Component({
  selector: 'app-configure-layout',
  imports: [CommonModule, Auth, RouterOutlet, Main, TestLayout],
  templateUrl: './configure-layout.html',
  styleUrl: './configure-layout.css',
})
export class ConfigureLayout {
  layoutKeys = LAYOUT;
  layout = computed(() => this.layoutService.selectedSignal());
  
  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {
    // Update layout based on current route
    this.updateLayoutFromRoute();
    
    // Update layout when navigation ends
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.updateLayoutFromRoute();
    //   });
  }
  
  private updateLayoutFromRoute(): void {
    const url = this.router.url;
    if (url.startsWith('/auth')) {
      this.layoutService.selectedSignal.set(LAYOUT.AUTH);
    } else {
      this.layoutService.selectedSignal.set(LAYOUT.MAIN);
    }
  }
}
