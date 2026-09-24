import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StorefrontState, Product } from '../../storefront-state';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink],
  selector: 'app-pro-details',
  styleUrl: './pro-details.css',
  templateUrl: './pro-details.html',
})
export class ProDetails {
  readonly product: Product | undefined;
  selectedSize = '';
  quantity = 1;
  constructor(private readonly route: ActivatedRoute, protected readonly store: StorefrontState) {
    this.product = this.store.getProduct(this.route.snapshot.paramMap.get('name') ?? '');
    if (this.product?.sizes.length === 1) this.selectedSize = this.product.sizes[0];
  }
  addSelectedToCart(): void { if (this.product) this.store.addToCart(this.product, this.selectedSize, this.quantity); }
  decreaseQuantity(): void { this.quantity = Math.max(1, this.quantity - 1); }
  increaseQuantity(): void { if (this.product) this.quantity = Math.min(this.product.stock || 1, this.quantity + 1); }
}
