import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    email: ['admin@devpath.com', [Validators.required, Validators.email]],
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

    setTimeout(() => {
      const { email, password } = this.form.getRawValue();
      const result = this.authService.login({ email: email!, password: password! });
      this.loading.set(false);
      if (result.success) {
        this.router.navigateByUrl('/dashboard');
      } else {
        this.errorMessage.set(result.error ?? 'Something went wrong.');
      }
    }, 400);
  }
}
