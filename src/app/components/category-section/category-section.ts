import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorefrontState } from '../../storefront-state';

@Component({
  imports: [CommonModule],
  selector: 'app-category-section',
  styleUrl: './category-section.css',
  templateUrl: './category-section.html',
})
export class CategorySection {
  readonly categoryTiles = [
    { category: 'Necklaces', image: 'https://i.pinimg.com/1200x/7a/0c/60/7a0c607c683ac70fd73d650e2634b928.jpg' },
    { category: 'Earrings', image: 'https://i.pinimg.com/736x/2d/27/93/2d2793a3736328c9b693f507ae6a8bbb.jpg' },
    { category: 'Bracelets', image: 'https://i.pinimg.com/736x/e6/15/28/e615285a6f66d83128f791bf16be36c2.jpg' },
    { category: 'Rings', image: 'https://i.pinimg.com/736x/dc/14/4c/dc144c47fefc0021d44af08bb2d506ee.jpg' },
    { category: 'All pieces', image: 'https://i.pinimg.com/736x/14/48/5e/14485e6eee9fecdfc3911f3c2da69d40.jpg' },
  ];

  constructor(protected readonly store: StorefrontState) { }
}
