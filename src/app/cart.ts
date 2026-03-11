import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from './services/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, MatIconModule, CommonModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-12">Tu Carrito de Compras</h1>

        @if (store.cart().length === 0) {
          <div class="bg-white rounded-3xl p-20 text-center shadow-sm border border-gray-100">
            <div class="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mx-auto mb-8">
              <mat-icon class="text-4xl">shopping_cart</mat-icon>
            </div>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h2>
            <p class="text-gray-500 mb-10 max-w-md mx-auto">Parece que aún no has añadido nada. ¡Explora nuestro catálogo y encuentra algo increíble!</p>
            <a routerLink="/catalogo" class="inline-flex items-center gap-2 bg-indigo-600 text-white px-10 py-4 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
              Ir al Catálogo
              <mat-icon>arrow_forward</mat-icon>
            </a>
          </div>
        } @else {
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <!-- Items List -->
            <div class="lg:col-span-2 space-y-6">
              @for (item of store.cart(); track $index) {
                <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-8 group">
                  <div class="w-full sm:w-40 aspect-square rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img [src]="item.product.images[0]" [alt]="item.product.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerpolicy="no-referrer">
                  </div>
                  
                  <div class="flex-1 flex flex-col justify-between py-2">
                    <div class="flex justify-between items-start">
                      <div>
                        <h3 class="text-xl font-bold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                          <a [routerLink]="['/producto', item.product.id]">{{ item.product.name }}</a>
                        </h3>
                        <p class="text-sm text-gray-400 mb-4">SKU: {{ item.product.sku }}</p>
                        <div class="flex flex-wrap gap-4 text-sm">
                          @if (item.selectedSize) {
                            <span class="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-600">Talla: {{ item.selectedSize }}</span>
                          }
                          @if (item.selectedColor) {
                            <span class="bg-gray-100 px-3 py-1 rounded-full font-medium text-gray-600">Color: {{ item.selectedColor }}</span>
                          }
                        </div>
                      </div>
                      <button (click)="store.removeFromCart($index)" class="text-gray-300 hover:text-red-500 transition-colors">
                        <mat-icon>delete_outline</mat-icon>
                      </button>
                    </div>

                    <div class="flex justify-between items-end mt-8">
                      <div class="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                        <button (click)="store.updateQuantity($index, item.quantity - 1)" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-500">
                          <mat-icon class="text-sm">remove</mat-icon>
                        </button>
                        <span class="w-10 text-center font-bold text-gray-900">{{ item.quantity }}</span>
                        <button (click)="store.updateQuantity($index, item.quantity + 1)" class="w-8 h-8 flex items-center justify-center hover:bg-white rounded-lg transition-all text-gray-500">
                          <mat-icon class="text-sm">add</mat-icon>
                        </button>
                      </div>
                      <p class="text-xl font-bold text-indigo-600">{{ item.product.price * item.quantity | currency }}</p>
                    </div>
                  </div>
                </div>
              }

              <div class="flex justify-between items-center pt-6">
                <a routerLink="/catalogo" class="text-indigo-600 font-bold flex items-center gap-2 hover:underline">
                  <mat-icon>arrow_back</mat-icon>
                  Seguir Comprando
                </a>
                <button (click)="store.clearCart()" class="text-gray-400 hover:text-gray-600 text-sm font-medium">Vaciar Carrito</button>
              </div>
            </div>

            <!-- Summary -->
            <div class="lg:col-span-1">
              <div class="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-24">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Resumen de Compra</h2>
                
                <div class="space-y-4 mb-8">
                  <div class="flex justify-between text-gray-500">
                    <span>Subtotal ({{ store.cartCount() }} productos)</span>
                    <span>{{ store.cartTotal() | currency }}</span>
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <span>Envío</span>
                    <span class="text-emerald-500 font-medium">Gratis</span>
                  </div>
                  <div class="flex justify-between text-gray-500">
                    <span>Impuestos (estimado)</span>
                    <span>{{ store.cartTotal() * 0.15 | currency }}</span>
                  </div>
                  <div class="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span class="text-lg font-bold text-gray-900">Total</span>
                    <span class="text-3xl font-bold text-indigo-600">{{ store.cartTotal() * 1.15 | currency }}</span>
                  </div>
                </div>

                <div class="space-y-4">
                  <button class="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-3">
                    Finalizar Pedido
                    <mat-icon>lock</mat-icon>
                  </button>
                  <p class="text-center text-xs text-gray-400">Pago seguro procesado por Moderna Pay. Aceptamos todas las tarjetas.</p>
                </div>

                <!-- Promo Code -->
                <div class="mt-10 pt-10 border-t border-gray-100">
                  <p class="text-sm font-bold text-gray-900 mb-4">¿Tienes un código de descuento?</p>
                  <div class="flex gap-2">
                    <input type="text" placeholder="Código" class="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                    <button class="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all">Aplicar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Cart {
  store = inject(StoreService);
}
