import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart { constructor(protected readonly store: StorefrontState) {} }
