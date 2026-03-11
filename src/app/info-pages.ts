import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [MatIconModule],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero -->
      <section class="relative py-32 bg-gray-950 text-white overflow-hidden">
        <div class="absolute inset-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1920" alt="Sobre nosotros" class="w-full h-full object-cover scale-105" referrerpolicy="no-referrer">
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div class="inline-block px-4 py-1.5 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-md text-accent text-[10px] font-black uppercase tracking-[0.3em] mb-8">Nuestra Visión</div>
          <h1 class="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-none">Nuestra <span class="text-accent italic">Historia</span></h1>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
            Desde 2010, redefiniendo la forma en que el mundo compra en línea. Calidad, diseño y compromiso en cada entrega.
          </p>
        </div>
      </section>

      <!-- Content -->
      <section class="py-32">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div class="space-y-10">
              <div class="space-y-6">
                <h2 class="text-5xl font-black tracking-tight text-gray-900 leading-tight">Pasión por la <span class="text-indigo-600">Excelencia</span></h2>
                <p class="text-gray-500 leading-relaxed text-xl font-medium">
                  Moderna nació de una idea simple: hacer que los productos de alta calidad sean accesibles para todos, sin comprometer el estilo ni la ética de producción. Lo que comenzó como un pequeño taller local se ha convertido en una plataforma global que conecta a artesanos y diseñadores con clientes exigentes.
                </p>
                <p class="text-gray-500 leading-relaxed text-xl font-medium">
                  Creemos en la sostenibilidad y en el comercio justo. Cada producto en nuestro catálogo ha sido seleccionado cuidadosamente para asegurar que cumpla con nuestros estándares de durabilidad y diseño atemporal.
                </p>
              </div>
              <div class="grid grid-cols-2 gap-12 pt-10 border-t border-gray-100">
                <div>
                  <p class="text-5xl font-black text-indigo-600 mb-2 tracking-tighter">15k+</p>
                  <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Clientes Felices</p>
                </div>
                <div>
                  <p class="text-5xl font-black text-indigo-600 mb-2 tracking-tighter">12</p>
                  <p class="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Países</p>
                </div>
              </div>
            </div>
            <div class="relative group">
              <div class="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100/50">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800" alt="Nuestro equipo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" referrerpolicy="no-referrer">
              </div>
              <div class="absolute -bottom-8 -right-8 lg:-right-12 bg-indigo-600 text-white p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-600/30 max-w-md hidden md:block transform hover:-translate-y-2 transition-transform duration-500">
                <mat-icon class="text-5xl mb-6 opacity-50">format_quote</mat-icon>
                <p class="text-2xl font-bold italic mb-6 leading-snug">"El diseño no es solo cómo se ve, es cómo funciona."</p>
                <div class="flex items-center gap-4">
                  <div class="w-10 h-px bg-white/30"></div>
                  <p class="font-black uppercase tracking-[0.2em] text-[10px]">Fundador de Moderna</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class About {}

@Component({
  selector: 'app-contact',
  imports: [MatIconModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-20">
          <h1 class="text-5xl font-bold tracking-tight text-gray-900 mb-6">Contáctanos</h1>
          <p class="text-xl text-gray-500 max-w-2xl mx-auto">Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos lo antes posible.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Info -->
          <div class="space-y-8">
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <mat-icon>email</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Correo Electrónico</h3>
              <p class="text-gray-500">hola&#64;moderna.com</p>
              <p class="text-gray-500">soporte&#64;moderna.com</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <mat-icon>phone</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Teléfono</h3>
              <p class="text-gray-500">+1 (234) 567-890</p>
              <p class="text-gray-500">Lun - Vie, 9am - 6pm</p>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-6">
                <mat-icon>location_on</mat-icon>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Oficina Central</h3>
              <p class="text-gray-500">Calle Principal 123, Ciudad Moderna</p>
            </div>
          </div>

          <!-- Form -->
          <div class="lg:col-span-2 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
            <form class="space-y-8">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="space-y-2">
                  <label for="contact-name" class="text-sm font-bold text-gray-900 uppercase tracking-widest">Nombre</label>
                  <input id="contact-name" type="text" placeholder="Tu nombre" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                </div>
                <div class="space-y-2">
                  <label for="contact-email" class="text-sm font-bold text-gray-900 uppercase tracking-widest">Correo</label>
                  <input id="contact-email" type="email" placeholder="tu&#64;correo.com" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                </div>
              </div>
              <div class="space-y-2">
                <label for="contact-subject" class="text-sm font-bold text-gray-900 uppercase tracking-widest">Asunto</label>
                <input id="contact-subject" type="text" placeholder="¿En qué podemos ayudarte?" class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
              </div>
              <div class="space-y-2">
                <label for="contact-message" class="text-sm font-bold text-gray-900 uppercase tracking-widest">Mensaje</label>
                <textarea id="contact-message" rows="6" placeholder="Escribe tu mensaje aquí..." class="w-full bg-gray-50 border border-gray-200 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"></textarea>
              </div>
              <button class="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class Contact {}

@Component({
  selector: 'app-faq',
  imports: [MatIconModule],
  template: `
    <div class="bg-white min-h-screen py-24">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-5xl font-bold tracking-tight text-gray-900 mb-12 text-center">Preguntas Frecuentes</h1>
        
        <div class="space-y-6">
          @for (item of faqs; track item.q) {
            <div class="border border-gray-100 rounded-3xl p-8 hover:bg-gray-50 transition-all cursor-pointer group">
              <div class="flex justify-between items-center gap-4">
                <h3 class="text-xl font-bold text-gray-900">{{ item.q }}</h3>
                <mat-icon class="text-gray-300 group-hover:text-indigo-600 transition-colors">expand_more</mat-icon>
              </div>
              <p class="mt-4 text-gray-500 leading-relaxed">{{ item.a }}</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class FAQ {
  faqs = [
    { q: '¿Cuánto tarda el envío?', a: 'Los envíos nacionales suelen tardar entre 2 y 5 días hábiles. Para envíos internacionales, el tiempo estimado es de 7 a 15 días hábiles.' },
    { q: '¿Cómo puedo rastrear mi pedido?', a: 'Una vez que tu pedido sea enviado, recibirás un correo electrónico con un número de seguimiento y un enlace para ver el estado en tiempo real.' },
    { q: '¿Cuál es la política de devoluciones?', a: 'Ofrecemos devoluciones gratuitas dentro de los 30 días posteriores a la recepción del producto, siempre que esté en su estado original.' },
    { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex), PayPal y transferencias bancarias directas.' }
  ];
}

@Component({
  selector: 'app-returns',
  imports: [MatIconModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-10">Políticas de Devolución</h1>
        
        <div class="prose prose-indigo max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Condiciones Generales</h2>
            <p>En Moderna, queremos que estés completamente satisfecho con tu compra. Si por alguna razón no es así, puedes devolver cualquier producto dentro de los 30 días posteriores a la entrega.</p>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Requisitos para la Devolución</h2>
            <ul class="list-disc pl-6 space-y-2">
              <li>El producto debe estar sin usar y en las mismas condiciones en que lo recibiste.</li>
              <li>Debe estar en su embalaje original con todas las etiquetas intactas.</li>
              <li>Debes presentar el comprobante de compra o número de pedido.</li>
            </ul>
          </section>

          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">3. Proceso de Reembolso</h2>
            <p>Una vez que recibamos e inspeccionemos tu devolución, te enviaremos un correo electrónico para notificarte la aprobación o el rechazo de tu reembolso. Si es aprobado, el reembolso se procesará y se aplicará automáticamente a tu método original de pago en un plazo de 5 a 10 días hábiles.</p>
          </section>

          <section class="bg-indigo-50 p-8 rounded-2xl border border-indigo-100">
            <h2 class="text-xl font-bold text-indigo-900 mb-2">¿Necesitas ayuda?</h2>
            <p class="text-indigo-700">Si tienes alguna duda sobre cómo devolver tu producto, contáctanos en soporte&#64;moderna.com</p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class Returns {}

@Component({
  selector: 'app-terms',
  imports: [MatIconModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-10">Términos y Condiciones</h1>
        <div class="prose prose-indigo max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Aceptación de los Términos</h2>
            <p>Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos términos y condiciones de uso, todas las leyes y regulaciones aplicables.</p>
          </section>
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Licencia de Uso</h2>
            <p>Se concede permiso para descargar temporalmente una copia de los materiales (información o software) en el sitio web de Moderna para visualización transitoria personal y no comercial solamente.</p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class Terms {}

@Component({
  selector: 'app-shipping',
  imports: [MatIconModule],
  template: `
    <div class="bg-gray-50 min-h-screen py-24">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 mb-10">Políticas de Envío</h1>
        <div class="prose prose-indigo max-w-none space-y-8 text-gray-600 leading-relaxed">
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">1. Tiempos de Entrega</h2>
            <p>Procesamos los pedidos en un plazo de 24-48 horas hábiles. Los tiempos de entrega varían según la ubicación.</p>
          </section>
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">2. Costos de Envío</h2>
            <p>Ofrecemos envío gratuito en pedidos superiores a $100. Para pedidos inferiores, se aplicará una tarifa plana de $10.</p>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`:host { display: block; }`]
})
export class Shipping {}
