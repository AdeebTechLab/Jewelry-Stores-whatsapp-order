import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontState } from '../../storefront-state';
import { RouterLink } from '@angular/router';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-new-arrivals',
  styleUrl: './new-arrivals.css',
  templateUrl: './new-arrivals.html',
})
export class NewArrivals {
  constructor(protected readonly store: StorefrontState) {}
}
