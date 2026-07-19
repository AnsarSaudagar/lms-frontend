import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import { Icon } from '../../../core/components/ui/icon/icon';
import { ButtonDirective } from '../../../core/components/ui/button/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Icon, ButtonDirective],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  showPassword = signal(false);
  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  togglePassword() {
    this.showPassword.update(v => !v);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.errorMessage.set(null);
    this.loading.set(true);

    const { email, password } = this.form.getRawValue();
    this.authService.login({ email: email!, password: password! }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigateByUrl('/dashboard');
      },
      error: (err: HttpErrorResponse) => {
        this.loading.set(false);
        if (err.status === 401) {
          this.errorMessage.set('Incorrect email or password.');
        } else if (err.status === 403) {
          this.errorMessage.set('Your account is inactive. Contact an administrator.');
        } else {
          this.errorMessage.set(err.error?.message ?? 'Something went wrong. Please try again.');
        }
      },
    });
  }
}
