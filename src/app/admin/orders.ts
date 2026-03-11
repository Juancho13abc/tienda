import { Component, inject, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-orders',
  imports: [MatIconModule, CommonModule, FormsModule],
  template: `
    <div class="space-y-8 sm:space-y-12">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
        <div>
          <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Gestión de Ventas</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-primary">Todos los <span class="text-accent italic">Pedidos</span></h3>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div class="relative group flex-1 sm:flex-none">
            <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">search</mat-icon>
            <input 
              type="text" 
              placeholder="Buscar por ID o cliente..." 
              [(ngModel)]="searchQuery"
              class="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all w-full sm:w-80 shadow-sm"
            >
          </div>
          <button class="bg-white border border-slate-100 rounded-2xl px-6 py-4 flex items-center justify-center gap-3 text-primary font-bold shadow-sm hover:bg-slate-50 transition-all">
            <mat-icon>filter_list</mat-icon>
            Filtros
          </button>
        </div>
      </div>

      <!-- Orders Table -->
      <div class="card-premium p-6 sm:p-10">
        <div class="overflow-x-auto -mx-6 sm:mx-0">
          <table class="w-full text-left min-w-[800px] sm:min-w-0">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID Pedido</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              @for (order of filteredOrders(); track order.id) {
                <tr class="group hover:bg-slate-50 transition-colors">
                  <td class="px-6 sm:px-0 py-6 font-black text-primary text-sm">{{ order.id }}</td>
                  <td class="px-6 sm:px-0 py-6">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-primary text-accent rounded-xl flex items-center justify-center font-black text-xs">{{ order.customer.initials }}</div>
                      <div>
                        <h4 class="text-sm font-bold text-primary">{{ order.customer.name }}</h4>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{{ order.customer.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 sm:px-0 py-6 font-bold text-slate-600 text-sm">{{ order.date | date:'mediumDate' }}</td>
                  <td class="px-6 sm:px-0 py-6 font-black text-accent text-sm">{{ order.total | currency }}</td>
                  <td class="px-6 sm:px-0 py-6">
                    <div class="flex items-center gap-3">
                      <span 
                        class="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        [class.bg-emerald-50]="order.status === 'Entregado'"
                        [class.text-emerald-600]="order.status === 'Entregado'"
                        [class.bg-blue-50]="order.status === 'Enviado'"
                        [class.text-blue-600]="order.status === 'Enviado'"
                        [class.bg-amber-50]="order.status === 'Pendiente'"
                        [class.text-amber-600]="order.status === 'Pendiente'"
                      >
                        {{ order.status }}
                      </span>
                      <select 
                        [ngModel]="order.status"
                        (ngModelChange)="store.updateOrderStatus(order.id, $event)"
                        class="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 text-[10px] font-bold text-primary focus:outline-none cursor-pointer"
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="Enviado">Enviado</option>
                        <option value="Entregado">Entregado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    </div>
                  </td>
                  <td class="px-6 sm:px-0 py-6 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                        <mat-icon class="text-sm">visibility</mat-icon>
                      </button>
                      <button class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                        <mat-icon class="text-sm">print</mat-icon>
                      </button>
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class AdminOrders {
  store = inject(StoreService);
  searchQuery = signal('');

  filteredOrders = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.store.orders().filter(o => 
      o.id.toLowerCase().includes(query) || 
      'juan pérez'.includes(query) // Mock customer name search
    );
  });
}
