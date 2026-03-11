import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '../services/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-customers',
  imports: [MatIconModule, CommonModule],
  template: `
    <div class="space-y-8 sm:space-y-12">
      <div>
        <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Gestión de Usuarios</h2>
        <h3 class="text-3xl sm:text-4xl font-bold text-primary">Nuestros <span class="text-accent italic">Clientes</span></h3>
      </div>

      <div class="card-premium p-6 sm:p-10">
        <div class="overflow-x-auto -mx-6 sm:mx-0">
          <table class="w-full text-left min-w-[600px] sm:min-w-0">
            <thead>
              <tr class="border-b border-slate-100">
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cliente</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pedidos</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Gastado</th>
                <th class="px-6 sm:px-0 pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50">
              <tr class="group hover:bg-slate-50 transition-colors">
                <td class="px-6 sm:px-0 py-6">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-primary text-accent rounded-xl flex items-center justify-center font-black text-xs">JP</div>
                    <span class="font-bold text-primary">Juan Pérez</span>
                  </div>
                </td>
                <td class="px-6 sm:px-0 py-6 text-slate-500 text-sm">juan.perez&#64;ejemplo.com</td>
                <td class="px-6 sm:px-0 py-6 font-bold text-primary text-sm">2</td>
                <td class="px-6 sm:px-0 py-6 font-black text-accent text-sm">$215.89</td>
                <td class="px-6 sm:px-0 py-6 text-right">
                  <button class="w-10 h-10 bg-slate-100 text-slate-400 rounded-xl hover:bg-primary hover:text-white transition-all flex items-center justify-center ml-auto">
                    <mat-icon class="text-sm">visibility</mat-icon>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AdminCustomers {
  store = inject(StoreService);
}

@Component({
  selector: 'app-admin-analytics',
  imports: [MatIconModule, CommonModule],
  template: `
    <div class="space-y-8 sm:space-y-12">
      <div>
        <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Métricas de Rendimiento</h2>
        <h3 class="text-3xl sm:text-4xl font-bold text-primary">Análisis de <span class="text-accent italic">Datos</span></h3>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card-premium p-10">
          <h4 class="text-xl font-bold text-primary mb-8">Ventas por Categoría</h4>
          <div class="space-y-6">
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span class="text-slate-400">Ropa</span>
                <span class="text-primary">45%</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-accent w-[45%]"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span class="text-slate-400">Electrónica</span>
                <span class="text-primary">30%</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-600 w-[30%]"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs font-bold uppercase tracking-widest">
                <span class="text-slate-400">Calzado</span>
                <span class="text-primary">15%</span>
              </div>
              <div class="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-slate-800 w-[15%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-premium p-10 flex flex-col items-center justify-center text-center">
          <div class="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-6">
            <mat-icon class="text-4xl">trending_up</mat-icon>
          </div>
          <h4 class="text-2xl font-bold text-primary mb-2">Crecimiento Mensual</h4>
          <p class="text-slate-500 max-w-xs">Tus ventas han incrementado un 12% en comparación con el mes anterior.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class AdminAnalytics {}
