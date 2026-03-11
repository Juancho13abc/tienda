import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService, Product } from './services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, MatIconModule, CommonModule, FormsModule],
  template: `
    @if (product()) {
      <div class="bg-surface min-h-screen py-10 sm:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Breadcrumbs -->
          <nav class="flex text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 sm:mb-12 items-center gap-2 sm:gap-3 overflow-x-auto whitespace-nowrap pb-2 sm:pb-0">
            <a routerLink="/" class="hover:text-primary transition-colors">Inicio</a>
            <mat-icon class="text-[12px] sm:text-[14px] w-3 sm:w-3.5 h-3 sm:h-3.5">chevron_right</mat-icon>
            <a routerLink="/catalogo" class="hover:text-primary transition-colors">Catálogo</a>
            <mat-icon class="text-[12px] sm:text-[14px] w-3 sm:w-3.5 h-3 sm:h-3.5">chevron_right</mat-icon>
            <span class="text-primary">{{ product()?.name }}</span>
          </nav>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-20">
            <!-- Gallery -->
            <div class="space-y-6 sm:space-y-8">
              <div class="aspect-[4/5] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-white border border-slate-100 shadow-2xl shadow-slate-200/50">
                <img [src]="selectedImage()" [alt]="product()?.name || 'Imagen del producto'" class="w-full h-full object-cover" referrerpolicy="no-referrer">
              </div>
              <div class="grid grid-cols-4 gap-4 sm:gap-6">
                @for (img of product()?.images; track img) {
                  <button 
                    (click)="selectedImage.set(img)"
                    class="aspect-square rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all shadow-sm"
                    [class.border-accent]="selectedImage() === img"
                    [class.border-transparent]="selectedImage() !== img"
                    [class.scale-95]="selectedImage() === img"
                  >
                    <img [src]="img" alt="Miniatura del producto" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                  </button>
                }
              </div>
            </div>

            <!-- Info -->
            <div class="space-y-8 sm:space-y-12">
              <div>
                <div class="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div class="flex items-center gap-3">
                    <span class="bg-accent/10 text-accent text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{{ product()?.category }}</span>
                    @if (product()?.isNew) {
                      <span class="bg-primary text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">Nuevo</span>
                    }
                  </div>
                  <div class="flex items-center gap-1.5 text-yellow-400">
                    <mat-icon class="text-[16px] sm:text-[18px]">star</mat-icon>
                    <span class="text-primary font-black text-sm ml-1">4.8</span>
                    <span class="text-slate-400 text-xs font-bold ml-2">(124 reseñas)</span>
                  </div>
                </div>
                <p class="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2">{{ product()?.brand }}</p>
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-primary mb-4 sm:mb-6 leading-[1.1]">{{ product()?.name }}</h1>
                <p class="text-3xl sm:text-4xl font-black text-accent">{{ product()?.price | currency }}</p>
              </div>

              <p class="text-slate-500 leading-relaxed text-lg sm:text-xl font-medium">{{ product()?.description }}</p>

              <!-- Variants -->
              <div class="space-y-8 sm:space-y-10 py-8 sm:py-10 border-y border-slate-100">
                @if (product()?.variants?.size) {
                  <div class="space-y-4 sm:space-y-6">
                    <div class="flex justify-between items-center">
                      <h3 class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Seleccionar Talla</h3>
                      <button class="text-[10px] text-accent font-black uppercase tracking-widest hover:underline">Guía de tallas</button>
                    </div>
                    <div class="flex flex-wrap gap-3 sm:gap-4">
                      @for (size of product()?.variants?.size; track size) {
                        <button 
                          (click)="selectedSize.set(size)"
                          class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center font-black transition-all text-xs sm:text-sm"
                          [class.border-accent]="selectedSize() === size"
                          [class.bg-accent/5]="selectedSize() === size"
                          [class.text-accent]="selectedSize() === size"
                          [class.border-slate-100]="selectedSize() !== size"
                          [class.text-slate-400]="selectedSize() !== size"
                        >
                          {{ size }}
                        </button>
                      }
                    </div>
                  </div>
                }

                @if (product()?.variants?.color) {
                  <div class="space-y-4 sm:space-y-6">
                    <h3 class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Seleccionar Color</h3>
                    <div class="flex flex-wrap gap-3 sm:gap-4">
                      @for (color of product()?.variants?.color; track color) {
                        <button 
                          (click)="selectedColor.set(color)"
                          class="px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 font-black transition-all text-xs sm:text-sm uppercase tracking-widest"
                          [class.border-accent]="selectedColor() === color"
                          [class.bg-accent/5]="selectedColor() === color"
                          [class.text-accent]="selectedColor() === color"
                          [class.border-slate-100]="selectedColor() !== color"
                          [class.text-slate-400]="selectedColor() !== color"
                        >
                          {{ color }}
                        </button>
                      }
                    </div>
                  </div>
                }

                <!-- Quantity -->
                <div class="space-y-4 sm:space-y-6">
                  <h3 class="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Cantidad</h3>
                  <div class="flex items-center gap-4 sm:gap-6">
                    <div class="flex items-center bg-slate-100 rounded-2xl p-1 sm:p-1.5">
                      <button (click)="quantity.set(Math.max(1, quantity() - 1))" class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all text-primary">
                        <mat-icon>remove</mat-icon>
                      </button>
                      <span class="w-12 sm:w-16 text-center font-black text-primary text-base sm:text-lg">{{ quantity() }}</span>
                      <button (click)="quantity.set(quantity() + 1)" class="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:bg-white rounded-xl transition-all text-primary">
                        <mat-icon>add</mat-icon>
                      </button>
                    </div>
                    <span class="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{{ product()?.stock }} disponibles</span>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button 
                  (click)="addToCart()"
                  class="flex-1 btn-primary py-5 sm:py-6 text-base sm:text-lg flex items-center justify-center gap-4"
                >
                  <mat-icon>shopping_cart</mat-icon>
                  Añadir al Carrito
                </button>
                <button class="w-full sm:w-20 h-16 sm:h-20 rounded-2xl sm:rounded-3xl border-2 border-slate-100 flex items-center justify-center text-slate-300 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm">
                  <mat-icon class="text-2xl sm:text-3xl">favorite_border</mat-icon>
                </button>
              </div>

              <!-- Extra Info -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 pt-6 sm:pt-10">
                <div class="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-50 shadow-sm">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/5 flex items-center justify-center text-accent">
                    <mat-icon>local_shipping</mat-icon>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-black text-primary uppercase tracking-widest">Envío Express</p>
                    <p class="text-[10px] sm:text-xs text-slate-400 font-medium">Gratis en pedidos +$100</p>
                  </div>
                </div>
                <div class="flex items-center gap-4 sm:gap-5 p-5 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-slate-50 shadow-sm">
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-accent/5 flex items-center justify-center text-accent">
                    <mat-icon>verified</mat-icon>
                  </div>
                  <div>
                    <p class="text-xs sm:text-sm font-black text-primary uppercase tracking-widest">Garantía Total</p>
                    <p class="text-[10px] sm:text-xs text-slate-400 font-medium">30 días de devolución</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Products -->
          <section class="mt-24 sm:mt-40">
            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12 sm:mb-16">
              <div>
                <h2 class="text-[9px] sm:text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-2 sm:mb-4">Sugerencias</h2>
                <h3 class="text-3xl sm:text-4xl font-bold text-primary">Productos <span class="text-accent italic">Relacionados</span></h3>
              </div>
              <a routerLink="/catalogo" class="text-xs sm:text-sm font-black text-primary uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2">
                Ver todo
                <mat-icon class="text-sm">arrow_forward</mat-icon>
              </a>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
              @for (rel of relatedProducts(); track rel.id) {
                <div class="card-premium group">
                  <div class="relative aspect-[4/5] overflow-hidden m-2 sm:m-3 rounded-[1.5rem] sm:rounded-[1.8rem]">
                    <img [src]="rel.images[0]" [alt]="rel.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                  </div>
                  <div class="p-5 sm:p-6 pt-2">
                    <h3 class="text-base sm:text-lg font-bold text-primary mb-2 sm:mb-3 group-hover:text-accent transition-colors line-clamp-1">
                      <a [routerLink]="['/producto', rel.id]">{{ rel.name }}</a>
                    </h3>
                    <p class="text-lg sm:text-xl font-black text-accent">{{ rel.price | currency }}</p>
                  </div>
                </div>
              }
            </div>
          </section>
        </div>
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center bg-surface">
        <div class="text-center">
          <div class="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-slate-200 mx-auto mb-8 shadow-2xl shadow-slate-200/50 animate-pulse">
            <mat-icon class="text-5xl">shopping_bag</mat-icon>
          </div>
          <p class="text-slate-400 font-black uppercase tracking-widest text-xs">Cargando experiencia...</p>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class ProductDetail {
  store = inject(StoreService);
  route = inject(ActivatedRoute);
  Math = Math;

  product = signal<Product | undefined>(undefined);
  selectedImage = signal('');
  selectedSize = signal('');
  selectedColor = signal('');
  quantity = signal(1);

  constructor() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      const p = this.store.products().find(item => item.id === id);
      if (p) {
        this.product.set(p);
        this.selectedImage.set(p.images[0]);
        this.selectedSize.set(p.variants?.size?.[0] || '');
        this.selectedColor.set(p.variants?.color?.[0] || '');
        this.quantity.set(1);
      }
    });
  }

  relatedProducts = computed(() => {
    const p = this.product();
    if (!p) return [];
    return this.store.products()
      .filter(item => item.category === p.category && item.id !== p.id)
      .slice(0, 4);
  });

  addToCart() {
    const p = this.product();
    if (p) {
      this.store.addToCart(p, this.quantity(), this.selectedSize(), this.selectedColor());
    }
  }
}
