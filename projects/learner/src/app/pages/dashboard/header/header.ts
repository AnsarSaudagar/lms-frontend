import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  private authService = inject(AuthService);

  userName = computed(() => this.authService.currentUser()?.name ?? '');
  completed = signal(1);
  inProgress = signal(2);
  stepsDone = signal(13);

  lastProject = signal({
    name: 'Web Scraper CLI',
    currentStep: 3,
    totalSteps: 7,
    progress: 40,
  });

  greeting = signal(this.getGreeting());

  private getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }
}
