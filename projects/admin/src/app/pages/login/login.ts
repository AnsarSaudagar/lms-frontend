import { Component } from '@angular/core';
import { Auth } from '../../layout/auth/auth';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [Auth, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

}
