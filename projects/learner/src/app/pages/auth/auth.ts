import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AppDataService, User } from '../../services/app-data.service';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class AuthComponent {
  private appData = inject(AppDataService);
  private router = inject(Router);

  features = ['AI-generated project guides', 'Git-integrated workflow', 'Progress tracking across all projects', 'Syntax-highlighted code steps'];

  tab = signal<'login' | 'signup'>('login');
  email = signal('');
  password = signal('');
  name = signal('');
  loading = signal(false);
  error = signal('');

  setTab(t: 'login' | 'signup') { this.tab.set(t); this.error.set(''); }

  async handleSubmit(e: Event) {
    e.preventDefault();
    this.error.set('');
    if (!this.email() || !this.password()) { this.error.set('Please fill in all fields.'); return; }
    if (this.tab() === 'signup' && !this.name()) { this.error.set('Please enter your name.'); return; }
    this.loading.set(true);
    await new Promise(r => setTimeout(r, 600));
    const user: User = {
      name: this.name() || this.email().split('@')[0],
      email: this.email(),
      avatar: null,
      githubConnected: false,
    };
    this.appData.saveUser(user);
    this.loading.set(false);
    this.router.navigate(['/dashboard']);
  }

  async handleGitHub() {
    this.loading.set(true);
    await new Promise(r => setTimeout(r, 800));
    const user: User = { name: 'GitHub User', email: 'user@github.com', avatar: null, githubConnected: true };
    this.appData.saveUser(user);
    this.loading.set(false);
    this.router.navigate(['/dashboard']);
  }
}
