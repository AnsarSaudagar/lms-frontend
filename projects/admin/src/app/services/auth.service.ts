import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AdminUser, LoginApiResponse, LoginPayload } from '../models/auth.model';

const TOKEN_KEY = 'admin_token';
const USER_KEY = 'admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private userSignal = signal<AdminUser | null>(this.loadUser());

  readonly currentUser = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.userSignal());

  login(payload: LoginPayload) {
    return this.http.post<LoginApiResponse>('/auth/login-admin', payload).pipe(
      tap(res => {
        const user = this.mapToAdminUser(res);
        localStorage.setItem(TOKEN_KEY, res.accessToken);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        this.userSignal.set(user);
      }),
      map(res => this.mapToAdminUser(res)),
    );
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private mapToAdminUser(res: LoginApiResponse): AdminUser {
    const name = `${res.firstName} ${res.lastName}`.trim();
    const avatarInitials = `${res.firstName?.[0] ?? ''}${res.lastName?.[0] ?? ''}`.toUpperCase();
    return { id: res._id, name, email: res.email, role: res.role, avatarInitials };
  }

  private loadUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
