import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, MatIconModule, CommonModule],
  template: `
    <footer class="bg-gray-950 text-white pt-16 pb-8 border-t border-white/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <!-- Brand & Socials -->
          <div class="lg:col-span-4 space-y-8 text-center lg:text-left">
            <div class="space-y-6">
              <a routerLink="/" class="inline-flex items-center gap-3 text-3xl font-black tracking-tighter text-white group">
                <div class="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <mat-icon class="text-white">shopping_bag</mat-icon>
                </div>
                <span>MODERNA</span>
              </a>
              <p class="text-gray-400 leading-relaxed max-w-sm mx-auto lg:mx-0 text-sm sm:text-base">
                Elevamos tu estilo con piezas exclusivas y calidad inigualable. Tu destino premium para la moda contemporánea.
              </p>
            </div>
            
            <div class="flex justify-center lg:justify-start gap-4">
              <a href="#" class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all duration-300 border border-white/5">
                <mat-icon class="text-xl">facebook</mat-icon>
              </a>
              <a href="#" class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all duration-300 border border-white/5">
                <mat-icon class="text-xl">camera_alt</mat-icon>
              </a>
              <a href="#" class="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:scale-110 transition-all duration-300 border border-white/5">
                <mat-icon class="text-xl">alternate_email</mat-icon>
              </a>
            </div>
          </div>

          <!-- Links Sections -->
          <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <!-- Navigation -->
            <div class="border-b border-white/5 md:border-0 pb-6 md:pb-0">
              <button 
                (click)="toggleSection('nav')"
                class="w-full flex items-center justify-between md:block text-left group"
              >
                <h3 class="text-sm font-black uppercase tracking-widest text-indigo-400 mb-0 md:mb-8">Explorar</h3>
                <mat-icon class="md:hidden transition-transform duration-300" [class.rotate-180]="sections().nav">expand_more</mat-icon>
              </button>
              <ul class="mt-6 md:mt-0 space-y-4 overflow-hidden transition-all duration-300" [class.max-h-0]="!sections().nav && isMobile()" [class.max-h-96]="sections().nav || !isMobile()">
                <li><a routerLink="/" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Inicio</a></li>
                <li><a routerLink="/catalogo" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Colecciones</a></li>
                <li><a routerLink="/sobre-nosotros" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Nuestra Historia</a></li>
                <li><a routerLink="/contacto" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Contacto</a></li>
              </ul>
            </div>

            <!-- Support -->
            <div class="border-b border-white/5 md:border-0 pb-6 md:pb-0">
              <button 
                (click)="toggleSection('support')"
                class="w-full flex items-center justify-between md:block text-left group"
              >
                <h3 class="text-sm font-black uppercase tracking-widest text-indigo-400 mb-0 md:mb-8">Ayuda</h3>
                <mat-icon class="md:hidden transition-transform duration-300" [class.rotate-180]="sections().support">expand_more</mat-icon>
              </button>
              <ul class="mt-6 md:mt-0 space-y-4 overflow-hidden transition-all duration-300" [class.max-h-0]="!sections().support && isMobile()" [class.max-h-96]="sections().support || !isMobile()">
                <li><a routerLink="/preguntas-frecuentes" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Centro de Ayuda</a></li>
                <li><a routerLink="/politicas-de-devolucion" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Devoluciones</a></li>
                <li><a routerLink="/terminos-y-condiciones" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Términos Legales</a></li>
                <li><a routerLink="/envios" class="text-gray-400 hover:text-white hover:translate-x-2 inline-block transition-all duration-300">Seguimiento</a></li>
              </ul>
            </div>

            <!-- Contact Info -->
            <div>
              <button 
                (click)="toggleSection('contact')"
                class="w-full flex items-center justify-between md:block text-left group"
              >
                <h3 class="text-sm font-black uppercase tracking-widest text-indigo-400 mb-0 md:mb-8">Ubicación</h3>
                <mat-icon class="md:hidden transition-transform duration-300" [class.rotate-180]="sections().contact">expand_more</mat-icon>
              </button>
              <ul class="mt-6 md:mt-0 space-y-6 overflow-hidden transition-all duration-300" [class.max-h-0]="!sections().contact && isMobile()" [class.max-h-96]="sections().contact || !isMobile()">
                <li class="flex items-start gap-4 group">
                  <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                    <mat-icon class="text-indigo-400">location_on</mat-icon>
                  </div>
                  <span class="text-gray-400 text-sm leading-relaxed">Calle de la Moda 77, Distrito Creativo, Ciudad Moderna</span>
                </li>
                <li class="flex items-center gap-4 group">
                  <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-600/20 transition-colors">
                    <mat-icon class="text-indigo-400">phone</mat-icon>
                  </div>
                  <span class="text-gray-400 text-sm">+57 (300) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-center md:text-left space-y-2">
            <p class="text-xs font-medium text-gray-500 uppercase tracking-widest">© 2024 Moderna Store. Crafted with passion.</p>
            <div class="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-bold text-gray-600 uppercase tracking-tighter">
              <a href="#" class="hover:text-white transition-colors">Privacidad</a>
              <span>•</span>
              <a href="#" class="hover:text-white transition-colors">Cookies</a>
              <span>•</span>
              <a href="#" class="hover:text-white transition-colors">Accesibilidad</a>
            </div>
          </div>
          
          <div class="flex items-center gap-8 px-6 py-3 bg-white/5 rounded-2xl border border-white/5">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" class="h-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerpolicy="no-referrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" class="h-6 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerpolicy="no-referrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" class="h-4 opacity-40 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" referrerpolicy="no-referrer">
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class Footer {
  private readonly platformId = inject(PLATFORM_ID);

  sections = signal({
    nav: false,
    support: false,
    contact: false
  });

  isMobile() {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return window.innerWidth < 768;
  }

  toggleSection(section: 'nav' | 'support' | 'contact') {
    if (!this.isMobile()) return;
    
    this.sections.update(s => ({
      ...s,
      [section]: !s[section as keyof typeof s]
    }));
  }
}
