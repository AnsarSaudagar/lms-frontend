import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from '../../../services/layout.service';
import { LAYOUT } from '../../utils/constant';
import { MainLayout } from '../../../layout/main/main';
import { AuthLayout } from '../../../layout/auth/auth';

@Component({
  selector: 'app-route-wrapper',
  imports: [RouterOutlet, MainLayout, AuthLayout],
  template: `
    @switch (layoutService.selectedSignal()) {
      @case ('${LAYOUT.MAIN}') {
        <app-main-layout><router-outlet /></app-main-layout>
      }
      @default {
        <app-auth-layout><router-outlet /></app-auth-layout>
      }
    }
  `,
})
export class RouteWrapper {
  layoutService = inject(LayoutService);
}
