import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppDataService, User } from './app-data.service';
import { Login, Register } from '../models/auth.model';
import { Common } from 'shared';

interface AuthResponse {
  accessToken: string;
  user?: { name?: string; email?: string; avatar?: string };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'learner_token';
  private readonly API_URL = environment.API_URL + '/auth';

  private http = inject(HttpClient);
  private router = inject(Router);
  private appData = inject(AppDataService);
  private commonService = inject(Common)

  private tokenSignal = signal<string | null>(null);
  private expiresAtSignal = signal<number | null>(null);
  private logoutTimer: any;
  errorMessage : any = signal(null);
  successMessage : any = signal(null);

  readonly isLoggedIn = computed(() => {
    const token = this.tokenSignal();
    const expiresAt = this.expiresAtSignal();
    return !!token && !!expiresAt && Date.now() < expiresAt;
  });

  login(payload: Login, returnUrl = '/dashboard') {
    return this.http.post<AuthResponse>(this.API_URL + '/login', payload).pipe(
      tap(res => {
        const jwtUser = this.decodeUserFromToken(res.accessToken);
        this.handleAuth(res.accessToken, {
          name: res.user?.name ?? jwtUser.name ?? payload.email.split('@')[0],
          email: res.user?.email ?? jwtUser.email ?? payload.email,
          avatar: res.user?.avatar,
        });
        this.router.navigateByUrl(returnUrl);
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

  verifyOtp(otp: string, email: string, returnUrl='/auth/login'){
    return this.http.post(this.API_URL + '/verify-otp', {otp, email}).pipe(
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

  autoLogin() {
    const raw = localStorage.getItem(this.TOKEN_KEY);
    if (!raw) return;
    try {
      const { token, expiresAt } = JSON.parse(raw);
      if (Date.now() >= expiresAt) { this.logout(); return; }
      this.tokenSignal.set(token);
      this.expiresAtSignal.set(expiresAt);
      this.startLogoutTimer(expiresAt);
    } catch {
      this.logout();
    }
  }

  logout() {
    this.clearTimer();
    this.tokenSignal.set(null);
    this.expiresAtSignal.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    this.appData.saveUser(null);
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
    this.appData.saveUser(user);
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
}
