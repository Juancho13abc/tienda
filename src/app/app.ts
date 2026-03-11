import {ChangeDetectionStrategy, Component, inject, effect} from '@angular/core';
import {RouterOutlet, Router} from '@angular/router';
import {Navbar} from './navbar';
import {Footer} from './footer';
import {StoreService} from './services/store';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, CommonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  store = inject(StoreService);
  router = inject(Router);

  constructor() {
    effect(() => {
      const role = this.store.userRole();
      const currentUrl = this.router.url;
      
      if (role === 'ADMIN' && !currentUrl.startsWith('/admin')) {
        this.router.navigate(['/admin']);
      } else if (role === 'CUSTOMER' && currentUrl.startsWith('/admin')) {
        this.router.navigate(['/']);
      }
    });
  }
}
