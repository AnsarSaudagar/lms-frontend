import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent implements OnInit {
  authService = inject(AuthService);
  private router = inject(Router);

  features = [
    'AI-generated project guides',
    'Git-integrated workflow',
    'Progress tracking across all projects',
    'Syntax-highlighted code steps'
  ];

  tab = signal<'login' | 'register' | null>('login');
  loading = signal(false);

  ngOnInit(): void {
    if (this.router.url.includes('/register')) {
      this.tab.set('register');
    } else if(this.router.url.includes('/login')) {
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