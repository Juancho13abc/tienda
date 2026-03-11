import {Routes} from '@angular/router';
import { Home } from './home';
import { Catalog } from './catalog';
import { ProductDetail } from './product-detail';
import { Cart } from './cart';
import { Account } from './account';
import { About, Contact, FAQ, Returns, Terms, Shipping } from './info-pages';
import { AdminLayout } from './admin/admin-layout';
import { AdminDashboard } from './admin/dashboard';
import { AdminProducts } from './admin/products';
import { AdminOrders } from './admin/orders';
import { AdminCustomers, AdminAnalytics } from './admin/extra-components';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'catalogo', component: Catalog },
  { path: 'producto/:id', component: ProductDetail },
  { path: 'carrito', component: Cart },
  { path: 'cuenta', component: Account },
  { path: 'sobre-nosotros', component: About },
  { path: 'contacto', component: Contact },
  { path: 'preguntas-frecuentes', component: FAQ },
  { path: 'politicas-de-devolucion', component: Returns },
  { path: 'terminos-y-condiciones', component: Terms },
  { path: 'envios', component: Shipping },
  { 
    path: 'admin', 
    component: AdminLayout,
    children: [
      { path: '', component: AdminDashboard },
      { path: 'productos', component: AdminProducts },
      { path: 'pedidos', component: AdminOrders },
      { path: 'clientes', component: AdminCustomers },
      { path: 'analiticas', component: AdminAnalytics },
    ]
  },
  { path: '**', redirectTo: '' }
];
