import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorefrontState, Product } from '../../../storefront-state';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-edit-pro',
  styleUrl: './edit-pro.css',
  templateUrl: './edit-pro.html',
})
export class EditPro {
  originalName = '';
  product: Product = { name: '', category: 'Rings', price: 0, description: '', sizes: ['One size'], stock: 0, tag: 'New', showHome: true, image: '' };
  constructor(private readonly route: ActivatedRoute, private readonly store: StorefrontState, private readonly router: Router) {
    this.originalName = this.route.snapshot.paramMap.get('name') ?? '';
    this.product = this.store.getProduct(this.originalName) ?? this.product;
  }
  setSizes(value: string): void { this.product.sizes = value.split(',').map((size) => size.trim()).filter(Boolean); }
  save(): void { this.store.updateProduct(this.originalName, { ...this.product, price: Number(this.product.price) }); this.router.navigateByUrl('/admin/products'); }
}
