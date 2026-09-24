import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontState } from '../../storefront-state';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [CommonModule, ProductCard],
  selector: 'app-featured-products',
  styleUrl: './featured-products.css',
  templateUrl: './featured-products.html',
})
export class FeaturedProducts {
  constructor(protected readonly store: StorefrontState) {}
}
