import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login, Register } from '../models/auth.model';
import { Common } from 'shared';

export interface User {
  name: string;
  email: string;
  avatar: string | null;
  githubConnected: boolean;
  isPro?: boolean;
}

interface AuthResponse {
  accessToken: string;
  user?: { name?: string; email?: string; avatar?: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'learner_token';
  private readonly USER_KEY = 'learner_user';
  private readonly API_URL = environment.API_URL + '/auth';

  private http = inject(HttpClient);
  private router = inject(Router);
  private commonService = inject(Common);

  private tokenSignal = signal<string | null>(null);
  private expiresAtSignal = signal<number | null>(null);
  private userSignal = signal<User | null>(null);
  private logoutTimer: any;
  errorMessage: any = signal(null);
  successMessage: any = signal(null);

  readonly currentUser = this.userSignal.asReadonly();

  readonly isLoggedIn = computed(() => {
    const token = this.tokenSignal();
    const expiresAt = this.expiresAtSignal();
    return !!token && !!expiresAt && Date.now() < expiresAt;
  });

  login(payload: Login, returnUrl = '/learner') {
    return this.http.post<AuthResponse>(this.API_URL + '/login', payload).pipe(
      tap(res => {
        const jwtUser = this.decodeUserFromToken(res.accessToken);
        this.handleAuth(res.accessToken, {
          name: res.user?.name ?? jwtUser.name ?? payload.email.split('@')[0],
          email: res.user?.email ?? jwtUser.email ?? payload.email,
          avatar: res.user?.avatar,
        });
        this.router.navigateByUrl(returnUrl);
      }),
      catchError((errRes) => {
        console.error('Registration failed', errRes);
        this.errorMessage.set(errRes.error.error.message);
        return throwError(() => errRes);
      })
    );
  }

  register(payload: Register, returnUrl = '/auth/verify-otp') {
    return this.http.post<AuthResponse>(this.API_URL + '/register', payload).pipe(
      tap(res => {
        // this.successMessage.set("Otp Sent on " + payload.email);
        this.commonService.setLocalStore('otp_verification_email', payload.email);
        this.router.navigateByUrl(returnUrl);
      }),
      catchError((errRes) => {
        console.error('Registration failed', errRes);
        this.errorMessage.set(errRes.error.error.message);
        return throwError(() => errRes);
      })
    );
  }

  verifyOtp(otp: string, email: string, returnUrl='/auth/login', key: 'otp' | 'reset-otp' = 'otp'){
    return this.http.post(this.API_URL + '/verify-otp', { key, otp, email }).pipe(
      tap(res => {
        this.successMessage.set("Successfully Registered");
        this.router.navigateByUrl(returnUrl);
      }),
      catchError((errRes) => {
        console.error('Registration failed', errRes);
        this.errorMessage.set(errRes.error.error.message);
        return throwError(() => errRes);
      })
    )
  }

  forgotPassword(email: string) {
    return this.http.post(this.API_URL + '/forgot-password', { email }).pipe(
      tap(() => {
        this.commonService.setLocalStore('forgot_password_email', email);
        this.router.navigate(['/auth/verify-otp'], { queryParams: { mode: 'forgot' } });
      }),
      catchError((errRes) => {
        this.errorMessage.set(errRes.error?.error?.message ?? 'Something went wrong.');
        return throwError(() => errRes);
      })
    );
  }

  resetPassword(email: string, newPassword: string){
    return this.http.post(this.API_URL + '/reset-password', {email, newPassword}).pipe(
      tap(res => {
        this.successMessage.set("Successfully Registered");
        this.router.navigateByUrl('/auth/login');
      }),
      catchError((errRes) => {
        console.error('Registration failed', errRes);
        this.errorMessage.set(errRes.error.error.message);
        return throwError(() => errRes);
      })
    );
  }

  autoLogin() {
    const raw = localStorage.getItem(this.TOKEN_KEY);
    if (!raw) return;
    try {
      const { token, expiresAt } = JSON.parse(raw);
      if (Date.now() >= expiresAt) { this.logout(); return; }
      this.tokenSignal.set(token);
      this.expiresAtSignal.set(expiresAt);
      this.startLogoutTimer(expiresAt);
      this.userSignal.set(this.loadUserLocal());
    } catch {
      this.logout();
    }
  }

  logout() {
    this.clearTimer();
    this.tokenSignal.set(null);
    this.expiresAtSignal.set(null);
    this.userSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.router.navigate(['/auth']);
  }


  getToken(): string | null {
    return this.tokenSignal();
  }

  private handleAuth(token: string, userInfo: { name: string; email: string; avatar?: string }) {
    const expiresAt = this.extractExpiration(token);
    this.tokenSignal.set(token);
    this.expiresAtSignal.set(expiresAt);
    localStorage.setItem(this.TOKEN_KEY, JSON.stringify({ token, expiresAt }));
    this.startLogoutTimer(expiresAt);

    const user: User = {
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.avatar ?? null,
      githubConnected: false,
    };
    this.saveUserLocal(user);
    
  }

  private extractExpiration(token: string): number {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.exp) throw new Error('JWT missing exp claim');
    return payload.exp * 1000;
  }

  private decodeUserFromToken(token: string): { name?: string; email?: string } {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return { name: payload.name, email: payload.email };
    } catch {
      return {};
    }
  }

  private startLogoutTimer(expiresAt: number) {
    this.clearTimer();
    this.logoutTimer = setTimeout(() => this.logout(), expiresAt - Date.now());
  }

  private clearTimer() {
    if (this.logoutTimer) { clearTimeout(this.logoutTimer); this.logoutTimer = null; }
  }

  updateUser(partial: Partial<User>) {
    const updated = { ...this.userSignal()!, ...partial };
    this.saveUserLocal(updated);
  }

  private saveUserLocal(user: User | null) {
    this.userSignal.set(user);
    this.commonService.setLocalStore(this.USER_KEY, JSON.stringify(user));
  }

  private loadUserLocal(): User | null {
    try {
      const raw = this.commonService.getLocalStore(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
}
