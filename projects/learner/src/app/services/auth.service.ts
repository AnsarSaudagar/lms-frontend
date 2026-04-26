import { Injectable } from '@angular/core';
import { AppDataService } from './app-data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private appData: AppDataService) {}

  isLoggedIn(): boolean {
    return !!this.appData.loadUser();
  }

  getToken(): string | null {
    const user = this.appData.loadUser();
    return user ? btoa(user.email) : null;
  }

  logout(): void {
    this.appData.saveUser(null);
  }
}
