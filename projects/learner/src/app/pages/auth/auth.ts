import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent implements OnInit, OnDestroy {
  authService = inject(AuthService);
  private router = inject(Router);
  private routerSub!: Subscription;

  features = [
    'AI-generated project guides',
    'Git-integrated workflow',
    'Progress tracking across all projects',
    'Syntax-highlighted code steps'
  ];

  tab = signal<'login' | 'register' | null>('login');
  loading = signal(false);

  ngOnInit(): void {
    this.syncTab(this.router.url);

    this.routerSub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => this.syncTab(e.urlAfterRedirects));
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
  }

  private syncTab(url: string) {
    if (url.includes('/register')) {
      this.tab.set('register');
    } else if (url.includes('/login')) {
      this.tab.set('login');
    } else {
      this.tab.set(null);
    }
  }

  setTab(t: 'login' | 'register') {
    this.tab.set(t);
    this.authService.errorMessage.set('');
    this.router.navigate(['/auth', t]);
  }
}