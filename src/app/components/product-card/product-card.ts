import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, StorefrontState } from '../../storefront-state';

@Component({
  imports: [RouterLink],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  readonly product = input.required<Product>();
  selectedSize = '';
  quantity = 1;
  optionsOpen = false;
  constructor(protected readonly store: StorefrontState) { }
  openOptions(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.optionsOpen = !this.optionsOpen;
    this.selectedSize = this.product().sizes[0] ?? '';
    this.quantity = 1;
  }
  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.store.addToCart(this.product(), this.selectedSize, this.quantity);
    if (this.selectedSize) this.optionsOpen = false;
  }
  closeOptions(event: Event): void {
    event.stopPropagation();
    this.optionsOpen = false;
  }
  decreaseQuantity(): void { this.quantity = Math.max(1, this.quantity - 1); }
  increaseQuantity(): void { this.quantity = Math.min(this.product().stock || 1, this.quantity + 1); }
}
