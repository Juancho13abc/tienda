import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService, Product } from './services/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterLink, MatIconModule, CommonModule],
  template: `
    <main class="min-h-screen bg-surface">
      <!-- Hero Banner -->
      <section class="relative h-[85vh] sm:h-[95vh] flex items-center overflow-hidden">
        <div class="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Banner" 
            class="w-full h-full object-cover brightness-[0.45] scale-105 animate-slow-zoom"
            referrerpolicy="no-referrer"
          />
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div class="max-w-4xl space-y-8 sm:space-y-12">
            <div class="inline-flex items-center gap-3 px-4 sm:px-5 pt-[10px] pb-2 sm:pb-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-xl text-accent text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] animate-fade-in">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              Colección Primavera 2024
            </div>
            <h1 class="text-6xl sm:text-8xl md:text-[10rem] font-black tracking-tighter leading-[0.85] sm:leading-[0.8] animate-fade-in [animation-delay:200ms] drop-shadow-2xl">
              REDEFINE <br/> <span class="text-accent italic">TU ESENCIA</span>
            </h1>
            <p class="text-lg sm:text-2xl text-slate-200 leading-relaxed max-w-2xl animate-fade-in [animation-delay:400ms] font-medium">
              Curaduría exclusiva de piezas que fusionan el minimalismo contemporáneo con la artesanía de lujo. Diseñado para quienes no temen destacar.
            </p>
            <div class="flex flex-col sm:flex-row gap-5 sm:gap-8 pt-6 sm:pt-10 animate-fade-in [animation-delay:600ms]">
              <a routerLink="/catalogo" class="group bg-accent text-primary px-10 sm:px-12 py-5 sm:py-6 rounded-2xl font-black hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-accent/30 text-base sm:text-lg">
                Comprar Ahora
                <mat-icon class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">north_east</mat-icon>
              </a>
              <a routerLink="/sobre-nosotros" class="bg-white/5 backdrop-blur-2xl border border-white/10 text-white px-10 sm:px-12 py-5 sm:py-6 rounded-2xl font-black hover:bg-white/10 transition-all text-center text-base sm:text-lg">
                Nuestra Visión
              </a>
            </div>
          </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-4 text-white/30">
          <span class="text-[10px] font-bold uppercase tracking-[0.3em] rotate-90 mb-8">Scroll</span>
          <div class="w-px h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
        </div>
      </section>

      <!-- Categories -->
      <section class="py-16 sm:py-32 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 sm:gap-8 mb-12 sm:mb-20">
            <div class="max-w-xl">
              <h2 class="text-3xl sm:text-5xl font-bold tracking-tight mb-4 sm:mb-6">Curaduría por Categoría</h2>
              <p class="text-slate-500 text-base sm:text-lg leading-relaxed">Seleccionamos cuidadosamente cada pieza para asegurar que encuentres exactamente lo que necesitas para elevar tu estilo personal.</p>
            </div>
            <a routerLink="/catalogo" class="group flex items-center gap-3 text-primary font-bold text-xs sm:text-sm uppercase tracking-widest hover:text-accent transition-colors">
              Ver todas las categorías
              <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all">
                <mat-icon class="text-xs sm:text-sm">arrow_forward</mat-icon>
              </div>
            </a>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            @for (cat of categories; track cat.name) {
              <a [routerLink]="['/catalogo']" [queryParams]="{category: cat.name}" class="group relative h-[350px] sm:h-[500px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 transition-all">
                <img [src]="cat.image" [alt]="cat.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90 group-hover:brightness-50" referrerpolicy="no-referrer">
                <div class="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 text-white bg-gradient-to-t from-black/80 via-transparent to-transparent">
                  <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">Explorar</span>
                  <h3 class="text-2xl sm:text-3xl font-bold mb-2">{{ cat.name }}</h3>
                </div>
              </a>
            }
          </div>
        </div>
      </section>

      <!-- Featured Products -->
      <section class="py-16 sm:py-32 bg-surface">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-20">
            <h2 class="text-3xl sm:text-5xl font-bold tracking-tight mb-4 sm:mb-6">Piezas Destacadas</h2>
            <p class="text-slate-500 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">Una selección de nuestros artículos más codiciados, elegidos por su diseño excepcional y artesanía superior.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            @for (product of store.products().slice(0, 3); track product.id) {
              <div class="card-premium group">
                <div class="relative aspect-[4/5] overflow-hidden m-3 sm:m-4 rounded-[1.5rem] sm:rounded-[2rem]">
                  <img [src]="product.images[0]" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                  
                  @if (product.isNew) {
                    <div class="absolute top-4 sm:top-6 right-4 sm:right-6 bg-accent text-primary text-[9px] sm:text-[10px] font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest shadow-xl z-20">
                      Nuevo
                    </div>
                  }

                  <!-- Quick Add -->
                  <div class="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                    <button (click)="addToCart(product)" class="bg-white text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-all transform translate-y-8 group-hover:translate-y-0 duration-500 text-sm sm:text-base">
                      <mat-icon>add_shopping_cart</mat-icon>
                      Añadir al Carrito
                    </button>
                  </div>

                  @if (product.stock < 20) {
                    <div class="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/90 backdrop-blur-md text-primary text-[9px] sm:text-[10px] font-bold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full uppercase tracking-widest shadow-xl">
                      Últimas unidades
                    </div>
                  }
                </div>
                <div class="p-6 sm:p-10 pt-2 sm:pt-4">
                  <div class="flex justify-between items-center mb-3 sm:mb-4">
                    <span class="text-[9px] sm:text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{{ product.category }}</span>
                    <span class="text-lg sm:text-xl font-bold text-primary">{{ product.price | currency:'USD' }}</span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6 group-hover:text-accent transition-colors">
                    <a [routerLink]="['/producto', product.id]">{{ product.name }}</a>
                  </h3>
                  <div class="flex items-center justify-between pt-4 sm:pt-6 border-t border-slate-100">
                    <div class="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 font-medium">
                      <mat-icon class="text-sm text-accent">verified</mat-icon>
                      <span>Calidad Premium</span>
                    </div>
                    <a [routerLink]="['/producto', product.id]" class="text-primary hover:text-accent transition-colors">
                      <mat-icon>arrow_right_alt</mat-icon>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- Newsletter -->
      <section class="py-16 sm:py-32 bg-primary relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/2"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="max-w-4xl mx-auto text-center space-y-8 sm:space-y-12">
            <h2 class="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">Únete al Círculo <span class="text-accent italic">Moderna</span></h2>
            <p class="text-slate-400 text-base sm:text-xl leading-relaxed">Acceso prioritario a lanzamientos exclusivos, eventos privados y curaduría de estilo personalizada.</p>
            <form class="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input type="email" placeholder="Tu correo electrónico" class="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-white focus:outline-none focus:ring-2 focus:ring-accent/50 placeholder:text-slate-500 backdrop-blur-md text-sm sm:text-base">
              <button class="bg-accent text-primary px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold hover:bg-white transition-all shadow-2xl shadow-accent/20 text-sm sm:text-base">Suscribirse</button>
            </form>
            <p class="text-slate-500 text-[10px] uppercase tracking-[0.2em]">Privacidad garantizada. Sin spam.</p>
          </div>
        </div>
      </section>
    </main>
  `,
  styles: [`
    :host { display: block; }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slow-zoom {
      from { transform: scale(1.05); }
      to { transform: scale(1.15); }
    }
    .animate-fade-in {
      animation: fade-in 1s ease-out forwards;
    }
    .animate-slow-zoom {
      animation: slow-zoom 20s ease-in-out infinite alternate;
    }
  `]
})
export class Home {
  store = inject(StoreService);

  categories = [
    { name: 'Ropa', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Calzado', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800' },
    { name: 'Electrónica', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800' },
    { name: 'Accesorios', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800' }
  ];

  addToCart(product: Product) {
    this.store.addToCart(product);
  }
}
