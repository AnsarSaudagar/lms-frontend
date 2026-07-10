import { Injectable, computed, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminUser, LoginPayload } from '../models/auth.model';

const STORAGE_KEY = 'admin_user';

const MOCK_ADMIN: AdminUser = {
  name: 'Admin User',
  email: 'admin@devpath.com',
  role: 'Super Admin',
  avatarInitials: 'AU',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<AdminUser | null>(this.loadUser());

  readonly currentUser = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => !!this.userSignal());

  constructor(private router: Router) {}

  login(payload: LoginPayload): { success: boolean; error?: string } {
    if (!payload.email || !payload.password) {
      return { success: false, error: 'Email and password are required.' };
    }
    if (payload.password.length < 4) {
      return { success: false, error: 'Incorrect email or password.' };
    }

    const user: AdminUser = { ...MOCK_ADMIN, email: payload.email };
    this.userSignal.set(user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return { success: true };
  }

  logout() {
    this.userSignal.set(null);
    localStorage.removeItem(STORAGE_KEY);
    this.router.navigate(['/auth/login']);
  }

  private loadUser(): AdminUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
