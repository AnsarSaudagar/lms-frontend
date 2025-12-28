import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AuthResponse, StoredAuthData } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly API_URL = environment.API_URL + '/auth';

  private tokenSignal = signal<string | null>(null);
  private expiresAtSignal = signal<number | null>(null);

  readonly isLoggedIn = computed(() => {
    const token = this.tokenSignal();
    const expiresAt = this.expiresAtSignal();

    return !!token && !!expiresAt && Date.now() < expiresAt;
  });

  private logoutTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  loginAndRedirect(email: string, password: string, returnUrl = '/') {
    return this.http
      .post<AuthResponse>(this.API_URL + '/login-admin', { email, password })
      .subscribe({
        next: (res: AuthResponse) => {
          this.handleAuth(res.accessToken);
          this.router.navigateByUrl(returnUrl);
        },
        error: () => this.logout(),
      });
  }

  autoLogin() {
    const tokenData = localStorage.getItem(this.TOKEN_KEY);

    if (!tokenData) return;

    const data: StoredAuthData = JSON.parse(tokenData);

    if (Date.now() >= data.expiresAt) {
      this.logout();
      return;
    }

    this.tokenSignal.set(data.token);
    this.expiresAtSignal.set(data.expiresAt);

    this.startLogoutTimer(data.expiresAt);
  }

  logout() {
    this.clearTimer();
    this.tokenSignal.set(null);
    this.expiresAtSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['auth', 'login']);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  private handleAuth(token: string) {
    const expiresAt = this.extractExpiration(token);

    this.tokenSignal.set(token);
    this.expiresAtSignal.set(expiresAt);

    localStorage.setItem(this.TOKEN_KEY, JSON.stringify({ token, expiresAt }));

    this.startLogoutTimer(expiresAt);
  }

  private extractExpiration(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    
    if (!payload.exp) {
      throw new Error('JWT does not contain exp claim');
    }

    return payload.exp * 1000;
  }

  private startLogoutTimer(expiresAt: number) {
    this.clearTimer();

    const duration = expiresAt - Date.now();

    this.logoutTimer = setTimeout(() => this.logout(), duration);
  }

  private clearTimer() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
      this.logoutTimer = null;
    }
  }
}
