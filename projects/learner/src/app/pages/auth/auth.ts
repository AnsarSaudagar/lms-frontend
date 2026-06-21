import { Component, signal, inject } from '@angular/core';
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
export class AuthComponent {
  private authService = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  features = ['AI-generated project guides', 'Git-integrated workflow', 'Progress tracking across all projects', 'Syntax-highlighted code steps'];

  tab = signal<'login' | 'register'>('login');
  email = signal('');
  password = signal('');
  firstName = signal('');
  middleName = signal('');
  lastName = signal('');
  loading = signal(false);
  error = signal('');

  setTab(t: 'login' | 'register') { 
    this.tab.set(t); 
    this.error.set(''); 
    this.router.navigate(['auth/'+ t]);
  }
}
