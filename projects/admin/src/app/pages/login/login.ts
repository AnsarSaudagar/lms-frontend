import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.loginForm = new FormGroup({
      'email': new FormControl('ansarsaudagar40@gmail.com', [Validators.required, Validators.email]),
      'password': new FormControl('AnsarHussain', [Validators.required])
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
      const { email, password } = this.loginForm.value;

      this.authService.loginAndRedirect(email, password);
    }
  }
}
