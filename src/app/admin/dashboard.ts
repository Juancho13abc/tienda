import { Component, inject, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  imports: [MatIconModule, CommonModule],
  template: `
    <div class="space-y-8 sm:space-y-12">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Resumen General</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-primary">Panel de <span class="text-accent italic">Control</span></h3>
        </div>
        <div class="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm w-full sm:w-auto">
          <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-3">Periodo:</span>
          <select class="flex-1 sm:flex-none bg-transparent font-bold text-sm text-primary focus:outline-none pr-8 cursor-pointer">
            <option>Últimos 30 días</option>
            <option>Últimos 7 días</option>
            <option>Este año</option>
          </select>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        <div class="card-premium p-6 sm:p-8 group hover:bg-primary transition-all duration-500">
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-white/10 group-hover:text-white transition-all">
              <mat-icon class="text-2xl sm:text-3xl">payments</mat-icon>
            </div>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+12.5%</span>
          </div>
          <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-white/60 transition-colors">Ventas Totales</h4>
          <p class="text-2xl sm:text-3xl font-black text-primary group-hover:text-white transition-colors">{{ totalSales() | currency }}</p>
        </div>

        <div class="card-premium p-6 sm:p-8 group hover:bg-primary transition-all duration-500">
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-white/10 group-hover:text-white transition-all">
              <mat-icon class="text-2xl sm:text-3xl">shopping_cart</mat-icon>
            </div>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+8.2%</span>
          </div>
          <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-white/60 transition-colors">Pedidos Nuevos</h4>
          <p class="text-2xl sm:text-3xl font-black text-primary group-hover:text-white transition-colors">{{ newOrdersCount() }}</p>
        </div>

        <div class="card-premium p-6 sm:p-8 group hover:bg-primary transition-all duration-500">
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-white/10 group-hover:text-white transition-all">
              <mat-icon class="text-2xl sm:text-3xl">people</mat-icon>
            </div>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+5.4%</span>
          </div>
          <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-white/60 transition-colors">Clientes Activos</h4>
          <p class="text-2xl sm:text-3xl font-black text-primary group-hover:text-white transition-colors">{{ activeCustomers() | number }}</p>
        </div>

        <div class="card-premium p-6 sm:p-8 group hover:bg-primary transition-all duration-500">
          <div class="flex justify-between items-start mb-4 sm:mb-6">
            <div class="w-12 h-12 sm:w-14 sm:h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent group-hover:bg-white/10 group-hover:text-white transition-all">
              <mat-icon class="text-2xl sm:text-3xl">trending_up</mat-icon>
            </div>
            <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">+2.1%</span>
          </div>
          <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 group-hover:text-white/60 transition-colors">Conversión</h4>
          <p class="text-2xl sm:text-3xl font-black text-primary group-hover:text-white transition-colors">{{ conversionRate() }}</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
        <!-- Recent Orders -->
        <div class="lg:col-span-2 card-premium p-6 sm:p-10">
          <div class="flex justify-between items-center mb-8 sm:mb-10">
            <h3 class="text-xl sm:text-2xl font-bold text-primary">Pedidos <span class="text-accent italic">Recientes</span></h3>
            <button class="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          <div class="overflow-x-auto -mx-6 sm:mx-0">
            <table class="w-full text-left min-w-[600px] sm:min-w-0">
              <thead>
                <tr class="border-b border-slate-100">
                  <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Pedido</th>
                  <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                  <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                  <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                  <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acción</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-50">
                @for (order of store.orders().slice(0, 5); track order.id) {
                  <tr class="group hover:bg-slate-50 transition-colors">
                    <td class="px-6 sm:px-0 py-6 font-black text-primary text-sm">{{ order.id }}</td>
                    <td class="px-6 sm:px-0 py-6">
                      <div class="flex items-center gap-3">
                        <div class="w-8 h-8 bg-primary text-accent rounded-lg flex items-center justify-center font-black text-[10px]">{{ order.customer.initials }}</div>
                        <span class="font-bold text-slate-600 text-sm">{{ order.customer.name }}</span>
                      </div>
                    </td>
                    <td class="px-6 sm:px-0 py-6 font-black text-accent text-sm">{{ order.total | currency }}</td>
                    <td class="px-6 sm:px-0 py-6">
                      <span 
                        class="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        [class.bg-emerald-50]="order.status === 'Entregado'"
                        [class.text-emerald-600]="order.status === 'Entregado'"
                        [class.bg-blue-50]="order.status === 'Enviado'"
                        [class.text-blue-600]="order.status === 'Enviado'"
                      >
                        {{ order.status }}
                      </span>
                    </td>
                    <td class="px-6 sm:px-0 py-6 text-right">
                      <button class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center ml-auto">
                        <mat-icon class="text-sm">visibility</mat-icon>
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- Top Products -->
        <div class="card-premium p-6 sm:p-10">
          <div class="flex justify-between items-center mb-8 sm:mb-10">
            <h3 class="text-xl sm:text-2xl font-bold text-primary">Más <span class="text-accent italic">Vendidos</span></h3>
            <button class="text-[10px] font-black text-accent uppercase tracking-widest hover:underline">Ver todos</button>
          </div>
          <div class="space-y-6 sm:space-y-8">
            @for (product of store.products().slice(0, 4); track product.id) {
              <div class="flex items-center gap-4 group">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <img [src]="product.images[0]" [alt]="product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                </div>
                <div class="flex-1 min-w-0 pr-2">
                  <h4 class="text-sm font-bold text-primary truncate group-hover:text-accent transition-colors">{{ product.name }}</h4>
                  <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest truncate">{{ product.category }}</p>
                </div>
                <div class="text-right flex-shrink-0">
                  <p class="text-sm font-black text-primary">{{ product.price | currency }}</p>
                  <p class="text-[9px] font-black text-emerald-500 uppercase tracking-widest">{{ getRandomSales() }} vendidos</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminDashboard {
  store = inject(StoreService);

  totalSales = computed(() => {
    return this.store.orders().reduce((acc, o) => acc + o.total, 0) + 45000; // Base + mock
  });

  newOrdersCount = computed(() => {
    return this.store.orders().filter(o => o.status === 'Pendiente').length + 154;
  });

  activeCustomers = computed(() => 1240); // Mock constant for now
  conversionRate = computed(() => '3.45%'); // Mock constant for now

  getRandomSales() {
    return Math.floor(Math.random() * 100) + 50;
  }
}
