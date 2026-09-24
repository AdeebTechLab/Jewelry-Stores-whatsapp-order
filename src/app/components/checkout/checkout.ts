import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-checkout',
  styleUrl: './checkout.css',
  templateUrl: './checkout.html',
})
export class Checkout {
  customer = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  country = '';
  postalCode = '';
  paymentMethod = 'Cash on delivery';
  deliveryNote = '';
  constructor(protected readonly store: StorefrontState, private readonly router: Router) { }
  placeOrder(): void {
    const itemCount = this.store.cartCount();
    const total = this.store.cartTotal();
    const items = this.store.cartItems().map((item, index) => `${index + 1}. ${item.product.name}${item.selectedSize ? ` (${item.selectedSize})` : ''} x ${item.quantity} - $${item.product.price * item.quantity}`).join('\n');
    const message = [`New order from Danish&Co`, `Name: ${this.customer}`, `Phone: ${this.phone}`, `Email: ${this.email}`, `Address: ${this.address}, ${this.city}, ${this.country} ${this.postalCode}`, `Payment: ${this.paymentMethod}`, '', `Items (${itemCount}):`, items, `Total: $${total}`, this.deliveryNote ? `Note: ${this.deliveryNote}` : ''].filter(Boolean).join('\n');
    this.store.placeOrder({ customer: this.customer, customerEmail: this.email, phone: this.phone, address: this.address, city: this.city, country: this.country, postalCode: this.postalCode, paymentMethod: this.paymentMethod, deliveryNote: this.deliveryNote });
    window.open(`https://wa.me/${this.store.adminWhatsApp()}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    this.router.navigateByUrl('/orders');
  }
}
