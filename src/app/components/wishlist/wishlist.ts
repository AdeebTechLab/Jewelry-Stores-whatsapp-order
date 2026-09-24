import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorefrontState } from '../../storefront-state';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [CommonModule, RouterLink, ProductCard],
  selector: 'app-wishlist',
  styleUrl: './wishlist.css',
  templateUrl: './wishlist.html',
})
export class Wishlist { constructor(protected readonly store: StorefrontState) {} }
