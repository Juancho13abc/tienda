import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterOutlet, Router, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatIconModule, CommonModule],
  template: `
    <div class="flex h-screen bg-slate-50 overflow-hidden relative">
      <!-- Mobile Sidebar Overlay -->
      @if (sidebarOpen()) {
        <div 
          class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 lg:hidden"
          (click)="sidebarOpen.set(false)"
          (keydown.enter)="sidebarOpen.set(false)"
          tabindex="0"
          role="button"
          aria-label="Cerrar menú lateral"
        ></div>
      }

      <!-- Sidebar -->
      <aside 
        class="fixed inset-y-0 left-0 w-72 bg-primary text-white flex flex-col shadow-2xl z-50 lg:static lg:translate-x-0 transition-transform duration-500 ease-in-out"
        [class.-translate-x-full]="!sidebarOpen()"
        [class.translate-x-0]="sidebarOpen()"
      >
        <div class="p-8 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-primary">
              <mat-icon>admin_panel_settings</mat-icon>
            </div>
            <span class="text-xl font-black tracking-tighter uppercase">Admin<span class="text-accent italic">Panel</span></span>
          </div>
          <button (click)="sidebarOpen.set(false)" class="lg:hidden text-white/40 hover:text-white">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <nav class="flex-1 p-6 space-y-2 overflow-y-auto">
          <a 
            routerLink="/admin" 
            (click)="sidebarOpen.set(false)"
            routerLinkActive="bg-accent text-primary shadow-xl shadow-accent/20"
            [routerLinkActiveOptions]="{exact: true}"
            class="flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:scale-110 transition-transform">dashboard</mat-icon>
            Dashboard
          </a>
          <a 
            routerLink="/admin/productos" 
            (click)="sidebarOpen.set(false)"
            routerLinkActive="bg-accent text-primary shadow-xl shadow-accent/20"
            class="flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:scale-110 transition-transform">inventory_2</mat-icon>
            Productos
          </a>
          <a 
            routerLink="/admin/pedidos" 
            (click)="sidebarOpen.set(false)"
            routerLinkActive="bg-accent text-primary shadow-xl shadow-accent/20"
            class="flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:scale-110 transition-transform">shopping_cart</mat-icon>
            Pedidos
          </a>
          <a 
            routerLink="/admin/clientes" 
            (click)="sidebarOpen.set(false)"
            routerLinkActive="bg-accent text-primary shadow-xl shadow-accent/20"
            class="flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:scale-110 transition-transform">people</mat-icon>
            Clientes
          </a>
          <a 
            routerLink="/admin/analiticas" 
            (click)="sidebarOpen.set(false)"
            routerLinkActive="bg-accent text-primary shadow-xl shadow-accent/20"
            class="flex items-center gap-4 p-4 rounded-2xl transition-all font-black text-sm hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:scale-110 transition-transform">bar_chart</mat-icon>
            Analíticas
          </a>
        </nav>

        <div class="p-6 border-t border-white/10">
          <button 
            (click)="exitAdmin()"
            class="w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm text-white/60 hover:text-white hover:bg-white/5 group"
          >
            <mat-icon class="group-hover:rotate-12 transition-transform">logout</mat-icon>
            Salir de Admin
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col overflow-hidden">
        <!-- Top Header -->
        <header class="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-6 sm:px-10 shadow-sm z-10">
          <div class="flex items-center gap-4">
            <button 
              (click)="sidebarOpen.set(true)"
              class="lg:hidden w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors"
            >
              <mat-icon>menu</mat-icon>
            </button>
            <h2 class="text-lg sm:text-xl font-bold text-primary truncate">Bienvenido, <span class="text-accent italic hidden sm:inline">Administrador</span></h2>
          </div>
          <div class="flex items-center gap-3 sm:gap-6">
            <button class="relative w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
              <mat-icon>notifications</mat-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white"></span>
            </button>
            <div class="hidden sm:block h-10 w-[1px] bg-slate-100"></div>
            <div class="flex items-center gap-3">
              <div class="hidden md:block text-right">
                <p class="text-xs font-black text-primary uppercase tracking-widest">Juan Pérez</p>
                <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Super Admin</p>
              </div>
              <div class="w-10 h-10 bg-primary text-accent rounded-xl flex items-center justify-center font-black shadow-lg shadow-primary/20 border border-white/10">JP</div>
            </div>
          </div>
        </header>

        <!-- View Content -->
        <div class="flex-1 overflow-y-auto p-6 sm:p-10">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminLayout {
  store = inject(StoreService);
  router = inject(Router);
  sidebarOpen = signal(false);

  exitAdmin() {
    this.store.userRole.set('CUSTOMER');
    this.router.navigate(['/']);
  }
}
