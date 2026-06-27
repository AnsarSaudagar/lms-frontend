import { Component, ElementRef, inject, OnDestroy, OnInit, QueryList, signal, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Common } from 'shared';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-verify-register-otp',
  imports: [],
  templateUrl: './verify-register-otp.html',
  styleUrl: './verify-register-otp.scss',
})
export class VerifyRegisterOtp implements OnInit, OnDestroy {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private commonService = inject(Common);
  private authService = inject(AuthService);

  readonly otpIndices = [0, 1, 2, 3, 4, 5];
  otp: string[] = ['', '', '', '', '', ''];

  email = signal('');
  loading = signal(false);
  countdown = signal(30);
  mode = signal<'forgot' | 'register'>('register');

  private countdownTimer: any;

  ngOnInit() {
    const queryMode = this.route.snapshot.queryParamMap.get('mode');
    this.mode.set(queryMode === 'forgot' ? 'forgot' : 'register');

    const storageKey = this.mode() === 'forgot' ? 'forgot_password_email' : 'otp_verification_email';
    const saved = this.commonService.getLocalStore(storageKey);
    if (saved) this.email.set(saved);

    this.startCountdown();
  }

  ngOnDestroy() {
    clearInterval(this.countdownTimer);
  }

  onKeyDown(e: KeyboardEvent, i: number) {
    const inputs = this.otpInputs.toArray();
    if (e.key === 'Backspace') {
      if (this.otp[i]) {
        this.otp[i] = '';
        inputs[i].nativeElement.value = '';
      } else if (i > 0) {
        this.otp[i - 1] = '';
        inputs[i - 1].nativeElement.value = '';
        inputs[i - 1].nativeElement.focus();
      }
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' && i > 0) {
      inputs[i - 1].nativeElement.focus();
    } else if (e.key === 'ArrowRight' && i < 5) {
      inputs[i + 1].nativeElement.focus();
    }
  }

  onInput(e: Event, i: number) {
    const input = e.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '').slice(-1);
    this.otp[i] = val;
    input.value = val;
    if (val && i < 5) {
      this.otpInputs.toArray()[i + 1].nativeElement.focus();
    }
  }

  onPaste(e: ClipboardEvent) {
    e.preventDefault();
    const text = e.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6).split('');
    const inputs = this.otpInputs.toArray();
    digits.forEach((d, i) => {
      this.otp[i] = d;
      inputs[i].nativeElement.value = d;
    });
    const next = Math.min(digits.length, 5);
    inputs[next].nativeElement.focus();
  }

  verify() {
    if (this.otp.join('').length < 6) return;
    this.loading.set(true);
    const returnUrl = this.mode() === 'forgot' ? '/auth/reset-password' : '/auth/login';
    const key = this.mode() === 'forgot' ? 'reset-otp' : 'otp';
    this.authService.verifyOtp(this.otp.join(''), this.email(), returnUrl, key).subscribe({
      error: () => {
        this.loading.set(false);
        this.otp = ['', '', '', '', '', ''];
        this.otpInputs.toArray().forEach(i => i.nativeElement.value = '');
        this.otpInputs.first?.nativeElement.focus();
      },
    });
  }

  resend() {
    // TODO: call resend OTP API
    this.startCountdown();
  }

  goBack() {
    const route = this.mode() === 'forgot' ? '/auth/forgot-password' : '/auth/register';
    this.router.navigate([route]);
  }

  private startCountdown() {
    clearInterval(this.countdownTimer);
    this.countdown.set(30);
    this.countdownTimer = setInterval(() => {
      this.countdown.update(v => {
        if (v <= 1) { clearInterval(this.countdownTimer); return 0; }
        return v - 1;
      });
    }, 1000);
  }
}
