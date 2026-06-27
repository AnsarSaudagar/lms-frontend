import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  fb = inject(FormBuilder);
  error: any = input();
  authService = inject(AuthService);
  loading = signal(false);

  signupForm: FormGroup = this.fb.group({
    firstName: ['', [Validators.required]],
    middleName: ['', []],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  handleSubmit(): void {


    this.loading.set(true);
    
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      // this.error.set('Please fill in all required fields correctly.');
      return;
    }

    this.authService
      .register({...this.signupForm.value})
      .subscribe({
        error: () => this.loading.set(false),
        complete: () => this.loading.set(false),
      });
  }
}
