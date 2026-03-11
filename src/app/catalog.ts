import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { StoreService, Product } from './services/store';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink, MatIconModule, CommonModule, FormsModule],
  template: `
    <div class="bg-surface min-h-screen py-10 sm:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10 sm:mb-16">
          <div>
            <h1 class="text-3xl sm:text-5xl font-bold tracking-tight text-primary mb-3">Catálogo <span class="text-accent italic">Exclusivo</span></h1>
            <p class="text-slate-500 font-medium text-sm sm:text-base">Mostrando {{ filteredProducts().length }} piezas curadas</p>
          </div>
          
          <div class="flex items-center gap-4 w-full md:w-auto">
            <div class="relative flex-1 md:flex-none group">
              <select 
                [(ngModel)]="sortBy" 
                class="w-full bg-white border border-slate-200 rounded-2xl py-3 sm:py-4 px-4 sm:px-6 pr-10 sm:pr-12 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent appearance-none cursor-pointer font-bold text-xs sm:text-sm text-primary shadow-sm transition-all"
              >
                <option value="featured">Recomendados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="newest">Novedades</option>
              </select>
              <mat-icon class="absolute right-3 sm:right-4 top-3 sm:top-4 text-slate-400 pointer-events-none group-focus-within:text-accent transition-colors">expand_more</mat-icon>
            </div>
            <button 
              (click)="mobileFiltersOpen.set(true)"
              class="lg:hidden bg-white border border-slate-200 p-3 sm:p-4 rounded-2xl shadow-sm hover:bg-slate-50 transition-all"
            >
              <mat-icon>filter_list</mat-icon>
            </button>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row gap-16">
          <!-- Desktop Sidebar Filters -->
          <aside class="hidden lg:block w-72 space-y-12 flex-shrink-0">
            <ng-container *ngTemplateOutlet="filterContent"></ng-container>
          </aside>

          <!-- Mobile Filter Drawer Overlay -->
          @if (mobileFiltersOpen()) {
            <div 
              class="fixed inset-0 bg-primary/40 backdrop-blur-sm z-[60] lg:hidden"
              (click)="mobileFiltersOpen.set(false)"
              (keydown.enter)="mobileFiltersOpen.set(false)"
              tabindex="0"
              role="button"
              aria-label="Cerrar filtros"
            ></div>
          }

          <!-- Mobile Filter Drawer -->
          <aside 
            class="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[70] lg:hidden transform transition-transform duration-500 ease-in-out shadow-2xl p-8 overflow-y-auto"
            [class.translate-x-0]="mobileFiltersOpen()"
            [class.translate-x-full]="!mobileFiltersOpen()"
          >
            <div class="flex justify-between items-center mb-10">
              <h2 class="text-2xl font-bold text-primary">Filtros</h2>
              <button (click)="mobileFiltersOpen.set(false)" class="p-2 rounded-xl bg-slate-50 text-slate-400">
                <mat-icon>close</mat-icon>
              </button>
            </div>
            <ng-container *ngTemplateOutlet="filterContent"></ng-container>
            <div class="mt-12">
              <button (click)="mobileFiltersOpen.set(false)" class="btn-primary w-full py-5">Aplicar Filtros</button>
            </div>
          </aside>

          <!-- Filter Content Template -->
          <ng-template #filterContent>
            <div class="space-y-12">
              <!-- Search -->
              <div class="space-y-6">
                <h3 class="font-bold text-primary uppercase tracking-[0.2em] text-[10px]">Búsqueda</h3>
                <div class="relative group">
                  <input 
                    type="text" 
                    [(ngModel)]="searchQuery"
                    placeholder="Nombre o SKU..." 
                    class="w-full bg-white border border-slate-200 rounded-2xl py-4 px-6 pl-12 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent shadow-sm transition-all text-sm font-medium"
                  />
                  <mat-icon class="absolute left-4 top-4 text-slate-400 text-sm group-focus-within:text-accent transition-colors">search</mat-icon>
                </div>
              </div>

              <!-- Categories -->
              <div class="space-y-6">
                <h3 class="font-bold text-primary uppercase tracking-[0.2em] text-[10px]">Categorías</h3>
                <div class="space-y-3">
                  @for (cat of categories; track cat) {
                    <label class="flex items-center gap-4 cursor-pointer group">
                      <div class="relative flex items-center">
                        <input 
                          type="checkbox" 
                          [checked]="selectedCategories().includes(cat)"
                          (change)="toggleCategory(cat)"
                          class="peer w-6 h-6 rounded-lg border-slate-200 text-accent focus:ring-accent/20 transition-all cursor-pointer appearance-none border-2 checked:bg-accent checked:border-accent"
                        />
                        <mat-icon class="absolute inset-0 text-white text-[16px] flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">check</mat-icon>
                      </div>
                      <span class="text-slate-600 font-medium group-hover:text-primary transition-colors">{{ cat }}</span>
                    </label>
                  }
                </div>
              </div>

              <!-- Price Range -->
              <div class="space-y-6">
                <h3 class="font-bold text-primary uppercase tracking-[0.2em] text-[10px]">Rango de Precio</h3>
                <div class="space-y-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    [(ngModel)]="maxPrice"
                    class="w-full accent-accent h-1.5 bg-slate-200 rounded-full cursor-pointer"
                  />
                  <div class="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <span class="text-xs font-bold text-slate-400">$0</span>
                    <span class="text-sm font-black text-primary">{{ maxPrice() | currency }}</span>
                  </div>
                </div>
              </div>

              <!-- Brands -->
              <div class="space-y-6">
                <h3 class="font-bold text-primary uppercase tracking-[0.2em] text-[10px]">Marcas</h3>
                <div class="space-y-3">
                  @for (brand of brands; track brand) {
                    <label class="flex items-center gap-4 cursor-pointer group">
                      <div class="relative flex items-center">
                        <input 
                          type="checkbox" 
                          [checked]="selectedBrands().includes(brand)"
                          (change)="toggleBrand(brand)"
                          class="peer w-6 h-6 rounded-lg border-slate-200 text-accent focus:ring-accent/20 transition-all cursor-pointer appearance-none border-2 checked:bg-accent checked:border-accent"
                        />
                        <mat-icon class="absolute inset-0 text-white text-[16px] flex items-center justify-center opacity-0 peer-checked:opacity-100 pointer-events-none">check</mat-icon>
                      </div>
                      <span class="text-slate-600 font-medium group-hover:text-primary transition-colors">{{ brand }}</span>
                    </label>
                  }
                </div>
              </div>

              <button (click)="resetFilters()" class="w-full bg-slate-100 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm">
                <mat-icon class="text-sm">refresh</mat-icon>
                Limpiar Filtros
              </button>
            </div>
          </ng-template>

          <!-- Product Grid -->
          <div class="flex-1">
            @if (filteredProducts().length === 0) {
              <div class="bg-white rounded-[2.5rem] p-10 sm:p-24 text-center border border-dashed border-slate-200 shadow-sm">
                <div class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                  <mat-icon class="text-3xl sm:text-4xl text-slate-300">search_off</mat-icon>
                </div>
                <h3 class="text-xl sm:text-2xl font-bold text-primary mb-4">No se encontraron piezas</h3>
                <p class="text-slate-500 mb-10 max-w-xs mx-auto text-sm sm:text-base">Intenta ajustar tus criterios de búsqueda para encontrar lo que buscas.</p>
                <button (click)="resetFilters()" class="btn-primary mx-auto">Ver todo el catálogo</button>
              </div>
            } @else {
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
                @for (product of filteredProducts(); track product.id) {
                  <div class="card-premium group">
                    <div class="relative aspect-[4/5] overflow-hidden m-2 sm:m-3 rounded-[1.5rem] sm:rounded-[1.8rem]">
                      <img [src]="product.images[0]" [alt]="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerpolicy="no-referrer">
                      
                      @if (product.isNew) {
                        <div class="absolute top-4 left-4 bg-accent text-primary text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl">
                          Nuevo
                        </div>
                      }

                      <button (click)="addToCart(product)" class="absolute bottom-4 right-4 bg-white text-primary w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-2xl hover:bg-accent hover:text-white transition-all translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 lg:translate-y-16 lg:opacity-0">
                        <mat-icon class="text-sm sm:text-base">add_shopping_cart</mat-icon>
                      </button>
                      <!-- Mobile visible button -->
                      <button (click)="addToCart(product)" class="lg:hidden absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-primary w-10 h-10 rounded-xl flex items-center justify-center shadow-xl">
                        <mat-icon class="text-sm">add_shopping_cart</mat-icon>
                      </button>
                    </div>
                    <div class="p-5 sm:p-6 pt-2">
                      <div class="flex justify-between items-center mb-2 sm:mb-3">
                        <span class="text-[9px] sm:text-[10px] font-bold text-accent uppercase tracking-[0.2em]">{{ product.category }}</span>
                        <span class="text-base sm:text-lg font-bold text-primary">{{ product.price | currency }}</span>
                      </div>
                      <h3 class="text-base sm:text-lg font-bold text-primary mb-3 sm:mb-4 group-hover:text-accent transition-colors line-clamp-1">
                        <a [routerLink]="['/producto', product.id]">{{ product.name }}</a>
                      </h3>
                      <div class="flex items-center justify-between">
                        <p class="text-slate-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase">SKU: {{ product.sku }}</p>
                        <div class="flex items-center gap-0.5 text-yellow-400">
                          <mat-icon class="text-[12px] sm:text-[14px] w-3 sm:w-3.5 h-3 sm:h-3.5">star</mat-icon>
                          <span class="text-[9px] sm:text-[10px] font-black text-slate-400 ml-1">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                }
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
export class Catalog {
  store = inject(StoreService);
  route = inject(ActivatedRoute);

  searchQuery = signal('');
  selectedCategories = signal<string[]>([]);
  selectedBrands = signal<string[]>([]);
  maxPrice = signal(500);
  sortBy = signal('featured');
  mobileFiltersOpen = signal(false);

  categories = ['Ropa', 'Calzado', 'Electrónica', 'Accesorios'];
  brands = ['Moderna Essentials', 'Moderna Footwear', 'Moderna Tech', 'Moderna Gear'];

  constructor() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategories.set([params['category']]);
      }
      if (params['search']) {
        this.searchQuery.set(params['search']);
      }
    });
  }

  filteredProducts = computed(() => {
    let products = [...this.store.products()];

    // Search
    if (this.searchQuery()) {
      const query = this.searchQuery().toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.sku.toLowerCase().includes(query)
      );
    }

    // Categories
    if (this.selectedCategories().length > 0) {
      products = products.filter(p => this.selectedCategories().includes(p.category));
    }

    // Brands
    if (this.selectedBrands().length > 0) {
      products = products.filter(p => this.selectedBrands().includes(p.brand));
    }

    // Price
    products = products.filter(p => p.price <= this.maxPrice());

    // Sorting
    switch (this.sortBy()) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        products.sort((a, b) => b.id - a.id);
        break;
    }

    return products;
  });

  toggleCategory(cat: string) {
    const current = this.selectedCategories();
    if (current.includes(cat)) {
      this.selectedCategories.set(current.filter(c => c !== cat));
    } else {
      this.selectedCategories.set([...current, cat]);
    }
  }

  toggleBrand(brand: string) {
    const current = this.selectedBrands();
    if (current.includes(brand)) {
      this.selectedBrands.set(current.filter(b => b !== brand));
    } else {
      this.selectedBrands.set([...current, brand]);
    }
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategories.set([]);
    this.selectedBrands.set([]);
    this.maxPrice.set(500);
    this.sortBy.set('featured');
  }

  addToCart(product: Product) {
    this.store.addToCart(product);
  }
}
