import { Component, inject, signal, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  imports: [MatIconModule, CommonModule, FormsModule],
  template: `
    <div class="space-y-8 sm:space-y-12">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8">
        <div>
          <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Gestión de Inventario</h2>
          <h3 class="text-3xl sm:text-4xl font-bold text-primary">Todos los <span class="text-accent italic">Productos</span></h3>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto">
          <div class="relative group flex-1 sm:flex-none">
            <mat-icon class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-accent transition-colors">search</mat-icon>
            <input 
              type="text" 
              placeholder="Buscar por nombre o ID..." 
              [(ngModel)]="searchQuery"
              class="bg-white border border-slate-100 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent font-medium text-primary transition-all w-full sm:w-80 shadow-sm"
            >
          </div>
          <button 
            (click)="store.showToast('Funcionalidad de creación próximamente', 'info')"
            class="btn-primary py-4 px-8 flex items-center justify-center gap-3"
          >
            <mat-icon>add</mat-icon>
            Nuevo Producto
          </button>
        </div>
      </div>

      <!-- Products Table -->
      <div class="card-premium p-6 sm:p-10">
        <div class="overflow-x-auto -mx-6 sm:mx-0">
          <table class="w-full text-left min-w-[800px] sm:min-w-0">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Producto</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categoría</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Precio</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Estado</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              @for (product of filteredProducts(); track product.id) {
                <tr class="group hover:bg-slate-50 transition-colors">
                  <td class="px-6 sm:px-0 py-6">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 flex-shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <img [src]="product.images[0]" [alt]="product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                      </div>
                      <div class="flex-1 min-w-0">
                        <h4 class="text-sm font-bold text-primary truncate group-hover:text-accent transition-colors">{{ product.name }}</h4>
                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: #{{ product.id }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 sm:px-0 py-6">
                    <span class="bg-slate-100 text-slate-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">{{ product.category }}</span>
                  </td>
                  <td class="px-6 sm:px-0 py-6 font-black text-primary text-sm">{{ product.price | currency }}</td>
                  <td class="px-6 sm:px-0 py-6">
                    <div class="flex items-center gap-2">
                      <span class="font-bold text-primary text-sm">{{ product.stock }}</span>
                      @if (product.stock < 20) {
                        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      }
                    </div>
                  </td>
                  <td class="px-6 sm:px-0 py-6">
                    <span 
                      class="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest"
                      [class.bg-emerald-50]="product.stock > 0"
                      [class.text-emerald-600]="product.stock > 0"
                      [class.bg-red-50]="product.stock === 0"
                      [class.text-red-600]="product.stock === 0"
                    >
                      {{ product.stock > 0 ? 'Activo' : 'Agotado' }}
                    </span>
                  </td>
                  <td class="px-6 sm:px-0 py-6 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center">
                        <mat-icon class="text-sm">edit</mat-icon>
                      </button>
                      <button 
                        (click)="store.deleteProduct(product.id)"
                        class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all flex items-center justify-center"
                      >
                        <mat-icon class="text-sm">delete</mat-icon>
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
export class AdminProducts {
  store = inject(StoreService);
  searchQuery = signal('');

  filteredProducts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.store.products().filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.id.toString().includes(query)
    );
  });
}
