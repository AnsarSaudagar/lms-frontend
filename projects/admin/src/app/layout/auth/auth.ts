import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  constructor(private authService: AuthService, private router: Router){
    if(this.authService.isLoggedIn()){
      router.navigate(['']);
    }
  }
}
