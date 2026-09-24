import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [CommonModule],
  selector: 'app-testimonials',
  styleUrl: './testimonials.css',
  templateUrl: './testimonials.html',
})
export class Testimonials {
  constructor(protected readonly store: StorefrontState) {}
}
