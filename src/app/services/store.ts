import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  images: string[];
  stock: number;
  variants?: {
    size?: string[];
    color?: string[];
  };
  sku: string;
  isNew?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  date: Date;
  items: CartItem[];
  total: number;
  status: 'Pendiente' | 'Enviado' | 'Entregado' | 'Cancelado';
  customer: {
    name: string;
    email: string;
    initials: string;
  };
}

export type UserRole = 'ADMIN' | 'CUSTOMER';

export interface ToastMessage {
  message: string;
  type: 'success' | 'error' | 'info';
  visible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // Roles
  readonly userRole = signal<UserRole>('CUSTOMER');
  
  // Toast Feedback
  readonly toast = signal<ToastMessage>({ message: '', type: 'info', visible: false });

  // Mock Data
  private readonly _products = signal<Product[]>([
    {
      id: 1,
      name: 'Camiseta Essential Algodón Orgánico',
      description: 'Nuestra camiseta más vendida. Confeccionada con algodón 100% orgánico de fibra larga para una suavidad excepcional y una durabilidad que trasciende temporadas. Un básico elevado para el guardarropa moderno.',
      price: 35.00,
      category: 'Ropa',
      brand: 'Moderna Essentials',
      images: [
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 45,
      variants: {
        size: ['XS', 'S', 'M', 'L', 'XL'],
        color: ['Blanco Marfil', 'Negro Obsidiana', 'Gris Melange']
      },
      sku: 'MOD-ESS-001',
      isNew: true
    },
    {
      id: 2,
      name: 'Sneakers Urban Pro Leather',
      description: 'Diseñadas en Italia con cuero de primera calidad. Estas zapatillas combinan la estética minimalista con una comodidad ergonómica superior. Suela de goma vulcanizada para un agarre perfecto en la ciudad.',
      price: 125.00,
      category: 'Calzado',
      brand: 'Moderna Footwear',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 12,
      variants: {
        size: ['38', '39', '40', '41', '42', '43', '44'],
        color: ['Blanco/Gris', 'Negro Total']
      },
      sku: 'MOD-FTW-002'
    },
    {
      id: 3,
      name: 'Smartwatch Horizon V3',
      description: 'La intersección perfecta entre tecnología y elegancia. Pantalla AMOLED de 1.4 pulgadas, monitoreo de salud avanzado y una batería que dura hasta 14 días. Resistente al agua hasta 50 metros.',
      price: 189.00,
      category: 'Electrónica',
      brand: 'Moderna Tech',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1508685096489-7aac291ba597?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 8,
      sku: 'MOD-TEC-003',
      isNew: true
    },
    {
      id: 4,
      name: 'Mochila Nomad 30L Waterproof',
      description: 'Construida para la aventura y el día a día. Material Cordura resistente al agua, compartimento acolchado para laptop de 16" y diseño ergonómico para una distribución de peso óptima.',
      price: 79.00,
      category: 'Accesorios',
      brand: 'Moderna Gear',
      images: [
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 25,
      sku: 'MOD-GER-004'
    },
    {
      id: 5,
      name: 'Pantalón Chino Tailored Fit',
      description: 'El equilibrio ideal entre lo formal y lo casual. Tejido de sarga de algodón con un toque de elastano para mayor flexibilidad. Corte entallado que estiliza la figura sin sacrificar comodidad.',
      price: 59.00,
      category: 'Ropa',
      brand: 'Moderna Essentials',
      images: [
        'https://images.unsplash.com/photo-1624371414361-e6709482451e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 30,
      variants: {
        size: ['30', '32', '34', '36', '38'],
        color: ['Arena', 'Azul Navy', 'Verde Bosque']
      },
      sku: 'MOD-ESS-005'
    },
    {
      id: 6,
      name: 'Auriculares Studio Wireless ANC',
      description: 'Sonido de alta fidelidad con cancelación activa de ruido líder en la industria. Almohadillas de espuma viscoelástica para sesiones de escucha prolongadas. Hasta 40 horas de reproducción inalámbrica.',
      price: 249.00,
      category: 'Electrónica',
      brand: 'Moderna Tech',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=800'
      ],
      stock: 15,
      sku: 'MOD-TEC-006'
    }
  ]);

  readonly products = this._products.asReadonly();
  readonly cart = signal<CartItem[]>([]);
  readonly orders = signal<Order[]>([
    {
      id: 'ORD-12345',
      date: new Date(2024, 2, 1),
      items: [],
      total: 125.99,
      status: 'Entregado',
      customer: {
        name: 'Juan Pérez',
        email: 'juan.perez@ejemplo.com',
        initials: 'JP'
      }
    },
    {
      id: 'ORD-67890',
      date: new Date(2024, 2, 5),
      items: [],
      total: 89.90,
      status: 'Enviado',
      customer: {
        name: 'María García',
        email: 'maria.garcia@ejemplo.com',
        initials: 'MG'
      }
    }
  ]);

  readonly cartCount = computed(() => this.cart().reduce((acc, item) => acc + item.quantity, 0));
  readonly cartTotal = computed(() => this.cart().reduce((acc, item) => acc + (item.product.price * item.quantity), 0));

  addToCart(product: Product, quantity = 1, size?: string, color?: string) {
    const currentCart = this.cart();
    const existingItemIndex = currentCart.findIndex(item => 
      item.product.id === product.id && 
      item.selectedSize === size && 
      item.selectedColor === color
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingItemIndex].quantity += quantity;
      this.cart.set(updatedCart);
    } else {
      this.cart.set([...currentCart, { product, quantity, selectedSize: size, selectedColor: color }]);
    }

    this.showToast(`¡Agregado! Total: ${this.cart().find(i => i.product.id === product.id)?.quantity} unidades de ${product.name}`, 'success');
  }

  showToast(message: string, type: 'success' | 'error' | 'info' = 'info') {
    this.toast.set({ message, type, visible: true });
    setTimeout(() => {
      this.toast.set({ ...this.toast(), visible: false });
    }, 3000);
  }

  removeFromCart(index: number) {
    const currentCart = this.cart();
    this.cart.set(currentCart.filter((_, i) => i !== index));
  }

  updateQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(index);
      return;
    }
    const currentCart = this.cart();
    const updatedCart = [...currentCart];
    updatedCart[index].quantity = quantity;
    this.cart.set(updatedCart);
  }

  clearCart() {
    this.cart.set([]);
  }

  // Admin Methods
  updateProductStock(productId: number, newStock: number) {
    const updatedProducts = this._products().map(p => 
      p.id === productId ? { ...p, stock: newStock } : p
    );
    this._products.set(updatedProducts);
    this.showToast(`Stock actualizado para el producto #${productId}`, 'success');
  }

  deleteProduct(productId: number) {
    const updatedProducts = this._products().filter(p => p.id !== productId);
    this._products.set(updatedProducts);
    this.showToast(`Producto #${productId} eliminado`, 'info');
  }

  updateOrderStatus(orderId: string, newStatus: Order['status']) {
    const updatedOrders = this.orders().map(o => 
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    this.orders.set(updatedOrders);
    this.showToast(`Estado del pedido ${orderId} actualizado a ${newStatus}`, 'success');
  }
}
