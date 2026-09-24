import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { StorefrontState, Product } from '../../../storefront-state';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-add-pro',
  styleUrl: './add-pro.css',
  templateUrl: './add-pro.html',
})
export class AddPro {
  product: Product = { name: '', category: 'Rings', price: 0, description: '', sizes: ['One size'], stock: 0, tag: 'New', showHome: true, image: '' };
  constructor(private readonly store: StorefrontState, private readonly router: Router) {}
  setSizes(value: string): void { this.product.sizes = value.split(',').map((size) => size.trim()).filter(Boolean); }
  save(): void { if (!this.product.name || !this.product.image || !this.product.price) return; this.store.addProduct({ ...this.product, price: Number(this.product.price) }); this.router.navigateByUrl('/admin/products'); }
}
