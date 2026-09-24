import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [CommonModule],
  selector: 'app-why-choose-us',
  styleUrl: './why-choose-us.css',
  templateUrl: './why-choose-us.html',
})
export class WhyChooseUs {
  constructor(protected readonly store: StorefrontState) {}
}
