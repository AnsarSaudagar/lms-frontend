import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);

  features = ['AI-generated project guides', 'Git-integrated workflow', 'Progress tracking across all projects', 'Syntax-highlighted code steps'];

  tab = signal<'login' | 'signup'>('login');
  email = signal('');
  password = signal('');
  firstName = signal('');
  middleName = signal('');
  lastName = signal('');
  loading = signal(false);
  error = signal('');

  setTab(t: 'login' | 'signup') { this.tab.set(t); this.error.set(''); }

  handleSubmit(e: Event) {
    e.preventDefault();
    this.error.set('');

    if (!this.email() || !this.password()) { this.error.set('Please fill in all fields.'); return; }
    if (this.tab() === 'signup' && (!this.firstName() || !this.lastName())) {
      this.error.set('Please enter your first and last name.'); return;
    }

    const returnUrl = this.route.snapshot.queryParams['returnUrl'] ?? '/dashboard';
    this.loading.set(true);

    const call$ = this.tab() === 'login'
      ? this.authService.login(this.email(), this.password(), returnUrl)
      : this.authService.register(this.firstName(), this.middleName(), this.lastName(), this.email(), this.password(), returnUrl);

    call$.subscribe({
      error: (err) => {
        this.error.set(err?.error?.message ?? 'Something went wrong. Please try again.');
        this.loading.set(false);
      },
    });
  }

  handleGitHub(){
    
  }
  
}
