import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from './services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [MatIconModule, CommonModule, FormsModule],
  template: `
    <div class="bg-surface min-h-screen py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col lg:flex-row gap-16">
          <!-- Sidebar -->
          <aside class="w-full lg:w-80 space-y-8 flex-shrink-0">
            <div class="card-premium p-10 text-center relative overflow-hidden">
              <div class="absolute top-0 left-0 w-full h-24 bg-primary/5"></div>
              <div class="relative">
                <div class="w-28 h-28 bg-white rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 border border-slate-100 shadow-2xl shadow-slate-200/50">
                  <mat-icon class="text-5xl">person</mat-icon>
                </div>
                <h2 class="text-2xl font-bold text-primary mb-1">Juan Pérez</h2>
                <p class="text-sm text-slate-400 mb-8 font-medium">juan.perez&#64;ejemplo.com</p>
                
                <!-- Role Badge -->
                <div class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500 mb-8">
                  <mat-icon class="text-sm">{{ store.userRole() === 'ADMIN' ? 'verified_user' : 'person' }}</mat-icon>
                  Rol: {{ store.userRole() }}
                </div>

                <button class="w-full bg-slate-50 text-slate-500 py-4 rounded-2xl font-bold hover:bg-red-50 hover:text-red-500 transition-all text-sm flex items-center justify-center gap-2">
                  <mat-icon class="text-sm">logout</mat-icon>
                  Cerrar Sesión
                </button>
              </div>
            </div>

            <nav class="card-premium p-3 space-y-1">
              <button 
                (click)="activeTab.set('orders')"
                class="w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest"
                [class.bg-primary]="activeTab() === 'orders'"
                [class.text-white]="activeTab() === 'orders'"
                [class.text-slate-400]="activeTab() !== 'orders'"
                [class.hover:bg-slate-50]="activeTab() !== 'orders'"
                [class.hover:text-primary]="activeTab() !== 'orders'"
              >
                <mat-icon>shopping_bag</mat-icon>
                Mis Pedidos
              </button>
              <button 
                (click)="activeTab.set('profile')"
                class="w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest"
                [class.bg-primary]="activeTab() === 'profile'"
                [class.text-white]="activeTab() === 'profile'"
                [class.text-slate-400]="activeTab() !== 'profile'"
                [class.hover:bg-slate-50]="activeTab() !== 'profile'"
                [class.hover:text-primary]="activeTab() !== 'profile'"
              >
                <mat-icon>settings</mat-icon>
                Perfil y Seguridad
              </button>
              <button 
                (click)="activeTab.set('addresses')"
                class="w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest"
                [class.bg-primary]="activeTab() === 'addresses'"
                [class.text-white]="activeTab() === 'addresses'"
                [class.text-slate-400]="activeTab() !== 'addresses'"
                [class.hover:bg-slate-50]="activeTab() !== 'addresses'"
                [class.hover:text-primary]="activeTab() !== 'addresses'"
              >
                <mat-icon>location_on</mat-icon>
                Direcciones
              </button>
              <button 
                (click)="activeTab.set('roles')"
                class="w-full flex items-center gap-4 p-5 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest"
                [class.bg-primary]="activeTab() === 'roles'"
                [class.text-white]="activeTab() === 'roles'"
                [class.text-slate-400]="activeTab() !== 'roles'"
                [class.hover:bg-slate-50]="activeTab() !== 'roles'"
                [class.hover:text-primary]="activeTab() !== 'roles'"
              >
                <mat-icon>admin_panel_settings</mat-icon>
                Gestión de Roles
              </button>
            </nav>
          </aside>

          <!-- Main Content -->
          <main class="flex-1">
            @if (activeTab() === 'orders') {
              <div class="space-y-12">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                  <h1 class="text-4xl font-bold tracking-tight text-primary">Historial de <span class="text-accent italic">Pedidos</span></h1>
                  <div class="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
                    <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Filtrar:</span>
                    <select class="bg-transparent font-bold text-sm text-primary focus:outline-none pr-8 cursor-pointer">
                      <option>Todos los pedidos</option>
                      <option>Últimos 3 meses</option>
                      <option>Año 2024</option>
                    </select>
                  </div>
                </div>

                <div class="space-y-8">
                  @for (order of store.orders(); track order.id) {
                    <div class="card-premium p-10 group">
                      <div class="flex flex-col xl:flex-row justify-between gap-10 mb-10 pb-10 border-b border-slate-100">
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-12 flex-1">
                          <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Referencia</p>
                            <p class="font-black text-primary">{{ order.id }}</p>
                          </div>
                          <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Fecha</p>
                            <p class="font-bold text-primary">{{ order.date | date:'mediumDate' }}</p>
                          </div>
                          <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Total</p>
                            <p class="font-black text-accent">{{ order.total | currency }}</p>
                          </div>
                          <div>
                            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Estado</p>
                            <span 
                              class="inline-flex items-center px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest"
                              [class.bg-emerald-50]="order.status === 'Entregado'"
                              [class.text-emerald-600]="order.status === 'Entregado'"
                              [class.bg-blue-50]="order.status === 'Enviado'"
                              [class.text-blue-600]="order.status === 'Enviado'"
                            >
                              {{ order.status }}
                            </span>
                          </div>
                        </div>
                        <div class="flex items-center gap-4">
                          <button class="btn-primary py-4 text-sm">Ver Detalles</button>
                          <button class="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                            <mat-icon>receipt</mat-icon>
                          </button>
                        </div>
                      </div>

                      <div class="flex items-center gap-6 overflow-x-auto pb-4">
                        @for (product of store.products().slice(0, 2); track product.id) {
                          <div class="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 shadow-sm group-hover:shadow-xl transition-all duration-500">
                            <img [src]="product.images[0]" [alt]="product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                          </div>
                        }
                        <div class="text-xs font-bold text-slate-400 uppercase tracking-widest ml-4">+1 artículo adicional</div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            }

            @if (activeTab() === 'profile') {
              <div class="card-premium p-12">
                <h1 class="text-4xl font-bold tracking-tight text-primary mb-12">Perfil y <span class="text-accent italic">Seguridad</span></h1>
                
                <form class="space-y-12">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div class="space-y-3">
                      <label for="full-name" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Nombre Completo</label>
                      <input id="full-name" type="text" value="Juan Pérez" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                    </div>
                    <div class="space-y-3">
                      <label for="email-address" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Correo Electrónico</label>
                      <input id="email-address" type="email" value="juan.perez&#64;ejemplo.com" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                    </div>
                    <div class="space-y-3">
                      <label for="phone-number" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Teléfono</label>
                      <input id="phone-number" type="tel" value="+1 (234) 567-890" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                    </div>
                    <div class="space-y-3">
                      <label for="birth-date" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Fecha de Nacimiento</label>
                      <input id="birth-date" type="date" value="1990-01-01" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                    </div>
                  </div>

                  <div class="pt-12 border-t border-slate-100">
                    <h3 class="text-2xl font-bold text-primary mb-10">Cambiar Contraseña</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div class="space-y-3">
                        <label for="current-password" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Contraseña Actual</label>
                        <input id="current-password" type="password" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                      </div>
                      <div class="space-y-3">
                        <label for="new-password" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-2">Nueva Contraseña</label>
                        <input id="new-password" type="password" class="w-full bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all">
                      </div>
                    </div>
                  </div>

                  <div class="flex justify-end pt-10">
                    <button class="btn-primary px-12">Guardar Cambios</button>
                  </div>
                </form>
              </div>
            }

            @if (activeTab() === 'addresses') {
              <div class="space-y-12">
                <div class="flex justify-between items-center">
                  <h1 class="text-4xl font-bold tracking-tight text-primary">Mis <span class="text-accent italic">Direcciones</span></h1>
                  <button class="btn-primary py-4 text-sm">
                    <mat-icon class="text-sm">add</mat-icon>
                    Añadir Nueva
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div class="card-premium p-10 border-2 border-accent relative">
                    <div class="absolute top-6 right-6 bg-accent text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-accent/20">Principal</div>
                    <h3 class="text-2xl font-bold text-primary mb-6">Casa</h3>
                    <p class="text-slate-500 leading-relaxed mb-10 font-medium">
                      Calle Principal 123, Apto 4B<br/>
                      Ciudad Moderna, CP 54321<br/>
                      País Ejemplo
                    </p>
                    <div class="flex items-center gap-6 pt-6 border-t border-slate-100">
                      <button class="text-primary font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">Editar</button>
                      <button class="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors">Eliminar</button>
                    </div>
                  </div>

                  <div class="card-premium p-10">
                    <h3 class="text-2xl font-bold text-primary mb-6">Trabajo</h3>
                    <p class="text-slate-500 leading-relaxed mb-10 font-medium">
                      Avenida de los Negocios 456<br/>
                      Centro Empresarial, Oficina 202<br/>
                      Ciudad Moderna, CP 54321
                    </p>
                    <div class="flex items-center gap-6 pt-6 border-t border-slate-100">
                      <button class="text-primary font-bold text-xs uppercase tracking-widest hover:text-accent transition-colors">Editar</button>
                      <button class="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 transition-colors">Eliminar</button>
                    </div>
                  </div>
                </div>
              </div>
            }

            @if (activeTab() === 'roles') {
              <div class="card-premium p-12">
                <h1 class="text-4xl font-bold tracking-tight text-primary mb-6">Gestión de <span class="text-accent italic">Roles</span></h1>
                <p class="text-slate-500 mb-12 text-lg">Este panel permite simular el cambio de roles para probar las funcionalidades de administrador y cliente.</p>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button 
                    (click)="setRole('CUSTOMER')"
                    class="p-10 rounded-[2.5rem] border-2 transition-all text-left group"
                    [class.border-accent]="store.userRole() === 'CUSTOMER'"
                    [class.bg-accent/5]="store.userRole() === 'CUSTOMER'"
                    [class.border-slate-100]="store.userRole() !== 'CUSTOMER'"
                    [class.hover:border-slate-200]="store.userRole() !== 'CUSTOMER'"
                  >
                    <div class="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-slate-200/50" [class.text-accent]="store.userRole() === 'CUSTOMER'">
                      <mat-icon class="text-3xl">person</mat-icon>
                    </div>
                    <h3 class="text-2xl font-bold text-primary mb-2">Cliente</h3>
                    <p class="text-slate-500 text-sm font-medium">Acceso a compras, historial de pedidos y gestión de perfil personal.</p>
                  </button>

                  <button 
                    (click)="setRole('ADMIN')"
                    class="p-10 rounded-[2.5rem] border-2 transition-all text-left group"
                    [class.border-accent]="store.userRole() === 'ADMIN'"
                    [class.bg-accent/5]="store.userRole() === 'ADMIN'"
                    [class.border-slate-100]="store.userRole() !== 'ADMIN'"
                    [class.hover:border-slate-200]="store.userRole() !== 'ADMIN'"
                  >
                    <div class="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-slate-200/50" [class.text-accent]="store.userRole() === 'ADMIN'">
                      <mat-icon class="text-3xl">verified_user</mat-icon>
                    </div>
                    <h3 class="text-2xl font-bold text-primary mb-2">Administrador</h3>
                    <p class="text-slate-500 text-sm font-medium">Acceso total a gestión de inventario, pedidos de clientes y configuración del sistema.</p>
                  </button>
                </div>

                <div class="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <div class="flex items-start gap-4">
                    <mat-icon class="text-accent">info</mat-icon>
                    <div>
                      <h4 class="font-bold text-primary mb-2">Nota de Desarrollo</h4>
                      <p class="text-slate-500 text-sm leading-relaxed">En una aplicación real, los roles se asignan desde el servidor tras la autenticación. Esta interfaz es solo para fines demostrativos del diseño y la lógica de roles en el frontend.</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          </main>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Account {
  store = inject(StoreService);
  router = inject(Router);
  activeTab = signal('orders');

  setRole(role: 'ADMIN' | 'CUSTOMER') {
    this.store.userRole.set(role);
    if (role === 'ADMIN') {
      this.router.navigate(['/admin']);
    }
  }
}
