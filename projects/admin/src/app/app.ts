import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ConfigureLayout } from './core/components/configure-layout/configure-layout';
import { GlobalLoader } from './core/components/global-loader/global-loader';
import { LoaderService } from './services/loader.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [ CommonModule, ConfigureLayout, GlobalLoader, ToastModule],
  providers: [MessageService],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

  private loaderService = inject(LoaderService);

  loading = this.loaderService.loading;
  
  constructor(private authService: AuthService){
    this.authService.autoLogin();
  }
}
