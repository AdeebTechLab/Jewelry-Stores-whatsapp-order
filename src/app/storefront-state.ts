import { Injectable, computed, effect, signal } from '@angular/core';
import { AuthState } from './auth-state';

export interface Product {
  name: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  stock: number;
  image: string;
  tag: string;
  showHome: boolean;
}
export interface Testimonial { quote: string; name: string; detail: string; profile: string; }
export interface CartItem { product: Product; quantity: number; selectedSize?: string; }
export interface CheckoutDetails { customer: string; customerEmail: string; phone: string; address: string; city: string; country: string; postalCode: string; paymentMethod: string; deliveryNote: string; }
export interface Order extends CheckoutDetails { id: string; items: CartItem[]; total: number; status: string; date: string; cancellationReason?: string; }
export interface StoreNotification { message: string; tone: 'success' | 'danger' | 'warning'; }

@Injectable({ providedIn: 'root' })
export class StorefrontState {
  private readonly storageKeys = {
    wishlist: 'danish-co-wishlist',
    cart: 'danish-co-cart',
    orders: 'danish-co-orders',
    products: 'danish-co-products',
    whatsapp: 'danish-co-whatsapp',
  };
  private readonly defaultWhatsApp = '923045865559';
  readonly categories = ['All pieces', 'Rings', 'Necklaces', 'Earrings', 'Bracelets'];
  readonly selectedCategory = signal('All pieces');
  readonly searchTerm = signal('');
  readonly arrivalSlide = signal(0);
  readonly menuOpen = signal(false);
  private readonly wishlistState = signal<string[]>([]);
  private readonly cartItemsState = signal<CartItem[]>([]);
  private readonly ordersState = signal<Order[]>([]);
  private readonly ordersVersion = signal(0);
  readonly wishlist = this.wishlistState.asReadonly();
  readonly cartItems = this.cartItemsState.asReadonly();
  readonly cartCount = computed(() => this.cartItems().reduce((count, item) => count + item.quantity, 0));
  readonly cartTotal = computed(() => this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0));
  readonly notification = signal<StoreNotification | null>(null);
  readonly adminWhatsApp = signal(this.readStorage(this.storageKeys.whatsapp, this.defaultWhatsApp));
  private notificationTimer?: ReturnType<typeof setTimeout>;
  readonly orders = computed(() => {
    this.ordersVersion();
    return this.auth.isAdmin() ? this.readAllOrders() : this.ordersState();
  });
  private readonly defaultProductSizes: Record<string, string[]> = {
    'Sculpted Gold Hoops': ['Small · 12mm', 'Medium · 18mm', 'Large · 25mm'],
    'Celeste Signet Ring': ['6', '7', '8', '9'],
    'Luna Pendant': ['16 inch', '18 inch', '20 inch'],
    'Molten Cuff': ['Small', 'Medium', 'Large'],
    'Pearl Drop Studs': ['6mm', '8mm', '10mm'],
    'Solace Chain': ['16 inch', '18 inch'],
    'Dune Band': ['6', '7', '8', '9'],
    'Sienna Chain Bracelet': ['Small', 'Medium', 'Large'],
  };
  private readonly defaultProductStock: Record<string, number> = {
    'Sculpted Gold Hoops': 12,
    'Celeste Signet Ring': 8,
    'Luna Pendant': 15,
    'Molten Cuff': 5,
    'Pearl Drop Studs': 20,
    'Solace Chain': 9,
    'Dune Band': 11,
    'Sienna Chain Bracelet': 7,
  };
  private readonly defaultProductImages: Record<string, string> = {
    'Sculpted Gold Hoops': 'https://i.pinimg.com/736x/59/a6/0d/59a60dc249619f48ee06100fe853bb68.jpg',
    'Celeste Signet Ring': 'https://i.pinimg.com/736x/6b/ba/1c/6bba1c4c4c4b84a5725f50e96a7b1580.jpg',
    'Luna Pendant': 'https://i.pinimg.com/736x/b3/c2/b6/b3c2b6e7f7793de322bcb6ecf65562cf.jpg',
    'Molten Cuff': 'https://i.pinimg.com/1200x/f2/6e/33/f26e33951bf13e041a7fa1e7e6cab852.jpg',
    'Pearl Drop Studs': 'https://i.pinimg.com/1200x/88/1d/03/881d03708b77e3c065494ad814489c3e.jpg',
    'Solace Chain': 'https://i.pinimg.com/736x/32/84/c7/3284c790f96644955d06a56186ad5d33.jpg',
    'Dune Band': 'https://i.pinimg.com/1200x/17/81/65/1781654fc4f7efa40c9ae758b8fdcfe5.jpg',
    'Sienna Chain Bracelet': 'https://i.pinimg.com/736x/37/74/8a/37748a5e7ee36db89a5ad2d76d022ac7.jpg',
  };
  readonly products = signal<Product[]>(this.readStorage<Product[]>(this.storageKeys.products, [
    { name: 'Sculpted Gold Hoops', category: 'Earrings', price: 185, tag: 'Bestseller', showHome: true, description: 'Sculptural gold hoops with a polished finish for everyday wear.', sizes: ['Small · 12mm', 'Medium · 18mm', 'Large · 25mm'], stock: 12, image: 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=900&q=85' },
    { name: 'Celeste Signet Ring', category: 'Rings', price: 240, tag: 'New', showHome: true, description: 'A softly curved signet ring with a modern, weighty profile.', sizes: ['6', '7', '8', '9'], stock: 8, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85' },
    { name: 'Luna Pendant', category: 'Necklaces', price: 210, tag: 'New', showHome: true, description: 'A luminous pendant designed to sit close to the collarbone.', sizes: ['16 inch', '18 inch', '20 inch'], stock: 15, image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=85' },
    { name: 'Molten Cuff', category: 'Bracelets', price: 295, tag: 'Limited', showHome: true, description: 'A fluid cuff with an organic silhouette and high-shine finish.', sizes: ['Small', 'Medium', 'Large'], stock: 5, image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85' },
    { name: 'Pearl Drop Studs', category: 'Earrings', price: 165, tag: 'New', showHome: true, description: 'Freshwater pearl studs with a delicate drop for subtle movement.', sizes: ['6mm', '8mm', '10mm'], stock: 20, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85' },
    { name: 'Solace Chain', category: 'Necklaces', price: 275, tag: 'New', showHome: true, description: 'A considered chain that layers beautifully from day to evening.', sizes: ['16 inch', '18 inch'], stock: 9, image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=85' },
    { name: 'Dune Band', category: 'Rings', price: 195, tag: 'New', showHome: true, description: 'A softly sculpted band inspired by wind-shaped dunes.', sizes: ['6', '7', '8', '9'], stock: 11, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85' },
    { name: 'Sienna Chain Bracelet', category: 'Bracelets', price: 225, tag: 'New', showHome: true, description: 'A warm-toned chain bracelet made for effortless stacking.', sizes: ['Small', 'Medium', 'Large'], stock: 7, image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=900&q=85' },
  ]).map((product) => ({ ...product, description: product.description ?? 'A considered piece designed for everyday wear.', sizes: this.defaultProductSizes[product.name] ?? product.sizes ?? ['One size'], stock: product.stock ?? this.defaultProductStock[product.name] ?? 10, image: this.defaultProductImages[product.name] ?? product.image, showHome: product.showHome ?? true })));
  readonly benefits = [
    { icon: 'bi-gem', title: 'Made to last', text: 'Thoughtful materials and considered craftsmanship in every piece.' },
    { icon: 'bi-box-seam', title: 'Gift-ready', text: 'Every order arrives wrapped with care and a handwritten note.' },
    { icon: 'bi-arrow-repeat', title: 'Easy returns', text: 'A simple 30-day return window for complete peace of mind.' },
  ];
  readonly testimonials: Testimonial[] = [
    { quote: 'Danish&Co pieces feel personal from the moment you open the box.', name: 'Maya R.', detail: 'Verified customer', profile: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80' },
    { quote: 'The kind of jewellery I reach for every single day.', name: 'Clara D.', detail: 'Verified customer', profile: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&q=80' },
    { quote: 'Beautifully made, quietly special, and delivered so thoughtfully.', name: 'Sophie L.', detail: 'Verified customer', profile: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80' },
  ];
  readonly newsletterTitle = 'A little something special';
  readonly homeProducts = computed(() => this.products().filter((product) => product.showHome).slice(0, 8));
  readonly wishlistProducts = computed(() => this.products().filter((product) => this.wishlist().includes(product.name)));
  readonly catalogProducts = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchTerm().trim().toLowerCase();
    const products = category === 'All pieces' ? this.products() : this.products().filter((product) => product.category === category);
    return query ? products.filter((product) => `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(query)) : products;
  });
  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const query = this.searchTerm().trim().toLowerCase();
    const products = category === 'All pieces' ? this.homeProducts() : this.homeProducts().filter((product) => product.category === category);
    return query ? products.filter((product) => `${product.name} ${product.category} ${product.tag}`.toLowerCase().includes(query)) : products;
  });
  readonly newArrivals = computed(() => this.homeProducts().filter((product) => product.tag === 'New'));
  readonly arrivalCarousel = computed(() => {
    const products = this.newArrivals();
    return Array.from({ length: Math.min(3, products.length) }, (_, offset) => products[(this.arrivalSlide() + offset) % products.length]);
  });

  constructor(private readonly auth: AuthState) {
    effect(() => {
      const email = this.auth.currentUser()?.email;
      this.wishlistState.set(this.readUserStorage<string[]>(this.storageKeys.wishlist, [], email));
      this.cartItemsState.set(this.readUserStorage<CartItem[]>(this.storageKeys.cart, [], email));
      this.ordersState.set(this.readUserStorage<Order[]>(this.storageKeys.orders, [], email));
    });
  }

  selectCategory(category: string): void { this.selectedCategory.set(category); }
  setSearchTerm(term: string): void { this.searchTerm.set(term); }
  nextArrival(): void { this.arrivalSlide.update((index) => (index + 1) % this.newArrivals().length); }
  previousArrival(): void { this.arrivalSlide.update((index) => (index - 1 + this.newArrivals().length) % this.newArrivals().length); }
  toggleMenu(): void { this.menuOpen.update((open) => !open); }
  toggleWishlist(name: string): void {
    this.wishlistState.update((items) => {
      const nextItems = items.includes(name) ? items.filter((item) => item !== name) : [...items, name];
      this.writeUserStorage(this.storageKeys.wishlist, nextItems);
      return nextItems;
    });
  }
  getProduct(name: string): Product | undefined { return this.products().find((product) => product.name === name); }
  addProduct(product: Product): void {
    this.products.update((products) => { const next = [product, ...products]; this.writeStorage(this.storageKeys.products, next); return next; });
  }
  updateProduct(originalName: string, product: Product): void {
    this.products.update((products) => { const next = products.map((item) => item.name === originalName ? product : item); this.writeStorage(this.storageKeys.products, next); return next; });
  }
  deleteProduct(name: string): void {
    this.products.update((products) => { const next = products.filter((item) => item.name !== name); this.writeStorage(this.storageKeys.products, next); return next; });
    this.notify(`${name} deleted`, 'danger');
  }
  addToCart(product: Product, selectedSize?: string, quantity = 1): void {
    if (product.stock < 1) { this.notify(`${product.name} is currently out of stock`, 'danger'); return; }
    const size = selectedSize ?? (product.sizes.length === 1 ? product.sizes[0] : undefined);
    if (!size) { this.notify('Please choose a size before adding to cart', 'warning'); return; }
    const requestedQuantity = Math.max(1, Math.floor(quantity));
    this.cartItemsState.update((items) => {
      const existing = items.find((item) => item.product.name === product.name && item.selectedSize === size);
      const nextItems = existing
        ? items.map((item) => item.product.name === product.name && item.selectedSize === size ? { ...item, quantity: Math.min(item.quantity + requestedQuantity, product.stock) } : item)
        : [...items, { product, quantity: Math.min(requestedQuantity, product.stock), selectedSize: size }];
      this.writeUserStorage(this.storageKeys.cart, nextItems);
      return nextItems;
    });
    this.notify(`${product.name} added to your cart`, 'success');
  }
  updateQuantity(name: string, quantity: number, selectedSize?: string): void {
    if (quantity < 1) return this.removeFromCart(name);
    this.cartItemsState.update((items) => {
      const nextItems = items.map((item) => item.product.name === name && (!selectedSize || item.selectedSize === selectedSize) ? { ...item, quantity: Math.min(quantity, item.product.stock) } : item);
      this.writeUserStorage(this.storageKeys.cart, nextItems);
      return nextItems;
    });
  }
  removeFromCart(name: string): void {
    this.cartItemsState.update((items) => {
      const nextItems = items.filter((item) => item.product.name !== name);
      this.writeStorage(this.storageKeys.cart, nextItems);
      return nextItems;
    });
    this.notify(`${name} removed from your cart`, 'danger');
  }
  placeOrder(details: CheckoutDetails): void {
    if (!this.cartItems().length) return;
    this.ordersState.update((orders) => {
      const nextOrders = [{ id: `AU-${Date.now().toString().slice(-6)}`, items: this.cartItems(), total: this.cartTotal(), ...details, status: 'Processing', date: new Date().toLocaleDateString() }, ...orders];
      this.writeUserStorage(this.storageKeys.orders, nextOrders);
      return nextOrders;
    });
    this.cartItemsState.set([]);
    this.writeUserStorage(this.storageKeys.cart, []);
  }
  saveAdminWhatsApp(number: string): void {
    const normalized = number.replace(/\D/g, '');
    if (!normalized) return;
    this.adminWhatsApp.set(normalized);
    this.writeStorage(this.storageKeys.whatsapp, normalized);
  }
  deleteOrder(id: string): void {
    if (!this.auth.isAdmin()) return;
    for (const user of this.auth.users()) {
      const orders = this.readUserStorage<Order[]>(this.storageKeys.orders, [], user.email);
      const next = orders.filter((order) => order.id !== id);
      if (next.length !== orders.length) this.writeUserStorage(this.storageKeys.orders, next, user.email);
    }
    this.ordersState.update((orders) => orders.filter((order) => order.id !== id));
    this.ordersVersion.update((version) => version + 1);
    this.notify('Order deleted', 'danger');
  }
  updateOrderStatus(id: string, status: string, cancellationReason = ''): void {
    if (!this.auth.isAdmin()) return;
    for (const user of this.auth.users()) {
      const orders = this.readUserStorage<Order[]>(this.storageKeys.orders, [], user.email);
      const next = orders.map((order) => order.id === id ? { ...order, status, cancellationReason: status === 'Cancelled' ? cancellationReason : undefined } : order);
      if (next.some((order, index) => order !== orders[index])) this.writeUserStorage(this.storageKeys.orders, next, user.email);
    }
    this.ordersState.update((orders) => orders.map((order) => order.id === id ? { ...order, status, cancellationReason: status === 'Cancelled' ? cancellationReason : undefined } : order));
  }
  updateCancellationReason(id: string, cancellationReason: string): void {
    if (!this.auth.isAdmin()) return;
    for (const user of this.auth.users()) {
      const orders = this.readUserStorage<Order[]>(this.storageKeys.orders, [], user.email);
      const next = orders.map((order) => order.id === id ? { ...order, cancellationReason } : order);
      if (next.some((order, index) => order !== orders[index])) this.writeUserStorage(this.storageKeys.orders, next, user.email);
    }
    this.ordersState.update((orders) => orders.map((order) => order.id === id ? { ...order, cancellationReason } : order));
  }
  notify(message: string, tone: StoreNotification['tone'] = 'success'): void {
    if (this.notificationTimer) clearTimeout(this.notificationTimer);
    this.notification.set({ message, tone });
    this.notificationTimer = setTimeout(() => this.notification.set(null), 3200);
  }
  isWishlisted(name: string): boolean { return this.wishlist().includes(name); }

  private readStorage<T>(key: string, fallback: T): T {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;
    try { return JSON.parse(saved) as T; } catch { return fallback; }
  }

  private writeStorage<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private readUserStorage<T>(key: string, fallback: T, email = this.auth.currentUser()?.email): T {
    return email ? this.readStorage<T>(`${key}:${email}`, fallback) : fallback;
  }

  private writeUserStorage<T>(key: string, value: T, email = this.auth.currentUser()?.email): void {
    if (email) this.writeStorage(`${key}:${email}`, value);
  }

  private readAllOrders(): Order[] {
    return this.auth.users().flatMap((user) => this.readUserStorage<Order[]>(this.storageKeys.orders, [], user.email));
  }
}
