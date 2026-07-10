import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs';
import { Icon } from '../ui/icon/icon';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-topbar',
  imports: [Icon],
  templateUrl: './topbar.html',
})
export class Topbar {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  authService = inject(AuthService);

  menuOpen = signal(false);

  pageTitle = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(() => this.resolveTitle()),
      startWith(this.resolveTitle()),
    ),
    { initialValue: 'Dashboard' },
  );

  toggleMenu() {
    this.menuOpen.update(v => !v);
  }

  logout() {
    this.menuOpen.set(false);
    this.authService.logout();
  }

  private resolveTitle(): string {
    let current = this.route;
    // while (current.firstChild) current = current.firstChild;
    // return current.snapshot.data['title'] ?? 'Dashboard';
    return 'Dashboard'
  }
}
