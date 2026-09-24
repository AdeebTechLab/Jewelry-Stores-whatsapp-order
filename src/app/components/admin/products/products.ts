import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorefrontState } from '../../../storefront-state';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products {
  constructor(protected readonly store: StorefrontState) {}
  remove(name: string): void { if (confirm(`Delete ${name}?`)) this.store.deleteProduct(name); }
}
