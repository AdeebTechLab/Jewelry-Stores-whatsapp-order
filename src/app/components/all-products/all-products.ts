import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../product-card/product-card';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [CommonModule, ProductCard],
  selector: 'app-all-products',
  template: `<main class="commerce-page all-products-page"><div class="commerce-heading"><div><p class="eyebrow">The complete collection</p><h1>All jewellery</h1><p class="page-caption">Find the piece that becomes part of your everyday.</p></div><span>{{ store.catalogProducts().length }} pieces</span></div><div class="catalog-toolbar"><div class="catalog-categories">@for (category of store.categories; track category) {<button type="button" [class.active]="store.selectedCategory() === category" (click)="store.selectCategory(category)">{{ category }}</button>}</div><span><i class="bi bi-search"></i> Use the search above</span></div><div class="catalog-grid">@for (product of store.catalogProducts(); track product.name) {<app-product-card [product]="product" />} @empty {<p class="empty-products">No jewellery matches your search.</p>}</div></main>`,
  styles: [`.catalog-toolbar { display:flex; justify-content:space-between; align-items:center; max-width:1100px; margin:0 auto 25px; padding-bottom:14px; border-bottom:1px solid #ded4c8; color:#8e8176; font-size:11px; }.catalog-categories { display:flex; flex-wrap:wrap; gap:18px; }.catalog-categories button { padding:0 0 6px; border:0; border-bottom:1px solid transparent; background:transparent; color:#8e8176; cursor:pointer; font-size:11px; }.catalog-categories button.active { border-color:#a57448; color:#302a25; font-weight:700; }.catalog-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:20px; max-width:1100px; margin:0 auto; }.empty-products { grid-column:1/-1; padding:45px; color:#8e8176; text-align:center; } @media (max-width:760px) { .catalog-toolbar { display:block; }.catalog-toolbar > span { display:block; margin-top:15px; }.catalog-categories { gap:12px; overflow-x:auto; flex-wrap:nowrap; }.catalog-categories button { white-space:nowrap; }.catalog-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:25px 12px; }}`],
})
export class AllProducts {
  constructor(protected readonly store: StorefrontState) { }
}

