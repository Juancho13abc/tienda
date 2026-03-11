import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from './services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, MatIconModule, CommonModule, FormsModule],
  template: `
    <nav class="bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a routerLink="/" class="text-2xl sm:text-3xl font-bold tracking-tighter text-primary flex items-center gap-2 group">
              <div class="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center text-white group-hover:bg-accent transition-colors">
                <mat-icon class="text-sm sm:text-base">shopping_bag</mat-icon>
              </div>
              <span class="font-serif">MODERNA</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex space-x-8 lg:space-x-10 items-center">
            <a routerLink="/" routerLinkActive="text-accent font-bold" [routerLinkActiveOptions]="{exact: true}" class="text-slate-500 hover:text-primary text-xs lg:text-sm font-bold uppercase tracking-widest transition-all">Inicio</a>
            <a routerLink="/catalogo" routerLinkActive="text-accent font-bold" class="text-slate-500 hover:text-primary text-xs lg:text-sm font-bold uppercase tracking-widest transition-all">Catálogo</a>
            <a routerLink="/sobre-nosotros" routerLinkActive="text-accent font-bold" class="text-slate-500 hover:text-primary text-xs lg:text-sm font-bold uppercase tracking-widest transition-all">Nosotros</a>
            <a routerLink="/contacto" routerLinkActive="text-accent font-bold" class="text-slate-500 hover:text-primary text-xs lg:text-sm font-bold uppercase tracking-widest transition-all">Contacto</a>
          </div>

          <!-- Actions -->
          <div class="flex items-center space-x-2 sm:space-x-6">
            <!-- Search Bar -->
            <div class="hidden lg:block relative group">
              <input 
                type="text" 
                [(ngModel)]="searchQuery"
                (keyup.enter)="onSearch()"
                placeholder="Buscar..." 
                class="bg-slate-50 border border-slate-200 rounded-2xl py-2.5 px-5 pl-12 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent w-48 focus:w-72 transition-all duration-500 text-sm font-medium"
              />
              <mat-icon class="absolute left-4 top-2.5 text-slate-400 text-sm group-focus-within:text-accent transition-colors">search</mat-icon>
            </div>

            <!-- User -->
            <a routerLink="/cuenta" class="text-slate-500 hover:text-primary p-2 sm:p-2.5 rounded-2xl hover:bg-slate-50 transition-all relative group border border-transparent hover:border-slate-100">
              <mat-icon>person_outline</mat-icon>
              <span class="hidden lg:block absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">Mi Cuenta</span>
            </a>

            <!-- Cart -->
            <a routerLink="/carrito" class="text-slate-500 hover:text-primary p-2 sm:p-2.5 rounded-2xl hover:bg-slate-50 transition-all relative group border border-transparent hover:border-slate-100">
              <mat-icon>shopping_cart</mat-icon>
              @if (store.cartCount() > 0) {
                <span class="absolute -top-1 -right-1 bg-accent text-primary text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-lg shadow-accent/20">
                  {{ store.cartCount() }}
                </span>
              }
              <span class="hidden lg:block absolute -bottom-10 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 whitespace-nowrap shadow-xl z-50">Carrito</span>
            </a>

            <!-- Mobile Menu Button -->
            <button 
              (click)="mobileMenuOpen.set(!mobileMenuOpen())"
              class="md:hidden text-slate-500 p-2 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-all"
            >
              <mat-icon>{{ mobileMenuOpen() ? 'close' : 'menu' }}</mat-icon>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div 
        class="md:hidden overflow-hidden transition-all duration-500 ease-in-out"
        [style.max-height]="mobileMenuOpen() ? '400px' : '0'"
      >
        <div class="px-4 pt-2 pb-6 space-y-2 bg-white border-t border-slate-50">
          <div class="relative group mb-4">
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              (keyup.enter)="onSearch()"
              placeholder="Buscar productos..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3 px-5 pl-12 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent text-sm font-medium"
            />
            <mat-icon class="absolute left-4 top-3 text-slate-400 text-sm group-focus-within:text-accent transition-colors">search</mat-icon>
          </div>
          <a 
            routerLink="/" 
            (click)="mobileMenuOpen.set(false)"
            routerLinkActive="bg-accent/10 text-accent" 
            [routerLinkActiveOptions]="{exact: true}" 
            class="block px-6 py-4 rounded-2xl text-slate-500 font-bold uppercase tracking-widest text-xs transition-all"
          >
            Inicio
          </a>
          <a 
            routerLink="/catalogo" 
            (click)="mobileMenuOpen.set(false)"
            routerLinkActive="bg-accent/10 text-accent" 
            class="block px-6 py-4 rounded-2xl text-slate-500 font-bold uppercase tracking-widest text-xs transition-all"
          >
            Catálogo
          </a>
          <a 
            routerLink="/sobre-nosotros" 
            (click)="mobileMenuOpen.set(false)"
            routerLinkActive="bg-accent/10 text-accent" 
            class="block px-6 py-4 rounded-2xl text-slate-500 font-bold uppercase tracking-widest text-xs transition-all"
          >
            Nosotros
          </a>
          <a 
            routerLink="/contacto" 
            (click)="mobileMenuOpen.set(false)"
            routerLinkActive="bg-accent/10 text-accent" 
            class="block px-6 py-4 rounded-2xl text-slate-500 font-bold uppercase tracking-widest text-xs transition-all"
          >
            Contacto
          </a>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Navbar {
  store = inject(StoreService);
  router = inject(Router);
  searchQuery = signal('');
  mobileMenuOpen = signal(false);

  onSearch() {
    if (this.searchQuery().trim()) {
      this.router.navigate(['/catalogo'], { queryParams: { search: this.searchQuery() } });
      this.searchQuery.set('');
      this.mobileMenuOpen.set(false);
    }
  }
}
