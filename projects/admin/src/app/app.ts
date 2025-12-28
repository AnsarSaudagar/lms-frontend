import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigureLayout } from './core/components/configure-layout/configure-layout';


@Component({
  selector: 'app-root',
  imports: [ CommonModule, ConfigureLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  constructor(private authService: AuthService){
    authService.autoLogin();
  }
}
